import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import Nav from '../components/nav'
import { useAuth } from '../contexts/AuthContext'
import { database, getUserInfo, increment, decrement } from '../firebase'
import Footer from '../components/footer'

export default function Enroll() {
  const [error , setError] = useState('')
  const [physics, setPhysics] = useState(false)
  const [math, setMath] = useState(false)
  const [astronomy, setAstronomy] = useState(false)
  const [biology, setBiology] = useState(false)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    parent1Email: '',
    parent2Email: '',
    courses: [],
    age: 0,
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Enroll - Everaise Launch'
  })

  useEffect(() => {
    getUserInfo(currentUser.email)
      .then((doc) => {
        setPhysics(doc.data().courses[0].value)
        setBiology(doc.data().courses[1].value)
        setAstronomy(doc.data().courses[2].value)
        setMath(doc.data().courses[3].value)
      })
  }, [currentUser])


  function handleUpdate(event) {
    setError("")
    setLoading(true)
    event.preventDefault()
    let courses = [physics, biology, math, astronomy].reduce((total, x) => (x === true ? total+1 : total), 0)
    if (courses <= 2) {
      try {
        database.users.doc(currentUser.email).update({
          courses: [
            { name: 'Physics Mechanics', value: physics, grade: 'No Grade', points: 0 },
            { name: 'Biology', value: biology, grade: 'No Grade', points: 0 },
            { name: 'Astronomy', value: astronomy, grade: 'No Grade', points: 0 },
            { name: 'Math Competitions I', value: math, grade: 'No Grade', points: 0 },
          ]
        })
        database.users.doc(currentUser.email).get()
          .then((doc) => {
            setUserData({
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              email: currentUser.email,
              parent1Email: doc.data().parent1Email,
              parent2Email: doc.data().parent2Email,
              courses: doc.data().courses,
              age: doc.data().age,
            })
          })

        database.physics_users.doc(currentUser.email).get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              if (docSnapshot.data().active === true && physics === false) {
                database.physics_users.doc(currentUser.email).update({
                  active: false,
                })
                database.total_users.doc("physics_users").update({
                  total_users: decrement
                })
              } else if (docSnapshot.data().active === false && physics === true) {
                database.physics_users.doc(currentUser.email).update({
                  active: true
                })
                database.total_users.doc("physics_users").update({
                  total_users: increment
                })
              }
            } else {
              if (physics) {
                database.physics_users.doc(currentUser.email).set({
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: currentUser.email,
                  points: 0,
                  active: true,
                })
                database.total_users.doc("physics_users").update({
                  total_users: increment
                })
              }
            }
          })
        
        database.astronomy_users.doc(currentUser.email).get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              if (docSnapshot.data().active === true && astronomy === false) {
                database.astronomy_users.doc(currentUser.email).update({
                  active: false,
                })
                database.total_users.doc("astronomy_users").update({
                  total_users: decrement
                })
              } else if (docSnapshot.data().active === false && astronomy === true) {
                database.astronomy_users.doc(currentUser.email).update({
                  active: true
                })
                database.total_users.doc("astronomy_users").update({
                  total_users: increment
                })
              }
            } else {
              if (astronomy) {
                database.astronomy_users.doc(currentUser.email).set({
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: currentUser.email,
                  points: 0,
                  active: true,
                })
                database.total_users.doc("astronomy_users").update({
                  total_users: increment
                })
              }
            }
          })

        database.biology_users.doc(currentUser.email).get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              if (docSnapshot.data().active === true && biology === false) {
                database.biology_users.doc(currentUser.email).update({
                  active: false,
                })
                database.total_users.doc("biology_users").update({
                  total_users: decrement
                })
              } else if (docSnapshot.data().active === false && biology === true) {
                database.biology_users.doc(currentUser.email).update({
                  active: true
                })
                database.total_users.doc("biology_users").update({
                  total_users: increment
                })
              }
            } else {
              if (biology) {
                database.biology_users.doc(currentUser.email).set({
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: currentUser.email,
                  points: 0,
                  active: true,
                })
                database.total_users.doc("biology_users").update({
                  total_users: increment
                })
              }
            }
          })

        database.math_users.doc(currentUser.email).get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              if (docSnapshot.data().active === true && math === false) {
                database.math_users.doc(currentUser.email).update({
                  active: false,
                })
                database.total_users.doc("math_users").update({
                  total_users: decrement
                })
              } else if (docSnapshot.data().active === false && math === true) {
                database.math_users.doc(currentUser.email).update({
                  active: true
                })
                database.total_users.doc("math_users").update({
                  total_users: increment
                })
              }
            } else {
              if (math) {
                database.math_users.doc(currentUser.email).set({
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: currentUser.email,
                  points: 0,
                  active: true,
                })
                database.total_users.doc("math_users").update({
                  total_users: increment
                })
              }
            }
          })
      } catch {
        setMessage("")
        setError('Failed to update course enrollment')
        setLoading(false)
      } finally {
        setLoading(false)
        let courses = [physics, biology, math, astronomy].reduce((total, x) => (x === true ? total+1 : total), 0)
        console.log(courses)
        if (courses === 1) {
          if (physics) {
            setMessage('Thank you for registering for the following course: Physics Mechanics. Your course enrollment was successfully changed.')
          } else if (biology) {
            setMessage('Thank you for registering for the following course: Biology. Your course enrollment was successfully changed.')
          } else if (astronomy) {
            setMessage('Thank you for registering for the following course: Astronomy. Your course enrollment was successfully changed.')
          } else {
            setMessage('Thank you for registering for the following course: Math Competitions I. Your course enrollment was successfully changed.')
          }
        } else if (courses === 2){
          if (physics && biology) {
            setMessage('Thank you for registering for the following courses: Physics Mechanics, Biology. Your course enrollment was successfully changed.')
          } else if (physics && astronomy) {
            setMessage('Thank you for registering for the following courses: Physics Mechanics, Astronomy. Your course enrollment was successfully changed.')
          } else if (physics && math) {
            setMessage('Thank you for registering for the following courses: Physics Mechanics, Math Competitions I. Your course enrollment was successfully changed.')
          } else if (biology && astronomy) {
            setMessage('Thank you for registering for the following courses: Biology, Astronomy. Your course enrollment was successfully changed.')
          } else if (biology && math) {
            setMessage('Thank you for registering for the following courses: Biology, Math Competitions I. Your course enrollment was successfully changed.')
          } else {
            setMessage('Thank you for registering for the following courses: Astronomy, Math Competitions I. Your course enrollment was successfully changed.')
          }
        } else {
          setMessage('You are not enrolled in any courses')
        }
        
      }
    } else {
      setMessage("")
      setError('Students are permitted to be enrolled in a maximum of two courses')
      setLoading(false)
    }
    
  }
  

  return (
    <div className="bg-white">
      <Nav />
      <div className="pt-5 pb-16">
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
                        Visit <a className="text-decoration: underline text-cyan-600" href="https://everaise.org/classes/">this page</a> for more information on classes. Registration for our courses has closed. We aim to run these courses in the future and hope you will join us then.
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
                              disabled={true}
                              onChange={e => (setPhysics(!physics))}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-700">
                              Physics Mechanics (June 21 – August 6, Registration Closed on June 20)
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
                                disabled={true}
                                onChange={e => setBiology(!biology)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="candidates" className="font-medium text-gray-700">
                                Biology (July 5 – August 6, Registration Closed on July 2)
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
                                disabled={true}
                                onChange={e => (setAstronomy(!astronomy))}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="offers" className="font-medium text-gray-700">
                                Astronomy (July 12 – August 6, Registration Closed on July 9)
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
                                disabled={true}
                                onChange={e => (setMath(!math))}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="offers" className="font-medium text-gray-700">
                                Math Competitions I (July 12 – August 6, Registration Closed on July 9)
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
  )
}