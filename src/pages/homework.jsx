import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'
import Assignment from '../components/assignment'
import {
  ChartBarIcon,
  ChatAlt2Icon,
  DocumentTextIcon,
  MenuAlt1Icon,
  XIcon,
} from '@heroicons/react/outline'
import {
  CheckIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ExclamationIcon,
  SearchIcon,
} from '@heroicons/react/solid'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, current: false },
  { name: 'Homework', href: '', icon: DocumentTextIcon, current: true },
  { name: 'Discussion', href: 'https://discord.gg/JE5TaCrrFn', icon: ChatAlt2Icon, current: false },
]

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
  const [name, setName] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signout, currentUser } = useAuth()
  const [count, setCount] = useState(0)
  const history = useHistory()

  let courseName = null
  let userData = null
  let secondaryNavigation = []
  if (course === 'physics') {
    courseName = 'Physics Mechanics'
    userData = database.physics_users
    secondaryNavigation = [
      { name: 'Module 1: Kinematics and Dynamics', disabled: false, href: '1', defaultDoc: 'hL3k7Amo4XKNzD3l5y7Z', icon: DocumentTextIcon },
      { name: 'Module 2: Rotation', href: '2', disabled: false, defaultDoc: 'D6PLNCKV1MUeqLx2if7a', icon: DocumentTextIcon },
      { name: 'Module 3: Oscillations and Gravity', disabled: false, href: '3', defaultDoc: 's7Opzrn4QzmlQb8dSmiR', icon: DocumentTextIcon },
      { name: 'Module 4: Fluids and Miscellaneous', disabled: false, href: '4', defaultDoc: 'Usqorf4QBflAmA5yfKpS', icon: DocumentTextIcon },
    ]
  } else if (course === 'math') {
    courseName = 'Math Competitions 1'
    userData = database.math_users
    secondaryNavigation = [
      { name: 'Module 1: Algebra', disabled: false, href: '1', defaultDoc: 'oESnyw427hwAxLSt6tuk', icon: DocumentTextIcon },
      { name: 'Module 2: Geometry', disabled: false, href: '2', defaultDoc: 'JkhjFUEqMPzELeZIMGe1', icon: DocumentTextIcon },
      { name: 'Module 3: Combinatorics', disabled: false, href: '3', defaultDoc: 'DHOhTth9CTE04xh39LPu', icon: DocumentTextIcon },
      { name: 'Module 4: Number Theory', disabled: false, href: '4', defaultDoc: 'nL5lJdfk2IsJYnjYgYy2', icon: DocumentTextIcon },
    ]
  } else if (course === 'biology') {
    courseName = 'Biology'
    userData = database.biology_users
    secondaryNavigation = [
      { name: 'Module 1: Cell Biology', disabled: false, href: '1', defaultDoc: '1XLDJJ2bO3tjEBA6i15G', icon: DocumentTextIcon },
      { name: 'Module 2: Genetics and Evolution', disabled: false, href: '2', defaultDoc: 'EysuF0hlUVPv6wJMvhHF', icon: DocumentTextIcon },
      { name: 'Module 3: Animal Anatomy and Physiology', disabled: false, href: '3', defaultDoc: 'TnZH8rG9A1GUgExglYgq', icon: DocumentTextIcon },
      { name: 'Module 4: Plant Anatomy and Physiology', disabled: false, href: '4', defaultDoc: 'nL5lJdfk2IsJYnjYgYy2', icon: DocumentTextIcon },
    ]
  } else if (course === 'astronomy') {
    courseName = 'Astronomy'
    userData = database.astronomy_users
    secondaryNavigation = [
      { name: 'Module 1: Basic Astrophysics', disabled: false, href: '1', defaultDoc: '1Z2ywXi5PDYfDT8PWb8p', icon: DocumentTextIcon },
      { name: 'Module 2: Coordinates and Times', disabled: false, href: '2', defaultDoc: 'CKQ9iYggFJm88zOeDFoI', icon: DocumentTextIcon },
      { name: 'Module 3: The Solar System and Stars', disabled: false, href: '3', defaultDoc: 'Ir73of5OgMBlt0sh62ap', icon: DocumentTextIcon },
      { name: 'Module 4: Stellar Systems and Cosmology', disabled: false, href: '4', defaultDoc: 'QBBUWbrwqyvZQroM34qB', icon: DocumentTextIcon },
      { name: 'Module 5: Optics, Practical Observation', disabled: false, href: '5', defaultDoc: 'Ws5u153PRsgg3B9alxE8', icon: DocumentTextIcon },
    ]
  }

  useEffect(() => {
    userData.doc(currentUser.email).collection('assignments').doc(assignmentId).get().then((doc) => {
      document.title = doc.data().name + ' - ' + courseName + ' Homework'
    })
  })

  function getUserName() {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setName(doc.data().first_name + ' ' + doc.data().last_name)
      })
    return name
  }

  function GetTimeline() {
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
      userData.doc(currentUser.email).collection('assignments').where('due', '>', new Date("06/10/2021")).orderBy('due', 'asc')
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

  function RefreshModule(event, moduleVal, id) {
    event.preventDefault()
    history.push(`/homework/${course}/${moduleVal}/${id}`)
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
      userData.doc(currentUser.email).collection('assignments').doc(assignmentId).get()
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
                    src={process.env.REACT_APP_LAUNCH}
                    alt="Everaise logo"
                  ></img>
                </Link>
              </div>
              <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    (item.name === 'Discussion' || item.name === 'Homework') ?
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
                        to={`/dashboard/${course}`}
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
                      item.disabled === true ?
                        <p
                          className={classNames(
                            item.href === module ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </p> :
                        <Link
                          key={item.name}
                          onClick={event => RefreshModule(event, item.href, item.defaultDoc)}
                          className={classNames(
                            item.href === module ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
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
                  src={process.env.REACT_APP_LAUNCH}
                  alt="Everaise logo"
                ></img>
              </Link>
            </div>
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  (item.name === 'Discussion' || item.name === 'Homework') ?
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
                      to={`/dashboard/${course}`}
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
                    item.disabled === true ?
                      <p
                        className={classNames(
                          item.href === module ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </p> :
                      <Link
                        key={item.name}
                        onClick={event => RefreshModule(event, item.href, item.defaultDoc)}
                        className={classNames(
                          item.href === module ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                        )}
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
                    placeholder="Search Assignments"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              <Menu as="div" className="ml-3 relative z-50">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={process.env.REACT_APP_EVCIRC}
                          alt=""
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
          {/* Page header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="flex-1 min-w-0">
                  {/* Profile */}
                  <div className="flex items-center">
                    <img
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src={process.env.REACT_APP_EVCIRC}
                      alt=""
                    />
                    <div>
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 rounded-full sm:hidden"
                          src={process.env.REACT_APP_EVCIRC}
                          alt=""
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                          {courseName} - Module {module}
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
                            <button onClick={event => { Refresh(event, item.id) }} className="text-left relative flex space-x-3">
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