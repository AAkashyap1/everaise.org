import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useAuth } from '../contexts/AuthContext'
import { database, getUserInfo, increment } from '../firebase'
import {
  CalculatorIcon,
  EyeIcon,
  HomeIcon,
  MenuAlt1Icon,
  XIcon,
  FingerPrintIcon,
  ChatAlt2Icon
} from '@heroicons/react/outline'
import {
  ChevronDownIcon,
  GlobeIcon,
  SearchIcon,
  VariableIcon,
} from '@heroicons/react/solid'

const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon, current: true },
]

const secondaryNavigation = [
  { name: 'Discussion', href: 'https://discord.gg/JE5TaCrrFn', icon: ChatAlt2Icon, current: false },
]

const announcements = [
  {
    id: '1',
    likes: '0',
    replies: '0',
    views: '0',
    author: {
      name: 'Everaise Academy',
      imageUrl: process.env.REACT_APP_EVCIRC,
      href: '#',
    },
    date: 'June 20 at 9:45 AM',
    datetime: '2021-06-20T09:45:00',
    href: 'https://everaise.org/',
    title: 'Welcome to Everaise Launch!',
    body:
      '\n          <p>\n            Hello everyone! Welcome to Everaise Launch, the official learning management system for Everaise Academy. Through Launch, you can manage everything from homework submissions to your class rank. If you have any questions feel free to join the discord through the link in the navigation bar. Happy learning! \n          </p>\n          <p>\n',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [name, setName] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signout, currentUser } = useAuth()
  const history = useHistory()
  const [cards] = useState([])
  const [count, setCount] = useState(0)


  useEffect(() => {
    document.title = 'Course Home - Everaise Launch'
  })

  useEffect(() => {
    async function fetchData() {
      try {
        await database.total_users.doc("default").update({
          total_users: increment,
        })
  
        database.total_users.doc("default").get()
          .then((doc) => {
            setCount(doc.data().total_users)
          })
      } catch {
        
      }
    }
    fetchData()
  }, [])

  
  useEffect(() => {
    let cardIcon = null
    let param = null
    let dateCourse = null

    getUserInfo(currentUser.email).then((doc) => {
      doc.data().courses.map((course) => {
        if (course.value === true) {
          if (course.name === 'Physics Mechanics') {
            param = 'physics'
            cardIcon = CalculatorIcon
            dateCourse = 'June 21 - August 6'
          } else if (course.name === 'Biology') {
            param = 'biology'
            cardIcon = FingerPrintIcon
            dateCourse = 'July 5 - August 6'
          } else if (course.name === 'Astronomy') {
            param = 'astronomy'
            cardIcon = GlobeIcon 
            dateCourse = 'July 12 - August 6'
          } else {
            param = 'math'
            cardIcon = VariableIcon
            dateCourse = 'July 12 - August 6'
          }
        
          cards.push({ name: course.name, to: param, icon: cardIcon, dates: dateCourse })
        }
        return true
      })
    })
  }, [cards, currentUser.email])

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
                    src={process.env.REACT_APP_LAUNCH}
                    alt="Everaise Launch"
                  ></img>
                </Link>
              </div>
              <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <p
                      className={classNames(
                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </p>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.param}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </a>
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
                  <p
                    className={classNames(
                      item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={classNames(
                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                      )}
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </a>
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
                    placeholder="Search Announcements, Courses, etc."
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
                          src={process.env.REACT_APP_EVCIRC}
                          alt=""
                        />
                        <span className="ml-3 text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {(currentUser === null) ? 
                            <span>
                              Not Signed In
                            </span> :
                            <span>
                              {getUserName()}
                            </span>
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
                            <p
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Course Home
                            </p>
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
                          Hello, {getUserName()}
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Ongoing Courses</h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                  <div key={card.param} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">{card.dates}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <Link to={ `/dashboard/${card.to}`} className="font-medium text-cyan-700 hover:text-cyan-900">
                          View Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Announcements
            </h2>

            <div className="">
              <div className="mx-auto sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8">
                <main className="mt-2 col-span-1 lg:col-span-9 xl:col-span-6">
                  <ul className="space-y-4">
                    {announcements.map((question) => (
                      <li key={question.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                        <article aria-labelledby={'question-title-' + question.id}>
                          <div>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <a href={question.href} target="_blank" rel="noreferrer">
                                  <img className="h-10 w-10 rounded-full" src={question.author.imageUrl} alt="" />
                                </a>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  <a href={question.href} target="_blank" rel="noreferrer" className="hover:underline">
                                    {question.author.name}
                                  </a>
                                </p>
                                <p className="text-sm text-gray-500">
                                  <p className="hover:underline">
                                    <time dateTime={question.datetime}>{question.date}</time>
                                  </p>
                                </p>
                              </div>
                            </div>
                            <h2 id={'question-title-' + question.id} className="mt-4 text-base font-medium text-gray-900">
                              {question.title}
                            </h2>
                          </div>
                          <div
                            className="mt-2 text-sm text-gray-700 space-y-4"
                            dangerouslySetInnerHTML={{ __html: question.body }}
                          />
                          <div className="mt-6 flex justify-between space-x-8">
                            <div className="flex space-x-6">
                              <span className="inline-flex items-center text-sm">
                                <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                  <span className="font-medium text-gray-900">{count}</span>
                                  <span className="sr-only">views</span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </main>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}