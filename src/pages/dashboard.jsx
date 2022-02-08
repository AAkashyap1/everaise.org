import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database } from '../firebase'
import { useCollectionData, useDocumentData, useCollection } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import {
  ChartSquareBarIcon,
  DocumentTextIcon,
  MenuAlt1Icon,
  UserIcon,
} from '@heroicons/react/outline'
import {
  ChevronRightIcon,
  FireIcon,
} from '@heroicons/react/solid'
import { dashboardNavigation, dashboardSecondaryNavigation } from '../data/launch/navigation/labels'
import LaunchNav from '../components/global/navs/LaunchNav'
import SideNav from '../components/global/navs/SideNav'
import courseData from '../data/launch/courseData'
import Page from '../components/page'

const statusStyles = {
  'complete': 'bg-green-100 text-green-800',
  'in Progress': 'bg-yellow-100 text-yellow-800',
  'not Started': 'bg-red-100 text-red-800',
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { course } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentUser } = useAuth()
  const [numAssignments, setNumAssignments] = useState(4)
  const [viewStatus, setViewStatus] = useState(true)
  const [cards, setCards] = useState([])
  const [leaders, setLeaders] = useState([])
  const [homework, setHomework] = useState([])

  let courseName = null
  let userData = null
  let defaultDoc = null
  let totalAssignments = null

  if (course === 'physics') {
    courseName = 'Physics Mechanics'
    userData = database.physics_users
    defaultDoc = 'hL3k7Amo4XKNzD3l5y7Z'
    totalAssignments = 25
  } else if (course === 'math') {
    courseName = 'Math Competitions 1'
    userData = database.math_users
    defaultDoc = 'oESnyw427hwAxLSt6tuk'
    totalAssignments = 16
  } else if (course === 'biology') {
    courseName = 'Biology'
    defaultDoc = '1XLDJJ2bO3tjEBA6i15G'
    userData = database.biology_users
    totalAssignments = 28
  } else if (course === 'astronomy') {
    courseName = 'Astronomy'
    defaultDoc = '1Z2ywXi5PDYfDT8PWb8p'
    userData = database.astronomy_users
    totalAssignments = 23
  }

  dashboardNavigation[1].href = `/homework/${course}/1/${defaultDoc}`

  const subjectUsers = useCollection(userData.orderBy("points", "desc"))[0]
  const users = useCollectionData(database.users)[0]
  const user = useDocumentData(userData.doc(currentUser.email))[0]
  const assignments = useCollectionData(userData.doc(currentUser.email).collection('assignments').orderBy('assigned', 'asc').limit(numAssignments))[0]
  
  useEffect(() => {
    if (user && subjectUsers) {
      let rank = 1;
      for (const tempUser of subjectUsers.docs) {
        if(tempUser.data().points > user.points) {
          rank += 1
        }
      }
      setCards(
        [
          {
            name: 'Points', 
            icon: FireIcon,
            amount: user.points
          },
          {
            name: 'Rank', 
            icon: ChartSquareBarIcon,
            amount: rank + '/' + subjectUsers.docs.length
          },
        ]
      )
    }
  }, [subjectUsers, user])
  
  useEffect(() => {
    if (subjectUsers && users) {
      let tLeaders = []
      for (let i = 0; i < Math.min(subjectUsers.docs.length, 10); i++) {
        let first_name, last_name;
        for (const tempUser of users) {
          if (subjectUsers.docs[i].id === tempUser.email) {
            first_name = tempUser.first_name;
            last_name = tempUser.last_name;
            break;
          }
        } 
        tLeaders.push(
          {
            name: first_name + " " + last_name,
            points: subjectUsers.docs[i].data().points
          }
        )
      }
      setLeaders(tLeaders);
    }
  }, [subjectUsers, users])

  useEffect(() => {
    if (assignments) {
      for (const assignment of assignments) {
        if (assignment.completed === 0) {
          setHomework(prevHomework => 
            [
              ...prevHomework,
              {
                id: assignment.name,
                module: assignment.module,
                name: assignment.name,
                disabled: assignment.disabled,
                grade: assignment.earned + '/' + assignment.points,
                status: 'not Started',
                date: monthNames[assignment.assigned.toDate().getMonth()] + ' ' + 
                      assignment.assigned.toDate().getDate() + ', ' +
                      assignment.assigned.toDate().getFullYear(),
                datetime: assignment.assigned,
              }
            ]
          )
        } else if (assignment.completed === assignment.problems) {
          setHomework(prevHomework => 
            [
              ...prevHomework,
              {
                id: assignment.name,
                module: assignment.module,
                name: assignment.name,
                disabled: assignment.disabled,
                grade: assignment.earned + '/' + assignment.points,
                status: 'complete',
                date: monthNames[assignment.assigned.toDate().getMonth()] + ' ' + assignment.assigned.toDate().getDate() + ', ' + assignment.assigned.toDate().getFullYear(),
                datetime: assignment.assigned,
              }
            ]
          )
        } else {
          setHomework(prevHomework => 
            [
              ...prevHomework,
              {
                id: assignment.name,
                module: assignment.module,
                name: assignment.name,
                disabled: assignment.disabled,
                grade: assignment.earned + '/' + assignment.points,
                status: 'in Progress',
                date: monthNames[assignment.assigned.toDate().getMonth()] + ' ' + assignment.assigned.toDate().getDate() + ', ' + assignment.assigned.toDate().getFullYear(),
                datetime: assignment.assigned,
              }
            ]
          )
        }
      }
    }
  }, [assignments])

  function updateAssignments(event) {
    setHomework([])
    event.preventDefault()
    setNumAssignments(totalAssignments - numAssignments)
    setViewStatus(!viewStatus)
  }

  return (
    <Page 
      title={"Dashboard - " + courseName}
      description={"Access all information related to the Everaise Academy " + courseName + " course."}
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
              {cards.length === 0 &&
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                  <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {['1', '2'].map((card) => (
                      <div key={card} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl className="space-y-1.5">
                                <dt className="text-sm rounded-md text-gray-200 bg-gray-200 w-1/2 h-4 animate-pulse">Points</dt>
                                <dd>
                                  <div className="text-sm rounded-md text-gray-200 bg-gray-200 animate-pulse">1/333</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
              {cards.length > 0 &&
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                  <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                      <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                                <dd>
                                  <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }

              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Assignment Log
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  {homework.length === 0 ?
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
                        {assignment.disabled === true ?
                          <p className="block px-4 py-4 bg-white hover:bg-gray-50">
                            <span className="flex items-center space-x-4">
                              <span className="flex-1 flex space-x-2 truncate">
                                <DocumentTextIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                                <span className="flex flex-col text-gray-900 text-sm truncate">
                                  <span className="truncate">{assignment.name}</span>
                                  <span>
                                    <span className="text-gray-900 font-medium">{assignment.grade}</span>{' '}
                                  </span>
                                  <time dateTime={assignment.datetime}>{assignment.date}</time>
                                </span>
                              </span>
                              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </p> :
                          <Link to={`/homework/${course}/${assignment.module}/${assignment.id}`} className="block px-4 py-4 bg-white hover:bg-gray-50">
                            <span className="flex items-center space-x-4">
                              <span className="flex-1 flex space-x-2 truncate">
                                <DocumentTextIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                                <span className="flex flex-col text-gray-900 text-sm truncate">
                                  <span className="truncate">{assignment.name}</span>
                                  <span>
                                    <span className="text-gray-900 font-medium">{assignment.grade}</span>{' '}
                                  </span>
                                  <time dateTime={assignment.datetime}>{assignment.date}</time>
                                </span>
                              </span>
                              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Link>
                        }
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
                              Available
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {homework.length === 0 ? 
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
                            homework.map((assignment) => (
                              assignment.disabled === true ?
                                (<tr key={assignment.id} className="bg-white">
                                  <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <p>
                                      <div className="flex">
                                        <p className="group inline-flex space-x-2 truncate text-sm">
                                          <DocumentTextIcon
                                            className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <p className="text-gray-900 truncate group-hover:text-gray-400">{assignment.name}</p>
                                        </p>
                                      </div>
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <p>
                                      <span className="text-gray-900 font-medium">{assignment.grade} </span>
                                    </p>
                                  </td>
                                  <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                    <p>
                                      <span
                                        className={classNames(
                                          statusStyles[assignment.status],
                                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                        )}
                                      >
                                        {assignment.status}
                                      </span>
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <p>
                                      <time dateTime={assignment.datetime}>{assignment.date}</time>
                                    </p>
                                  </td>
                                </tr>)
                                :
                                (<tr key={assignment.id} className="bg-white">
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
                                      <time dateTime={assignment.datetime}>{assignment.date}</time>
                                    </Link>
                                  </td>
                                </tr>)
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

              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Leaderboard
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  {leaders.map((leader) => (
                    <li key={leader.points}>
                      <p className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <UserIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                            <span className="flex flex-col text-gray-900 text-sm truncate">
                              <span className="truncate">{leader.name}</span>
                              <span>
                                <span className="text-gray-900 font-medium">{leader.points}</span>{' '}
                              </span>
                              <span>{leader.date}</span>
                            </span>
                          </span>
                          <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
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
                              Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Points
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {leaders.length === 0 ?
                            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((leader) => (
                              <tr key={leader} className="bg-white">
                                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <div className="flex">
                                    <p className="group inline-flex space-x-2 truncate text-sm">
                                      <UserIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="rounded-md w-1/2 h-4 bg-gray-200 truncate text-gray-200 animate-pulse">Ananth Kashyap / Ananth Kashyap</span>
                                    </p>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                  <span className="text-gray-200 bg-gray-200 rounded-md w-full h-4 animate-pulse">250</span>
                                </td>
                              </tr>
                            )) :
                            leaders.map((leader) => (
                              <tr key={leader.points} className="bg-white">
                                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <div className="flex">
                                    <p className="group inline-flex space-x-2 truncate text-sm">
                                      <UserIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="text-gray-900 truncate group-hover:text-gray-400">{leader.name}</span>
                                    </p>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                  <span className="text-gray-900 font-medium">{leader.points} </span>
                                </td>
                              </tr>
                            )) 
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Page>
  )
}