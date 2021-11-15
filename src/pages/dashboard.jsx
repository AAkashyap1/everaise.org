import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { database } from '../firebase'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import Launch from '../images/launch.png'
import EvCirc from '../images/evcirc.png'
import {
  ChartBarIcon,
  ChartSquareBarIcon,
  ChatAlt2Icon,
  DocumentTextIcon,
  HomeIcon,
  MenuAlt1Icon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FireIcon,
  SearchIcon,
} from '@heroicons/react/solid'

const navigation = [
  { name: 'Dashboard', href: '', icon: ChartBarIcon, current: true },
  { name: 'Homework', href: '/homework', icon: DocumentTextIcon, current: false },
  { name: 'Discussion', href: 'https://discord.gg/JE5TaCrrFn', icon: ChatAlt2Icon, current: false },
]
const secondaryNavigation = [
  { name: 'Home', href: '/home', icon: HomeIcon },
]

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
  const [name, setName] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signout, currentUser } = useAuth()
  const [numAssignments, setNumAssignments] = useState(4)
  const [viewStatus, setViewStatus] = useState(true)
  const [cards, setCards] = useState([])
  const [leaders, setLeaders] = useState([])
  const [homework, setHomework] = useState([])
  const history = useHistory()

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

  const users = useCollectionData(userData.orderBy("points", "desc"))[0]
  const user = useDocumentData(userData.doc(currentUser.email))[0]
  const assignments = useCollectionData(userData.doc(currentUser.email).collection('assignments').orderBy('assigned', 'asc').limit(numAssignments))[0]

  useEffect(() => {
    if (user && users) {
      let rank = 1;
      for (const tempUser of users) {
        if(tempUser.points > user.points) {
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
            amount: rank + '/' + users.length
          },
        ]
      )
    }
  }, [users, user])

  useEffect(() => {
    if (users) {
      for (let i = 0; i < 10; i++) {
        if (users[i].points > 0) {
          setLeaders(prevLeaders => 
            [
              ...prevLeaders,
              {
                name: users[i].first_name + " " + users[i].last_name,
                points: users[i].points
              }
            ]
          )
        }
      }
    }
  }, [users])

  useEffect(() => {
    console.log(assignments)
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
                date: monthNames[assignment.assigned.toDate().getMonth()] + ' ' + assignment.assigned.toDate().getDate() + ', ' + assignment.assigned.toDate().getFullYear(),
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

  useEffect(() => {
    document.title = 'Dashboard - ' + courseName
  })

  function updateAssignments(event) {
    setHomework([])
    event.preventDefault()
    setNumAssignments(totalAssignments - numAssignments)
    setViewStatus(!viewStatus)
  }

  function getUserName() {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setName(doc.data().first_name + ' ' + doc.data().last_name)
      })
    return name
  }

  async function handleLogout(event) {
    event.preventDefault()

    try {
      await signout()
      history.push("/landing")
    } catch {
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link to="/landing">
                  <img
                    className="h-8 w-auto"
                    src={Launch}
                    alt="Everaise Launch Logo"
                  ></img>
                </Link>
              </div>
              <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    (item.name === 'Dashboard' || item.name === 'Discussion') ?
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </a> :
                      <Link
                        key={item.name}
                        to={`/homework/${course}/${1}/${defaultDoc}`}
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/landing">
                <img
                  className="h-8 w-auto"
                  src={Launch}
                  alt="Everaise Launch Logo"
                ></img>
              </Link>
            </div>
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  (item.name === 'Dashboard' || item.name === 'Discussion') ?
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={classNames(
                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </a> :
                    <Link
                      key={item.name}
                      to={`/homework/${course}/${1}/${defaultDoc}`}
                      className={classNames(
                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <button
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Search bar */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search_field"
                    name="search_field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search Upcoming Lessons, Leaderboard"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative z-50">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={EvCirc}
                          alt="Everaise Logo"
                        />
                        <span className="ml-3 text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {(currentUser === null) ?
                            <p>
                              Not Signed In
                            </p> :
                            <p>
                              {getUserName()}
                            </p>
                          }
                        </span>
                        <ChevronDownIcon
                          className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/home"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Course Home
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'text-left block px-4 w-full py-2 text-sm text-gray-700'
                              )}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="flex-1 min-w-0">
                  {/* Profile */}
                  <div className="flex items-center">
                    <img
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src={EvCirc}
                      alt="Everaise Logo"
                    />
                    <div>
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 rounded-full sm:hidden"
                          src={EvCirc}
                          alt="Everaise Logo"
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                          {courseName} - Dashboard
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <Link
                    to="/enroll"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Add Course
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
                            <div className="h-6 w-6 bg-gray-200 rounded-full " aria-hidden="true" />
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
                              <span className="bg-gray-200 text-gray-200 rounded-md h-4 truncate">Kinematics in One Dimension</span>
                              <span>
                                <span className="bg-gray-200 text-gray-200 rounded-md font-medium">99 / 100</span>{' '}
                              </span>
                              <time className="rounded-md bg-gray-200 text-gray-200 text-sm w-1/2 h-4">June 23, 2021</time>
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
                        {homework.map((assignment) => (
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
                        ))}
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
  )
}