import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'
import {
  ChevronRightIcon,
} from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const courses2021 = [
  {
    course: 'Physics Mechanics',
    dates: 'June 21 – August 6',
    head: 'Ashmit Dutta',
    hours: 'Tuesday 11 AM ET / Saturday 11 AM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Biology',
    dates: 'July 5 – August 6',
    head: 'Krish Jayarapu',
    hours: 'Monday 11 AM ET / Thursday 11 AM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Astronomy',
    dates: 'July 12 - August 6',
    head: 'Chooi Je Qin',
    hours: 'Wednesday 5 AM and 5 PM ET / Sunday 5 AM and 5 PM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Math Competitions I',
    dates: 'July 12 – August 6',
    head: 'Matthew Chen / Kiran Sun',
    hours: 'Tuesday 11 PM ET / Thursday 11 PM ET / Saturday 11 PM ET',
    cost: '$0',
    status: 'ended',
  },
]

const courses2020 = [
  {
    course: 'Astronomy',
    dates: 'June 29 – July 31',
    head: 'Gregory Pylypovych',
    hours: 'Monday–Friday, 2 AM and 2 PM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Biology',
    dates: 'June 29 – July 31',
    head: 'Justin Shan',
    hours: 'Weekdays, 1 AM and 4 PM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Math Competitions I',
    dates: 'June 29 – July 31',
    head: 'Saadiq Shaikh',
    hours: 'Weekdays, 2 AM and 2 PM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Math Competitions II',
    dates: 'June 29 – July 31',
    head: 'Andrew Wu',
    hours: 'Weekdays, 12 AM and 1 PM ET',
    cost: '$0',
    status: 'ended',
  },
  {
    course: 'Physics Mechanics',
    dates: 'June 29 – July 31',
    head: 'Brian Lee / William Shi',
    hours: 'Weekdays, 1 AM and 2 PM ET',
    cost: '$0',
    status: 'ended',
  },
]

const statusStyles = {
  upcoming: 'bg-green-100 text-green-800',
  ongoing: 'bg-yellow-100 text-yellow-800',
  ended: 'bg-red-100 text-red-800',
}

export default function Courses() {

  useEffect(() => {
    document.title = 'Courses - Everaise Academy'
  })

  return (
    <div>
      <Nav />
      <div className="bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Course Offerings</h2>
              <p className="text-xl text-gray-500">
                Our full course list is listed below, along with their start and end dates. 
                As of now, each course is offered one time throughout the year, during summer. 
                Each offering covers the same material as other offerings of that course. Click 
                any course name below for more information about that course. All times are 
                listed in ET = UTC-4. Click any time below to view its conversion to other time 
                zones.
              </p>
            </div>
            <ul className="flex jusify-center grid">
              <h2 className="mb-3 text-3xl font-bold text-gray-900 tracking-tight">Class Schedule</h2>
              <p className="mb-5 text-xl text-gray-500">
                Information for Summer 2022 courses will be posted in Spring 2022.
              </p>
              <h3 className="mb-1 text-2xl font-semibold text-gray-700 tracking-tight">Summer 2021 Program:</h3>

              <div className="xl:hidden"> 
                <ul className="border border-gray-200 rounded-md mt-2 divide-y divide-gray-200 overflow-hidden xl:hidden">
                  {courses2021.map((course) => (
                    <li key={course.course}>
                      <a href={course.course} className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate text-gray-900 font-medium">{course.course} 
                                <span
                                  className={classNames(
                                    statusStyles[course.status],
                                    'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                  )}
                                >
                                  {course.status}
                                </span>
                              </span>
                              <span>
                                <span className="text-gray-900 font-medium">{course.cost}</span>{' '}
                                USD
                              </span>
                              <span className="mb-2">Head - {course.head}</span>
                              <time dateTime={course.dates}>{course.dates}</time>
                              <p className="truncate">{course.hours}</p>
                            </span>
                          </span>
                          <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden xl:block">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dates
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Head
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses2021.map((course) => (
                          <tr key={course.course} className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{course.course} </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">{course.dates} </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">{course.head} </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{course.cost} </span>
                              USD
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">{course.hours} </span>
                            </td>
                            <td className="text-right px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                              <span
                                className={classNames(
                                  statusStyles[course.status],
                                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                )}
                              >
                                {course.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <h3 className="mt-5 mb-1 text-2xl font-semibold text-gray-700 tracking-tight">Summer 2020 Program:</h3>

              <div className="xl:hidden"> 
                <ul className="border border-gray-200 rounded-md mt-2 divide-y divide-gray-200 overflow-hidden xl:hidden">
                  {courses2020.map((course) => (
                    <li key={course.course}>
                      <a href={course.course} className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate text-gray-900 font-medium">{course.course} 
                                <span
                                  className={classNames(
                                    statusStyles[course.status],
                                    'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                  )}
                                >
                                  {course.status}
                                </span>
                              </span>
                              <span>
                                <span className="text-gray-900 font-medium">{course.cost}</span>{' '}
                                USD
                              </span>
                              <span className="mb-2">Head - {course.head}</span>
                              <time dateTime={course.dates}>{course.dates}</time>
                              <time dateTime={course.hours}>Office Hours - {course.hours}</time>
                            </span>
                          </span>
                          <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden xl:block">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dates
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Head
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses2020.map((course) => (
                          <tr key={course.course} className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{course.course} </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">{course.dates} </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">{course.head} </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{course.cost} </span>
                              USD
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">{course.hours} </span>
                            </td>
                            <td className="text-right px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                              <span
                                className={classNames(
                                  statusStyles[course.status],
                                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                )}
                              >
                                {course.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}