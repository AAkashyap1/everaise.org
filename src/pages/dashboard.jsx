import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import GetDate from '../utility/date'
import printError from '../utility/printError'
import {
  DocumentTextIcon,
  MenuAlt1Icon,
} from '@heroicons/react/outline'
import {
  ChevronRightIcon,
} from '@heroicons/react/solid'
import { dashboardNavigation, dashboardSecondaryNavigation } from '../data/launch/navigation/labels'
import LaunchNav from '../components/global/navs/LaunchNav'
import SideNav from '../components/global/navs/SideNav'
import courseData from '../data/launch/courseData'
import Page from '../components/page'
import Cards from '../components/dashboard/cards'
import Leaders from '../components/dashboard/leaders'

const statusStyles = {
  'complete': 'bg-green-100 text-green-800',
  'in Progress': 'bg-yellow-100 text-yellow-800',
  'not Started': 'bg-red-100 text-red-800',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { course } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentUser } = useAuth()
  const [numAssignments, setNumAssignments] = useState(0)
  const [viewStatus, setViewStatus] = useState(true)
  const [homework, setHomework] = useState([])
  const [loading, setLoading] = useState(false);

  const data = courseData[course].assignmentData
  const userData = database.users.doc(currentUser.email).collection('courses').doc(course).collection('modules');
  
  useEffect(() => {
    if (homework.length > 0) {
      dashboardNavigation[1].href = `/homework/${course}/${homework[0].module}/${homework[0].id}`;
    } else {
      dashboardNavigation[1].href = `#`;
    }
  }, [homework, course])

  useEffect(() => {
    loadAssignments();
  // eslint-disable-next-line
  }, [])

  async function fetchModule(id) {
    let tempAssignments = [];
    const userAssignments = await userData.doc(id).collection('assignments').get();
    const assignments = await data.doc(id).collection('assignments').get();
    for (let i = 0; i < assignments.docs.length; i++) {
      tempAssignments.push({
        id: assignments.docs[i].id,
        disabled: assignments.docs[i].data().disabled,
        module: id,
        name: assignments.docs[i].data().name,
        questions: assignments.docs[i].data().questions,
        answers: userAssignments.docs[i].data().questions,
        due: GetDate(assignments.docs[i].data().due),
      })
    }
    return tempAssignments;
  }

  async function loadAssignments() {
    try {
      setLoading(true);
      const modules = await data.get();
      let tempAssignments = [];
      for (const tempModule of modules.docs) {
        console.log(tempModule)
        let assignments = await fetchModule(tempModule.id);
        for (const assignment of assignments) {
          tempAssignments.push({
            assignment: assignment,
            module: tempModule.data().name,
          });
        }
      }
      let newAssignments = [];
      for (const tempAssignment of tempAssignments) {
        const assignment = tempAssignment.assignment;
        let completed = 0;
        let points = 0;
        let totalPoints = 0;
        
        for (const question of assignment.answers) {
          if (
            (question.submissions < 2) ||
            (question.submissions === 99)
          ) {
            completed += 1;
          }
        }
        for (let i = 0; i < assignment.answers.length; i++) {
          totalPoints += assignment.questions[i].points;
          if (String(assignment.answers[i].userAnswer) === String(assignment.questions[i].answer)) {
            points += assignment.questions[i].points;
          }
        }
        
        newAssignments.push({
          id: assignment.id,
          disabled: assignment.disabled,
          name: assignment.name,
          questions: assignment.questions,
          module: tempAssignment.module,
          answers: assignment.answers,
          due: assignment.due,
          points: points,
          completed: completed,
          grade: points + '/' + totalPoints,
          status: 
            (completed === 0) ? 'not Started' : 
            ((completed === assignment.answers.length) ? 
              'complete' : 'in Progress')
        })
      }
      newAssignments.sort((a1, a2) => (a1.due > a2.due) ? 1 : -1)
      setHomework(newAssignments);
      setNumAssignments(Math.min(newAssignments.length, 4));
    } catch (err) {
      printError(err)
    }
    setLoading(false);
  }
  
  function updateAssignments(event) {
    event.preventDefault()
    if (numAssignments < homework.length) {
      setNumAssignments(homework.length);
      setViewStatus(false);
    } else {
      setNumAssignments(Math.min(homework.length, 4));
      setViewStatus(true);
    }
  }

  return (
    <Page 
      title={"Dashboard - " + courseData[course].courseName}
      description={"Access all information related to the Everaise Academy " + courseData[course].courseName + " course."}
    >
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideNav 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          navigation={dashboardNavigation}
          secondaryNavigation={dashboardSecondaryNavigation}
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
            <LaunchNav info={courseData[course].courseName + ' - Dashboard'} />
            <div className="mt-8">
              <Cards />
              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Assignment Log
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  {loading ?
                    ['1', '2', '3', '4'].map((assignment) => (
                      <li key={assignment}>
                        <p className="block px-4 py-4 bg-white hover:bg-gray-50">
                          <span className="flex items-center space-x-4">
                            <span className="flex-1 flex space-x-2 truncate">
                              <DocumentTextIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                              <span className="flex flex-col text-gray-900 text-sm truncate space-y-1">
                                <span className="bg-gray-200 text-gray-200 rounded-md h-4 truncate animate-pulse">Kinematics in One Dimension</span>
                                <span>
                                  <span className="bg-gray-200 text-gray-200 rounded-md font-medium animate-pulse">99 / 100</span>{' '}
                                </span>
                                <time className="rounded-md bg-gray-200 text-gray-200 text-sm w-1/2 h-4 animate-pulse">June 23, 2021</time>
                              </span>
                            </span>
                          </span>
                        </p>
                      </li>
                    )) :
                    homework.map((assignment) => (
                      <li key={assignment.id}>
                        <Link to={`/homework/${course}/${assignment.module}/${assignment.id}`} className="block px-4 py-4 bg-white hover:bg-gray-50">
                          <span className="flex items-center space-x-4">
                            <span className="flex-1 flex space-x-2 truncate">
                              <DocumentTextIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                              <span className="flex flex-col text-gray-900 text-sm truncate">
                                <span className="truncate">{assignment.name}</span>
                                <span>
                                  <span className="text-gray-900 font-medium">{assignment.grade}</span>{' '}
                                </span>
                                <time dateTime={assignment.due}>{assignment.due}</time>
                              </span>
                            </span>
                            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>

                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between">
                    <button
                      disabled={loading}
                      onClick={updateAssignments}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {viewStatus ? 'View All' : 'Hide'}
                    </button>
                  </div>
                </nav>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col mt-2">
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Assignment
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Score
                            </th>
                            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                              Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Deadline
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {loading ? 
                            ['1', '2', '3', '4'].map((assignment) => (
                              (<tr key={assignment} className="bg-white">
                                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <p>
                                    <div className="flex">
                                      <p className="group inline-flex space-x-2 truncate text-sm">
                                        <DocumentTextIcon
                                          className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <p className="animate-pulse rounded-md bg-gray-200 text-gray-200">Kinematics in One Dim</p>
                                      </p>
                                    </div>
                                  </p>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                  <p>
                                    <span className="animate-pulse text-gray-200 bg-gray-200 rounded-md font-medium">93 / 100</span>
                                  </p>
                                </td>
                                <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                  <p>
                                    <span
                                      className="animate-pulse bg-gray-200 text-gray-200 inline-flex items-center px-2.5 rounded-md text-xs font-medium capitalize"
                                    >
                                      Completed
                                    </span>
                                  </p>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                  <p>
                                    <time className="bg-gray-200 rounded-md text-gray-200 animate-pulse">June 23, 2021</time>
                                  </p>
                                </td>
                              </tr>)
                            )) :
                            homework.map((assignment, assignmentIdx) => (
                              assignmentIdx < numAssignments &&
                                <tr key={assignment.id} className="bg-white">
                                  <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <Link to={`/homework/${course}/${assignment.module}/${assignment.id}`}>
                                      <div className="flex">
                                        <p className="group inline-flex space-x-2 truncate text-sm">
                                          <DocumentTextIcon
                                            className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <p className="text-gray-900 truncate group-hover:text-gray-400">{assignment.name}</p>
                                        </p>
                                      </div>
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <Link to={`/homework/${course}/${assignment.module}/${assignment.id}`}>
                                      <span className="text-gray-900 font-medium">{assignment.grade} </span>
                                    </Link>
                                  </td>
                                  <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                    <Link to={`/homework/${course}/${assignment.module}/${assignment.id}`}>
                                      <span
                                        className={classNames(
                                          statusStyles[assignment.status],
                                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                        )}
                                      >
                                        {assignment.status}
                                      </span>
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <Link to={`/homework/${course}/${assignment.module}/${assignment.id}`}>
                                      <time dateTime={assignment.due}>{assignment.due}</time>
                                    </Link>
                                  </td>
                                </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{numAssignments}</span>{' '}assignment{numAssignments === 1 ? '' : 's'}
                          </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                          <button
                            onClick={updateAssignments}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            {viewStatus ? 'View All' : 'Hide'}
                          </button>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <Leaders />
            </div>
          </main>
        </div>
      </div>
    </Page>
  )
}