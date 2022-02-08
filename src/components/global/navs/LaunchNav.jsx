import EvCirc from '../../../images/evcirc.png'
import { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '../../../contexts/AuthContext'
import {
  ChevronDownIcon,
} from '@heroicons/react/solid'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { database } from '../../../firebase'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LaunchNav(props) {
  const history = useHistory()
  const [admin, setAdmin] = useState(false);
  const { currentUser, signout } = useAuth()
  const user = useDocumentData(database.users.doc(currentUser.email))[0]

  useEffect(() => {
    if (user) {
      setAdmin(user.admin || user.instructor);
    }
  }, [user])

  async function handleLogout(event) {
    event.preventDefault()
    try {
      history.push("/landing")
      await signout()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <img
                className="hidden h-16 w-16 rounded-full sm:block"
                src={EvCirc}
                alt=""
              />
              <div>
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full sm:hidden"
                    src={EvCirc}
                    alt=""
                  />
                  <h1 className="ml-3 text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    {props.info}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <Menu as="div" className="md:ml-3 relative z-50">
            {({ open }) => (
              <>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <Menu.Button className="max-w-xs bg-cyan-600 rounded-md flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 p-2 hover:by-cyan-700">
                    <span className="ml-3 text-white text-sm font-medium lg:block">
                      Actions
                    </span>
                    <ChevronDownIcon
                      className="flex-shrink-0 ml-1 h-5 w-5 text-white lg:block"
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
                    className="absolute origin-top-left md:origin-top-right md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                          to="/enroll"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'text-left block px-4 w-full py-2 text-sm text-gray-700'
                          )}
                        >
                          My Courses
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
                    {admin && 
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/admin/home"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Admin Portal
                          </Link>
                        )}
                      </ Menu.Item>
                    }
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
  )
}