import { Fragment, useState } from 'react'
import { Popover, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { database } from '../firebase'
import {
  UserGroupIcon, 
  MailIcon, 
  ChatAltIcon,
  ChartBarIcon,
  XIcon,
  MenuIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid'
import Logo from '../images/EveraiseAcademy.png'

const events = [
  {
    name: 'Guest Speakers',
    description: 'View our past guest speakings taught by experienced students and professors.',
    icon: ChatAltIcon,
    href: '/events/guest-speakers'
  },
  {
    name: 'Contests',
    description: 'Participate in carefully crafted, challenging contests with some of the best Olympiad students from around the world.',
    icon: ChartBarIcon,
    href: '/events/contests/estimathon'
  },
]

const people = [
  {
    name: 'Our Team',
    description: 'View the people who help make Everaise Academy possible.',
    icon: UserGroupIcon,
    href: '/people/team'
  },
  {
    name: 'Join Us',
    description: 'View the people who help make Everaise Academy possible.',
    icon: SpeakerphoneIcon,
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeiQXl_vdbjcAFv4SRt1Zr8wZiylSfh4y30CMSVFr5r_ZQl3g/viewform'
  },
  { name: 'Contact Us', 
    description: 'We respond to all forms and emails as soon as possible.',
    icon: MailIcon, 
    href: '/contact'
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'Courses', href: '/courses' },
  { name: 'Resources', href: '/resources' },
  { name: 'Guest Speakers', href: '/events/guest-speakers' },
  { name: 'Contests', href: '/events/contests/estimathon' },
  { name: 'Team', href: '/people/team' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Nav() {
  const [name, setName] = useState('')
  const [admin, setAdmin] = useState(false)
  const { currentUser, signout } = useAuth()
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false)
  const [mobilePeopleOpen, setMobilePeopleOpen] = useState(false)

  async function handleLogout(event) {
    event.preventDefault()

    try {
      await signout()
    } catch {

    }
  }

  function getUserName() {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setName(doc.data().first_name + ' ' + doc.data().last_name)
      })
    return name
  }

  function getAdmin() {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setAdmin(doc.data().admin)
      })
    return admin
  }

  return (
    <header>
      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:space-x-10 lg:px-8">
              <div className="flex lg:w-0 lg:flex-1">
                <Link
                  to="/landing"
                >
                  <span className="sr-only">Everaise</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src={Logo}
                    alt="Everaise Academy"
                  />
                </Link>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10 z-40">
                <Link to="/courses" className="unfocus text-base font-medium text-gray-500 hover:text-gray-900">
                  Courses
                </Link>
                <Link to="/resources" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Resources
                </Link>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'unfocus group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                        )}
                      >
                        <span>Events</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          static
                          className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 md::left-1/2 md:-translate-x-1/2"
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                              {events.map((item) => (
                                <Link
                                  to={item.href}
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-cyan-600 text-white sm:h-12 sm:w-12">
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'unfocus group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                        )}
                      >
                        <span>People</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          static
                          className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 md:left-1/2 md:-translate-x-1/2"
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                              {people.map((item) => (
                                item.href.startsWith('/') ?
                                  <Link
                                    to={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-cyan-600 text-white sm:h-12 sm:w-12">
                                      <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">{item.name}</p>
                                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                    </div>
                                  </Link> :
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-cyan-600 text-white sm:h-12 sm:w-12">
                                      <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">{item.name}</p>
                                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                    </div>
                                  </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <Menu as="div" className="ml-3 relative z-50">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
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
                                View Profile
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
                          {currentUser && <Menu.Item>
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
                          </Menu.Item>}
                          {!currentUser && <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/update"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'text-left block px-4 w-full py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign In
                              </Link>
                            )}
                          </Menu.Item>}
                          {(currentUser && getAdmin()) && <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin-courses"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'text-left block px-4 w-full py-2 text-sm text-gray-700'
                                )}
                              >
                                Admin Portal
                              </Link>
                            )}
                          </Menu.Item>}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>

              {/* Mobile Nav Menu */}
              <div className="flex md:hidden items-center">
                <div className="md:hidden">
                  <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                    <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                      <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="-mr-2 flex items-center md:hidden">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-900 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex md:space-x-10">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>

                <Transition
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                  >
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <Link
                            to="/landing"
                          >
                            <img
                              className="h-8 w-auto"
                              src={Logo}
                              alt="logo"
                            />
                          </Link>
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3">
                        <Link
                          to="/courses"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          Courses
                        </Link>
                        <Link
                          to="/resources"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          Resources
                        </Link>
                        <div 
                          onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                          className="cursor-pointer w-full inline-flex block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <div
                            className="flex justify-start w-full"
                          >
                            Events
                          </div>
                          {mobileEventsOpen ? 
                            <span><ChevronUpIcon className="mt-1 h-5 w-5 flex justify-end"/></span> :
                            <span><ChevronDownIcon className="mt-1 h-5 w-5 flex justify-end"/></span>
                          }
                        </div>
                        {mobileEventsOpen &&
                          <div>
                            {events.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <span className="ml-5">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        }
                        <div 
                          onClick={() => setMobilePeopleOpen(!mobilePeopleOpen)}
                          className="cursor-pointer w-full inline-flex block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <div
                            className="flex justify-start w-full"
                          >
                            People
                          </div>
                          {mobilePeopleOpen ? 
                            <span><ChevronUpIcon className="mt-1 h-5 w-5 flex justify-end"/></span> :
                            <span><ChevronDownIcon className="mt-1 h-5 w-5 flex justify-end"/></span>
                          }
                        </div>
                        {mobilePeopleOpen &&
                          <div>
                            {people.map((item) => (
                              item.href.startsWith('/') ? 
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                  <span className="ml-5">{item.name}</span>
                                </Link> :
                                <a
                                  key={item.name}
                                  href={item.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                  <span className="ml-5">{item.name}</span>
                                </a> 
                            ))}
                          </div>
                        }
                        {!currentUser && 
                          <div>
                            <Link
                              to="/home"
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Log In / Sign Up
                            </Link>
                          </div>
                        }
                        {currentUser && 
                          <div>
                            <Link
                              to="/enroll"
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Enroll
                            </Link>
                            <Link
                              to="/home"
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Course Home
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="unfocus w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Sign Out
                            </button>
                          </div>
                        }
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </div>
          </>
        )}
      </Popover>
    </header>
  )
}
