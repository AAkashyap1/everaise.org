import { Fragment, useState, useRef, useEffect } from 'react'
import { Disclosure, Listbox, Transition } from '@headlessui/react'
import { XCircleIcon, CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { database } from '../firebase'
import { countryData } from '../variables/countries'

let countries = []
let count = 1

countryData.map((country) => {
  count = count + 1
  return (
    countries.push({ id: count, name: country.name })
  )
})

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [parent1Email, setParent1Email] = useState('')
  const [parent2Email, setParent2Email] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(countries[186])
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const history = useHistory()

  useEffect(() => {
    document.title = 'Create Profile - Everaise Launch'
  })

  async function handleLogin(event) {
    event.preventDefault()

    if (passwordRef.current.value.length < 7) {
      return setError('Passwords must be at least 7 characters in length')
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Your passwords do not match')
    }

    if (emailRef.current.value.toLowerCase() !== emailRef.current.value) {
      return setError('Your email must only contain lowercase letters')
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      
      history.push('/landing')

      database.users.doc(email).set({
        first_name: firstName,
        last_name: lastName,
        user: true,
        age: age,
        email: email,
        parent1Email: parent1Email,
        parent2Email: parent2Email,
        courses: [
          { name: 'Physics Mechanics', value: false, grade: 'No Grade', points: 0 },
          { name: 'Biology', value: false, grade: 'No Grade', points: 0 },
          { name: 'Astronomy', value: false, grade: 'No Grade', points: 0 },
          { name: 'Math Competitions I', value: false, grade: 'No Grade', points: 0  },
        ],
        country: selected.name
      })

      database.emails.doc(email).set({
        email: email
      })

    } catch {
      setError('Failed to create profile. This email may already have an account associated with it.')
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
          </div>
        </div>
      </Disclosure>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Create a Profile</h1>
          </div>
        </header>
        <main>
          <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="space-y-6 lg:px-0 lg:col-span-9">
              <form onSubmit={handleLogin} action="#" method="POST">
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
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          required
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                          Email Address{'*'}
                        </label>
                        <input
                          ref={emailRef}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
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
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                          Age{'*'}
                        </label>
                        <input
                          required
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          type="number"
                          name="age"
                          id="aeg"
                          autoComplete="number"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="place" className="block text-sm font-medium text-gray-700">
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

                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password{'*'}
                        </label>
                        <input
                          required
                          ref={passwordRef}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Confirm Password{'*'}
                        </label>
                        <input
                          required
                          ref={confirmPasswordRef}
                          id="confirmpassword"
                          name="confirmpassword"
                          type="password"
                          autoComplete="current-password"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    {error && 
                      <div className="rounded-md bg-red-50 p-4">
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