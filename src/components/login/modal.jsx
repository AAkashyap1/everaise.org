import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MailIcon } from '@heroicons/react/outline'
import { useAuth } from '../../contexts/AuthContext'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'

export default function ForgotPasswordModal(props) {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { sendPasswordResetEmail } = useAuth()
  const emailRef = useRef(null)
  
  async function resetPassword(event) {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(emailRef.current.value)
      setError('');
      setMessage('Password reset email sent to ' + emailRef.current.value);
      props.setOpen(false);
    } catch {
      setMessage('');
      setError('Sorry, we were unable to send a password reset email to ' + emailRef.current.value)
    }
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => props.setOpen(!props.open)}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100">
                  <MailIcon className="h-6 w-6 text-cyan-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Reset password
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      To reset your password, enter the email associated with your account into the field below.
                      An email with instructions on how to reset your password will be sent to that email.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <input
                  required
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email here"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {error && 
                <div className="mt-5 w-full rounded-md bg-red-50 p-4">
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
              {message && 
                <div className="mt-5 w-full rounded-md bg-green-50 p-4">
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
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={resetPassword}
                >
                  Send reset email
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}