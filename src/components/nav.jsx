import { Fragment, useState } from 'react'
import { Popover, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { database } from '../firebase'
import {
  FingerPrintIcon,
} from '@heroicons/react/outline'
import { 
  GlobeIcon,
  VariableIcon, 
  CalculatorIcon,

} from '@heroicons/react/solid'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Logo from '../images/EveraiseAcademy.png'

const solutions = [
  {
    name: 'Math Competitions I',
    description: 'An intuition-building math competitions course including sequences and series, polynomials, combinatorial identities, triangle centers, and modular arithmetic.',
    icon: VariableIcon,
  },
  {
    name: 'Physics Mechanics',
    description: `A rigorous treatment of mechanics including kinematics, Newton's laws, collisions, rolling motion, oscillations, fluid statics, fictitious forces, and error analysis.`,
    icon: CalculatorIcon,
  },
  { name: 'Biology', 
    description: `A deep study of theoretical biology, covering a range of topics from cell biology, genetics, and human anatomy and physiology to the mechanisms underlying plant life.`,
    icon: FingerPrintIcon 
  },
  {
    name: 'Astronomy',
    description: `An introductory course in astronomy, including celestial coordinates, stellar systems, and cosmology in addition to important physics topics such as orbital mechanics.`,
    icon: GlobeIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav(props) {
  const [name, setName] = useState('')
  const [admin, setAdmin] = useState(false)
  const { currentUser, signout } = useAuth()

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
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                        )}
                      >
                        <span>Courses</span>
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
                          className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                              {solutions.map((item) => (
                                <p
                                  key={item.name}
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-cyan-600 text-white sm:h-12 sm:w-12">
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </p>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Link to="/events" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Events
                </Link>
                <Link to="/team" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Team
                </Link>
              </Popover.Group>
              <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
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
            </div>
          </>
        )}
      </Popover>
    </header>
  )
}
