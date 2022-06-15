import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import Nav from '../components/global/navs/nav'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'
import Footer from '../components/footer'
import Page from '../components/page'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import printError from '../utility/printError'

export default function Enroll() {
  const [error , setError] = useState('')
  const [physics, setPhysics] = useState(false)
  const [math, setMath] = useState(false)
  const [astronomy, setAstronomy] = useState(false)
  const [biology, setBiology] = useState(false)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const [open, setOpen] = useState([false, false, false, false]);
  const registrationData = useCollectionData(database.registrations)[0];
  const userData = useDocumentData(database.users.doc(currentUser.email))[0];
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (registrationData) {
      let tempOpen = []
      for (const course of registrationData) {
        tempOpen.push(course.open);
      }
      setOpen(tempOpen)
    }
  }, [registrationData])

  useEffect(() => {
    if (userData) {
      setPhysics(userData.courses[0].enrolled)
      setBiology(userData.courses[1].enrolled)
      setAstronomy(userData.courses[2].enrolled)
      setMath(userData.courses[3].enrolled)
    }
  }, [userData])

  function handleUpdate(event) {
    setError('');
    setMessage('');
    setLoading(true);
    event.preventDefault();
    let numCourses = [physics, biology, math, astronomy].reduce((total, x) => (x === true ? total+1 : total), 0)
    if (numCourses <= 2) {
      try {
        database.users.doc(currentUser.email).update({
          courses: [
            { enrolled: physics, name: 'physics' },
            { enrolled: biology, name: 'biology' },
            { enrolled: astronomy, name: 'astronomy' },
            { enrolled: math, name: 'math' },
          ]
        })
        setMessage('Your course enrollment was successfully changed.');
      } catch (err) {
        setError('An error occurred while updating your course enrollment.');
        printError(err)
      }
    } else {
      setMessage("")
      setError('Students are permitted to be enrolled in a maximum of two courses')
      setLoading(false)
    }
  }
  

  return (
    <Page 
      title="Enroll - Everaise Launch"
      description="Here, you can enroll in any of the courses that Everaise Academy has to offer!"
    >
      <div className="bg-white">
        <Nav />
        <div className="mt-5 pt-5 pb-16">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Course Enrollment</h1>
            </div>
          </header>
          <main>
            <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="space-y-6 lg:px-0 lg:col-span-9">
                <form onSubmit={handleUpdate} action="#" method="POST">
                  <div className="shadow sm:rounded-md overflow-hidden border border-gray-200">
                    <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Course Selection</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Visit <a className="text-decoration: underline text-cyan-600" href="https://everaise.org/courses/">this page</a> for more information on classes. Registration will end on June 19, 2022, so sign up soon!
                        </p>
                      </div>

                      <fieldset>
                        <legend className="text-base font-medium text-gray-900">Available Courses</legend>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="h-5 flex items-center">
                              <input
                                id="physics"
                                name="physics"
                                type="checkbox"
                                checked={physics}
                                disabled={!open[3]}
                                onChange={e => (setPhysics(!physics))}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="comments" className="font-medium text-gray-700">
                                Physics Mechanics (June 26 - July 30)
                              </label>
                              <p className="text-gray-500">A rigorous treatment of mechanics including kinematics, Newton’s laws, collisions, rolling motion, oscillations, fluid statics, fictitious forces, and error analysis.</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start">
                              <div className="h-5 flex items-center">
                                <input
                                  id="biology"
                                  name="biology"
                                  type="checkbox"
                                  checked={biology}
                                  disabled={!open[1]}
                                  onChange={e => setBiology(!biology)}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="candidates" className="font-medium text-gray-700">
                                  Biology (June 26 - July 23)
                                </label>
                                <p className="text-gray-500">A deep study of theoretical biology, covering a range of topics from cell biology, genetics, and human anatomy and physiology to the mechanisms underlying plant life.</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start">
                              <div className="h-5 flex items-center">
                                <input
                                  id="astronomy"
                                  name="astronomy"
                                  type="checkbox"
                                  checked={astronomy}
                                  disabled={!open[0]}
                                  onChange={e => (setAstronomy(!astronomy))}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="offers" className="font-medium text-gray-700">
                                  Astronomy (June 26 - July 30)
                                </label>
                                <p className="text-gray-500">An introductory course in astronomy, including celestial coordinates, stellar systems, and cosmology in addition to important physics topics such as orbital mechanics.</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start">
                              <div className="h-5 flex items-center">
                                <input
                                  id="math"
                                  name="math"
                                  type="checkbox"
                                  checked={math}
                                  disabled={!open[2]}
                                  onChange={e => (setMath(!math))}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="offers" className="font-medium text-gray-700">
                                  Math Competitions I (June 26 - July 30)
                                </label>
                                <p className="text-gray-500">An intuition-building math competitions course including sequences and series, polynomials, combinatorial identities, triangle centers, and modular arithmetic.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {error && <div className="rounded-md bg-red-50 p-4">
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
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        disabled={loading}
                        type="submit"
                        className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
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
        <Footer />
      </div>
    </Page>
  )
}