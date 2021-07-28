import { Fragment, useState, useEffect } from 'react'
import { Popover, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { database } from '../firebase'
import {
  ChartSquareBarIcon,
  ChatAlt2Icon,
  DesktopComputerIcon,
  DocumentAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const solutions = [
  {
    name: 'Scores',
    description: 'View assignment scores as well as a leaderboard of the top performing students.',
    icon: ChartSquareBarIcon,
  },
  {
    name: 'Course Schedules',
    description: 'Get insight into what material you will cover in your courses.',
    icon: DesktopComputerIcon,
  },
  { name: 'Discord Discussion', description: "Get access to discussions on Discord reviewing the material.", href: '#', icon: ChatAlt2Icon },
  {
    name: 'Homework Submissions',
    description: "Submit answers to multiple choice, short answer, and free-resposne questions.",
    icon: DocumentAddIcon,
  },
]

const footerNavigation = {
  solutions: [
    { name: 'Enrollments', href: '/enroll' },
    { name: 'Your Profile', href: '/profile' },
  ],
  support: [
    { name: 'Join the Team', href: 'https://everaise.org/volunteer/' },
    { name: 'Sponsor', href: 'https://everaise.org/sponsors/' },
  ],
  company: [
    { name: 'About', href: 'https://everaise.org/mission' },
    { name: 'Partners', href: 'https://everaise.org/sponsors/' },
  ],
  legal: [
    { name: 'Privacy', href: process.env.REACT_APP_PRIVACY },
    { name: 'Terms', href: process.env.REACT_APP_TERMS },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/everaiseacademy/?ref=py_c',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/EveraiseAcademy',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'https://everaise.org/contact-us/',
      icon: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/everaise-academy/mycompany/',
      icon: (props) => (
        <img alt="LinkedIn" className="h-5 w-5" src={process.env.REACT_APP_LINKEDIN}></img>
      ),
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Landing() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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

  useEffect(() => {
    document.title = 'Everaise Launch'
  })


  function submitEmail(event) {
    event.preventDefault()
    database.emails.doc(email).set({
      email: email
    })
    setEmail('')
  }

  return (
    <div className="bg-white">
      <header>
        <Popover className="relative bg-white">
          {({ open }) => (
            <>
              <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:space-x-10 lg:px-8">
                <div className="flex lg:w-0 lg:flex-1">
                  <p>
                    <span className="sr-only">Everaise</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src={process.env.REACT_APP_EVCIRC}
                      alt="Everaise Academy"
                    />
                  </p>
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
                          <span>Features</span>
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

                  <a href="https://everaise.org/team/" target="_blank" rel="noreferrer" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Our Team
                  </a>
                  <Link to="/home" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Course Home
                  </Link>
                  <a href="https://everaise.org/" target="_blank" rel="noreferrer" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Website
                  </a>
                </Popover.Group>
                <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                  <Menu as="div" className="ml-3 relative z-50">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={process.env.REACT_APP_EVCIRC}
                              alt="Everaise Academy"
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
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src={process.env.REACT_APP_EVCIRC}
                            alt="Everaise Academy"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid grid-cols-1 gap-7">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-cyan-600 text-white">
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <div className="py-6 px-5">
                      <div className="grid grid-cols-2 gap-4">
                        <a href="https://everaise.org/team/" target="_blank" rel="noreferrer" className="text-base font-medium text-gray-900 hover:text-gray-700">
                          Our Team
                        </a>
                        <Link to="/home" className="text-base font-medium text-gray-500 hover:text-gray-900">
                          Course Home
                        </Link>
                        <a href="https://everaise.org/" target="_blank" rel="noreferrer" className="text-base font-medium text-gray-900 hover:text-gray-700">
                          Website
                        </a>
                      </div>
                      <div className="mt-6">
                        <Link
                          to="/enroll"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:from-purple-700 hover:to-cyan-600"
                        >
                          Enroll
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          Already Enrolled?
                          <Link to="/update" className="text-gray-900">
                            {' '}Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src={process.env.REACT_APP_CHALKBOARD}
                  alt="Chalkboard"
                />

              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Welcome to Everaise{' '}</span>
                  <span className="block text-cyan-600">Launch</span>
                </h1>

                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <a
                      href="https://discord.gg/JE5TaCrrFn"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-cyan-600 bg-white hover:bg-opacity-80 sm:px-8"
                    >
                      Join our Discord
                    </a>
                    <Link
                      to="/enroll"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-opacity-80 sm:px-8"
                    >
                      Enroll
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to get started?{' '}</span>
              <span className="block bg-cyan-600 bg-clip-text text-transparent">
                Create an account to access Launch.
              </span>
            </h2>
            <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
              <Link
                to="/profile"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-500"
              >
                Get Started
              </Link>
              <a
                href="https://everaise.org/mission/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-cyan-600 bg-cyan-100 hover:bg-cyan-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50" aria-labelledby="footerHeading">
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:pt-24 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} target="_blank" rel="noreferrer" className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} target="_blank" rel="noreferrer" className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} target="_blank" rel="noreferrer" className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 xl:mt-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe for Everaise updates
              </h3>
              <p className="mt-4 text-base text-gray-500">
                The latest news, articles, and resources, sent to your inbox.
              </p>
              <form onSubmit={submitEmail} className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="emailAddress" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2020 Everaise Academy. Everaise Academy incorporated is a 501(c)(3) non-profit, tax-exempt public charity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}