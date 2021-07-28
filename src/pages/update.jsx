import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition, Listbox } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, XCircleIcon, SelectorIcon, CheckIcon } from '@heroicons/react/solid'
import { Link, useHistory } from 'react-router-dom'
import { database, getUserInfo } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { countryData } from '../variables/countries'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

let countries = []
let count = 1

countryData.map((country) => {
  count = count + 1
  return (
    countries.push({ id: count, name: country.name })
  )
})

export default function Update() {
  const { signout, currentUser } = useAuth()
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [age, setAge] = useState('')
  const [updateData, setUpdateData] = useState(false)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(1)
  const [selected, setSelected] = useState('')
  const [parent1Email, setParent1Email] = useState('')
  const [parent2Email, setParent2Email] = useState('')

  useEffect(() => {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setName(doc.data().first_name + ' ' + doc.data().last_name)
      })
  }, [currentUser])

  useEffect(() => {
    document.title = 'Update Profile - Everaise Launch'
  })

  useEffect(() => {
    getUserInfo(currentUser.email)
      .then((doc) => {
        setFirstName(doc.data().first_name)
        setLastName(doc.data().last_name)
        setAge(doc.data().age)
        setParent1Email(doc.data().parent1Email)
        setParent2Email(doc.data().parent2Email)
        setSelected({ id: 4000, name: doc.data().country })
      })
  }, [currentUser])

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleUpdate(event) {
    event.preventDefault()

    database.users.doc(currentUser.email).update({
        age: age,
        first_name: firstName,
        last_name: lastName,
        parent1Email: parent1Email,
        parent2Email: parent2Email,
        country: selected.name, 
    })
    
   setUpdateData(!updateData)
   setCount(count+1)
   setMessage('Profile successfully updated (' + count + ')')
  }

  async function handleLogout(event) {
    event.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signout()
      history.push("/landing")
    } catch {
      setError("Failed to sign out")
    }

    setLoading(false)
  }

  return (
    <div className="bg-white">
      <Disclosure as="nav" className="bg-gray shadow border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <Link to="/landing" className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src={process.env.REACT_APP_EVCIRC}
                  alt="Everaise"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src={process.env.REACT_APP_EVCIRC}
                  alt="Everaise"
                />
              </Link>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative z-100">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={process.env.REACT_APP_EVCIRC}
                          alt="Everaise"
                        />
                        <span className="ml-3 text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>{name}
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
                            <p
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </p>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/home"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'text-left block px-4 w-full py-2 text-sm text-gray-700'
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
      </Disclosure>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Your Profile</h1>
          </div>
        </header>
        <main>
          <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="space-y-6 lg:px-0 lg:col-span-9">
              <form onSubmit={handleUpdate} action="#" method="POST">
                <div className="shadow sm:rounded-md overflow-hidden shadow border border-gray-200">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                      <p className="mt-1 text-sm text-gray-500">{'* '}Denotes a required field.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                          First Name{'*'}
                        </label>
                        <input
                          required
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="given-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                          Last Name{'*'}
                        </label>
                        <input
                          required
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                          Primary Parent/Guardian Email Address{'*'}
                        </label>
                        <input
                          required 
                          value={parent1Email}
                          onChange={e => setParent1Email(e.target.value)}
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                          Secondary Parent/Guardian Email Address
                        </label>
                        <input
                          value={parent2Email}
                          onChange={e => setParent2Email(e.target.value)}
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                          Age{'*'}
                        </label>
                        <input
                          required
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          type="number"
                          name="age"
                          id="age"
                          autoComplete="number"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></input>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                        Country{'*'}
                      </label>
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <div className="mt-1 relative">
                              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{selected.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options
                                  static
                                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                >
                                  {countries.map((country) => (
                                    <Listbox.Option
                                      key={country.id}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                          'cursor-default select-none relative py-2 pl-3 pr-9'
                                        )
                                      }
                                      value={country}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                            {country.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active ? 'text-white' : 'text-indigo-600',
                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                              )}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>

                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm text-red-800">To update the email associated with your account, send an email to <a className="underline" href="https://everaise.org/contact-us/">info@everaise.org</a></h3>
                        </div>
                      </div>
                    </div>
                    {message && 
                      <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm text-green-800">{message}</h3>
                          </div>
                        </div>
                      </div>
                    }
                    {error && 
                      <div className="w-full rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm text-red-800">{error}</h3>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      disabled={loading}
                      type="submit"
                      className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}