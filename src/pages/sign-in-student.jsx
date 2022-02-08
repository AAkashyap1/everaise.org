import { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import EvCirc from '../images/evcirc.png'
import { XCircleIcon } from '@heroicons/react/solid'
import Board from '../images/index.png'
import ForgotPasswordModal from '../components/login/modal.jsx'
import Page from '../components/page.jsx'

export default function SignIn1(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [modalOpen, setModalOpen] = useState(false)
  const { currentUser, login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  var nextScreen = '';

  useEffect(() => {
    if (props.location.state) {
      // eslint-disable-next-line
      nextScreen = props.location.state.toLowerCase();
    } else {
      nextScreen = '/home'
    }
    if (currentUser && currentUser.email) {
      history.push(nextScreen);
    }
  })

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push(nextScreen)
    } catch {
      setError('Sorry, we did not recognize this login')
    }

    setLoading(false)
  }

  function openModal(event) {
    event.preventDefault();
    setModalOpen(true);
  }

  return (
    <Page
      title="Sign In - Everaise Launch"
      description="Please enter your username and password."
    >
      <div className="min-h-screen bg-white flex">
        <ForgotPasswordModal open={modalOpen} setOpen={setModalOpen} />
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/landing"> 
                <img
                  className="h-12 w-auto"
                  src={EvCirc}
                  alt="Everaise"
                />
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in with your account</h2>
              <p className="mt-2 text-sm text-gray-600 max-w">
                Or{' '}
                <Link to="/profile" className="font-medium text-cyan-900 hover:text-cyan-500">
                  create an account
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div>
                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Continue with</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        ref={emailRef}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
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
                  </div>

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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <form>
                      <div className="text-sm">
                        <button disabled={loading} onClick={openModal} className="unfocus font-medium text-cyan-900 hover:text-cyan-500">
                          Forgot your password? 
                        </button>
                      </div>
                    </form>
                  </div>

                  <button disabled={loading} type="submit" className="w-full">
                    <p
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Sign in
                    </p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={Board}
            alt="Board with Writing"
          />
        </div>
      </div>
    </Page>
  )
}