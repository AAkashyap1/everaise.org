import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { adminDashboardNavigation, adminDashboardSecondaryNavigation } from '../../data/launch/navigation/labels'
import LaunchNav from '../../components/global/navs/LaunchNav'
import SideNav from '../../components/global/navs/SideNav'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import StringToSlug from '../../utility/slugs'
import courseData from '../../data/launch/courseData'
import GetDate from '../../utility/date'
import Page from '../../components/page'
import {
  DocumentTextIcon,
  MenuAlt1Icon,
} from '@heroicons/react/outline'
import {
  ChevronRightIcon,
} from '@heroicons/react/solid'

const statusStyles = {
  'disabled': 'bg-green-100 text-green-800',
  'not Disabled': 'bg-red-100 text-red-800',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { course } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [assignments, setAssignments] = useState([]);
  const courseAssignments = useCollectionData(courseData[course].assignmentData)[0];

  useEffect(() => {
    if (courseAssignments) {
      console.log(courseAssignments);
      let tempAssignments = [];
      for (const assignment of courseAssignments) {
        tempAssignments.push({
          id: StringToSlug(assignment.name),
          disabled: assignment.disabled ? 'disabled' : 'not Disabled',
          name: assignment.name,
          module: assignment.module,
          date: GetDate(assignment.due),
        })
      }
      setAssignments(tempAssignments);
    }
  }, [courseAssignments])

  useEffect(() => {
    document.title = 'Admin - ' + courseData[course].courseName
  })

  return (
    <Page 
      title={courseData[course].courseName + " - Admin Dashboard"}
      description=""
    >
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideNav 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={adminDashboardNavigation}
          secondaryNavigation={adminDashboardSecondaryNavigation}
        />
        <div className="flex-1 overflow-auto focus:outline-none">
          <div className="block lg:hidden relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            <LaunchNav admin={true} info={courseData[course].courseName + ' - Instructor'} />
              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Assignment Log
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  {assignments.map((assignment) => (
                    <li key={assignment.id}>
                      <Link to={`/admin/${course}/homework/${assignment.id}`} className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <DocumentTextIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                            <span className="flex flex-col text-gray-900 text-sm truncate">
                              <span className="truncate">{assignment.name}</span>
                              <span>
                                <span className="text-gray-900 font-medium">{}</span>{' '}
                              </span>
                              <time>{assignment.date}</time>
                            </span>
                          </span>
                          <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col mt-2">
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Assignment
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              
                            </th>
                            <th className="hidden px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                              Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Available
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {assignments.map((assignment) => (
                            <tr key={assignment.id} className="bg-white">
                              <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link to={`/admin/${course}/homework/${assignment.id}`}>
                                  <div className="flex">
                                    <p className="group inline-flex space-x-2 truncate text-sm">
                                      <DocumentTextIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <p className="text-gray-900 truncate group-hover:text-gray-400">{assignment.name}</p>
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <Link to={`/admin/${course}/homework/${assignment.id}`}>
                                  <span className="text-gray-900 font-medium">{} </span>
                                </Link>
                              </td>
                              <td className="hidden px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500 md:block">
                                <Link to={`/admin/${course}/homework/${assignment.id}`}>
                                  <span
                                    className={classNames(
                                      statusStyles[assignment.disabled],
                                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                    )}
                                  >
                                    {assignment.disabled}
                                  </span>
                                </Link>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <Link to={`/admin/${course}/homework/${assignment.id}`}>
                                  <time>{assignment.date}</time>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> 
          </main>
        </div>
      </div>
    </Page>                                  
  )
}