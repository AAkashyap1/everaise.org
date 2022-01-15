import { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '../../../contexts/AuthContext'
import { database } from '../../../firebase'
import {
  ChevronDownIcon,
} from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileDropdown() {
  const [name, setName] = useState('')
  const history = useHistory()
  const { currentUser, signout } = useAuth()
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
    } catch (err) {
      console.log(err)
    }
  }

  return (
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
  )
}