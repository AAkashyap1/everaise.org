import { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import courseData from '../data/launch/courseData'
import Assignment from '../components/assignment'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { homeworkNavigation } from '../data/launch/navigation/labels'
import ProfileDropdown from '../components/global/dropdowns/ProfileDropdown'
import SideNav from '../components/global/navs/SideNav'
import EvCirc from '../images/evcirc.png'
import {
  ChartBarIcon,
  ChatAlt2Icon,
  MenuAlt1Icon,
  XIcon,
} from '@heroicons/react/outline'
import {
  CheckIcon,
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  ExclamationIcon,
} from '@heroicons/react/solid'
import LaunchNav from '../components/global/navs/LaunchNav'

const eventTypes = {
  notstarted: { icon: XIcon, bgColorClass: 'bg-red-400' },
  complete: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  progress: { icon: ChevronDoubleRightIcon, bgColorClass: 'bg-yellow-400' }
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  let { course } = useParams()
  let { assignmentId } = useParams()
  let { module } = useParams()
  const { currentUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [count, setCount] = useState(0)
  const history = useHistory()

  const [modules, setModules] = useState([]);
  const assignmentData = useCollectionData(courseData[course].assignmentData)[0];

  homeworkNavigation[0].href = `/dashboard/${course}`

  useEffect(() => {
    if (assignmentData) {
      let assignments = [];
      var i = 0;
      for (const assignment of assignmentData) {
        assignments.push({ name: courseData[course].courseName.charAt(0) + String(i + 1) +": " + assignment.name, 
        current: (i + 1 === parseInt(module)), defaultDoc: '', href: '', icon: DocumentTextIcon })
        i++;
      }
      setModules(assignments);
    }
  }, [assignmentData])

  useEffect(() => {
    courseData[course].userData.doc(currentUser.email).collection('assignments').doc(assignmentId).get().then((doc) => {
      document.title = doc.data().name + ' - ' + courseData[course].courseName + ' Homework'
    })
  })

  function GetTimeline() {
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
      courseData[course].userData.doc(currentUser.email).collection('assignments').where('due', '>', new Date("06/10/2021")).orderBy('due', 'asc')
        .get().then((querySnapshot) => {
          let arr = []
          let count = 0
          querySnapshot.forEach((doc) => {
            if (String(doc.data().module) === module) {
              if (doc.data().completed === 0) {
                arr.push({
                  id: doc.id,
                  type: eventTypes.notstarted,
                  href: '#',
                  content: 'Not Started -',
                  name: doc.data().name,
                  disabled: doc.data().disabled,
                  date: monthNames[doc.data().due.toDate().getMonth()] + ' ' + doc.data().due.toDate().getDate(),
                  datetime: doc.data().due,
                })
              } else {
                arr.push({
                  id: doc.id,
                  type: doc.data().completed === doc.data().problems ? eventTypes.complete : eventTypes.progress,
                  href: '#',
                  content: doc.data().completed === doc.data().problems ? 'Complete -' : 'In Progress -',
                  name: doc.data().name,
                  disabled: doc.data().disabled,
                  date: monthNames[doc.data().due.toDate().getMonth()] + ' ' + doc.data().due.toDate().getDate(),
                  datetime: doc.data().due,
                })
              }
              count = count + 1
            }
          })
          setCount(count)
          setAssignments(arr)
        })
    }, [])
    return {
      assignments
    }
  }

  function Refresh(event, id) {
    event.preventDefault()
    history.push(`/homework/${course}/${module}/${id}`)
    history.go(0)
  }

  function GetAssignment() {
    const [assignment, setAssignment] = useState({
      name: '',
      points: 0,
      handout: '',
      problems: 0,
      earned: 0,
      completed: 0,
      due: 0,
      assigned: 0,
    })

    useEffect(() => {
      courseData[course].userData.doc(currentUser.email).collection('assignments').doc(assignmentId).get()
        .then((doc) => {
          setAssignment({
            name: doc.data().name,
            points: doc.data().points,
            handout: doc.data().handout,
            problems: doc.data().problems,
            completed: doc.data().completed,
            earned: doc.data().earned,
            due: monthNames[doc.data().due.toDate().getMonth()] + '. ' + doc.data().due.toDate().getDate(),
            assigned: monthNames[doc.data().assigned.toDate().getMonth()] + '. ' + doc.data().assigned.toDate().getDate(),
          })
        })
    }, [])

    return (
      <Assignment
        id={assignmentId}
        course={course}
        due={assignment.due}
        problems={assignment.problems}
        completed={assignment.completed}
        assigned={assignment.assigned}
        earned={assignment.earned}
        name={assignment.name}
        handout={assignment.handout}
        points={assignment.points}
      />
    )
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <SideNav 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        navigation={homeworkNavigation}
        secondaryNavigation={modules}
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
          <LaunchNav info={courseData[course].courseName + ' - Module ' + module} />
          <div className="mt-8 mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8 lg:grid-flow-col-dense lg:grid-cols-3">
            <section aria-labelledby="timeline-title" className="lg:col-start-1 lg:col-span-1">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  Assignment Timeline
                </h2>
                <div className="rounded-md bg-yellow-50 p-4 mt-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Due dates are optional</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          The following due dates are recommended, but not mandatory. This is a self-paced course.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  <ul className="-mb-8">
                    {GetTimeline().assignments.map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== count - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          {item.disabled === true ?
                            <p className="text-left relative flex space-x-3">
                              <div>
                                <p
                                  className={classNames(
                                    item.type.bgColorClass,
                                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                  )}
                                >
                                  <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                </p>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="mb-3 text-sm text-gray-500">
                                    {item.content}{' '}
                                    <span
                                      className="text-left font-medium text-gray-900 hover:text-gray-500"
                                    >
                                      {item.name}
                                    </span>
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  <time dateTime={item.datetime}>{item.date}</time>
                                </div>
                              </div>
                            </p> :
                            <button onClick={event => { Refresh(event, item.id) }} className="unfocus text-left relative flex space-x-3">
                              <div>
                                <p
                                  className={classNames(
                                    item.type.bgColorClass,
                                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                  )}
                                >
                                  <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                </p>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="mb-3 text-sm text-gray-500">
                                    {item.content}{' '}
                                    <span
                                      className="text-left font-medium text-gray-900 hover:text-gray-500"
                                    >
                                      {item.name}
                                    </span>
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  <time dateTime={item.datetime}>{item.date}</time>
                                </div>
                              </div>
                            </button>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
            {GetAssignment()}
          </div>
        </main>
      </div>
    </div>
  )
}