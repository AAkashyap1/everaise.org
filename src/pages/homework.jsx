import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import courseData from '../data/launch/courseData'
import Assignment from '../components/assignment'
import { homeworkNavigation } from '../data/launch/navigation/labels'
import Page from '../components/page'
import SideNav from '../components/global/navs/SideNav'
import {
  MenuAlt1Icon,
} from '@heroicons/react/outline'
import LaunchNav from '../components/global/navs/LaunchNav'
import Timeline from '../components/homework/timeline'
import { database } from '../firebase'
import GetDate from '../utility/date'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export default function Homework() {
  const { course } = useParams();
  const { assignmentId } = useParams();
  const { module } = useParams();
  const { currentUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignment, setAssignment] = useState({});
  const [title, setTitle] = useState('');

  const assignmentData = useDocumentData(courseData[course].assignmentData.doc(module).collection('assignments').doc(assignmentId))[0];
  const userAssignment = useDocumentData(database.users.doc(currentUser.email).collection('courses').doc(course).collection('modules').doc(module).collection('assignments').doc(assignmentId))[0];
  homeworkNavigation[0].href = `/dashboard/${course}`

  async function getTitle() {
    const assignment = await courseData[course].assignmentData.doc(module).collection('assignments').doc(assignmentId).get();
    setTitle(assignment.data().name + ' - ' + courseData[course].courseName);
  }

  useEffect(() => {
    getTitle();
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (assignmentData && userAssignment) {
      let completed = 0;
      let points = 0;
      let totalPoints = 0;
      for (let i = 0; i < assignmentData.questions.length; i++) {
        if (
          (assignmentData.questions[i].type === 'MC' && userAssignment.questions[i].submissions < 2) ||
          (assignmentData.questions[i].type === 'SA' && userAssignment.questions[i].submissions < 100)
        ) {
          completed += 1;
        }
      }
      for (let i = 0; i < assignmentData.questions.length; i++) {
        totalPoints += assignmentData.questions[i].points;
        if (userAssignment.questions[i].userAnswer === String(assignmentData.questions[i].answer)) {
          points += assignmentData.questions[i].points;
        }
      }
      
      setAssignment({
        due: GetDate(assignmentData.due),
        earned: points,
        points: totalPoints,
        completed: completed,
        problems: assignmentData.questions.length,
        name: assignmentData.name,
        handouts: assignmentData.handouts,
        questions: assignmentData.questions,
        answers: userAssignment.questions
      });
    }
  }, [userAssignment, assignmentData]);

  return (
    <Page
      title={title}
      description=""
    >
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideNav 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          navigation={homeworkNavigation}
          secondaryNavigation={[]}
        />
        <div className="flex-1 overflow-auto focus:outline-none">
          <div className="block lg:hidden relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            <LaunchNav info={courseData[course].courseName + ' - ' + module} />
            <div className="mt-8 mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8 lg:grid-flow-col-dense lg:grid-cols-3">
              <Timeline />
              {assignment.name && 
                <Assignment
                  id={assignmentId}
                  course={course}
                  due={assignment.due}
                  problems={assignment.problems}
                  completed={assignment.completed}
                  earned={assignment.earned}
                  name={assignment.name}
                  handouts={assignment.handouts}
                  points={assignment.points}
                  questions={assignment.questions}
                  answers={assignment.answers}
                />
              }
            </div>
          </main>
        </div>
      </div>
    </Page>
  )
}