import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import courses from '../../../data/course/courses'
import { useEffect } from 'react'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { database } from '../../../firebase'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Registration() {
  const userIds = useCollection(database.total_users)[0];
  const usersData = useCollectionData(database.total_users)[0];
  const registrationData = useCollectionData(database.registrations)[0];
  const ids = useCollection(database.registrations)[0];
  const [registrations, setRegistrations] = useState([false, false, false, false]);
  const [users, setUsers] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (registrationData && ids) {
      let tempCourses = []
      for (let i = 0; i < 4; i++) {
        tempCourses.push({
          course: ids.docs[i].id, 
          open: registrationData[i].open
        })
      }
      let tempRegistration = []
      for (let i = 0; i < 4; i++) {
        let course = courses[Object.keys(courses)[i]].link;
        for (let j = 0; j < 4; j++) {
          if (tempCourses[j].course === course) {
            tempRegistration.push(tempCourses[j].open)
            break
          }
        }
      }
      setRegistrations(tempRegistration);
    }
  }, [registrationData, ids])

  useEffect(() => {
    if (usersData && userIds) {
      let tempUsers = []
      for (let i = 0; i < 5; i++) {
        tempUsers.push({
          id: userIds.docs[i].id,
          users: usersData[i].users
        })
      }
      let tempNumbers = []
      for (let i = 0; i < 4; i++) {
        let course = courses[Object.keys(courses)[i]].link;
        for (let j = 0; j < 5; j++) {
          if (tempUsers[j].id === course) {
            tempNumbers.push(tempUsers[j].users)
            break
          }
        }
      }
      setUsers(tempNumbers)
    }
  }, [usersData, userIds])

  function updateRegistration(course) {
    let newRegistrations = [...registrations]
    newRegistrations[course] = !registrations[course]
    setRegistrations(newRegistrations)
    database.registrations.doc(courses[Object.keys(courses)[course]].link).update({
      open: newRegistrations[course]
    })
  }
  
  return (
    <div>
      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Open / Close Course Registration
      </h2>

      <div className="mt-2">
        <div className="mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8">
          <main className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[0, 1, 2, 3].map((course) => (
                <li key={course}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-medium truncate">{courses[Object.keys(courses)[course]].name}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <Switch
                            checked={registrations[course]}
                            onChange={() => updateRegistration(course)}
                            className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span aria-hidden="true" className="pointer-events-none absolute bg-white w-full h-full rounded-md" />
                            <span
                              aria-hidden="true"
                              className={classNames(
                                registrations[course] ? 'bg-green-400' : 'bg-gray-200',
                                'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
                              )}
                            />
                            <span
                              aria-hidden="true"
                              className={classNames(
                                registrations[course] ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'
                              )}
                            />
                          </Switch>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" aria-hidden="true" />
                            {users[course]} members
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-indigo-400" aria-hidden="true" />
                            Remote
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>
                            <time>{courses[Object.keys(courses)[course]].dates}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </div>
  )
}