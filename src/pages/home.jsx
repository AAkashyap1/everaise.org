import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'
import {
  CalculatorIcon,
  MenuAlt1Icon,
  FingerPrintIcon,
} from '@heroicons/react/outline'
import {
  GlobeIcon,
  VariableIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import SideNav from '../components/global/navs/SideNav'
import { homeNavigation, homeSecondaryNavigation } from '../data/launch/navigation/labels'
import LaunchNav from '../components/global/navs/LaunchNav'
import HomeAnnouncements from '../components/home/announcements'
import Page from '../components/page'

const courseData = {
  'physics': {
    name: 'Physics Mechanics',
    icon: CalculatorIcon,
    dates: 'June 21 - August 6',
  },
  'biology': {
    name: 'Biology',
    icon: FingerPrintIcon,
    dates: 'July 5 - August 6',
  },
  'astronomy': {
    name: 'Astronomy',
    icon: GlobeIcon,
    dates: 'July 12 - August 6',
  },
  'math': {
    name: 'Math Competitions I',
    icon: VariableIcon,
    dates: 'July 12 - August 6',
  }
}

export default function Home() {
  const [name, setName] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentUser } = useAuth()
  const [cards, setCards] = useState([])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Course Home - Everaise Launch'
    window.scrollTo(0, 0)
  })

  const user = useDocumentData(database.users.doc(currentUser.email))[0]

  useEffect(() => {
    if (user) {
      let tempCards = []
      for (const course of user.courses) {
        if (course.enrolled) {
          tempCards.push({
            name: courseData[course.name].name, 
            to: course.name, 
            icon: courseData[course.name].icon, 
            dates: courseData[course.name].dates
          })
        }
      }
      setCards(tempCards);
      setLoaded(true);
    }
  }, [user])

  function getUserName() {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setName(doc.data().first_name + ' ' + doc.data().last_name)
      })
    return name
  }

  return (
    <Page 
      title="Home - Everaise Launch"
      description=""
    >
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SideNav 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={homeNavigation}
          secondaryNavigation={homeSecondaryNavigation}
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
            <LaunchNav info={'Welcome, ' + getUserName()} />
            <div className="mt-8">
              {!loaded ?                
                (<div className="mb-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">{cards.length !== 0 ? "Ongoing Courses" : "No Courses"}</h2>
                  <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {['1', '2', '3', '4'].map((index) => (
                      <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 bg-gray-200 rounded-full" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl className="space-y-1.5">
                                <dt className="animate-pulse h-4 w-1/2 bg-gray-200 text-xs text-gray-200 rounded-md">Physics</dt>
                                <dd>
                                  <div className="animate-pulse bg-gray-200 text-gray-200 rounded-md">July 12 - August 6</div> 
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm h-4 w-1/2 w-full bg-gray-200 text-gray-200 rounded-md animate-pulse ">
                            View Dashboard
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>) : 
                (cards.length === 0 ?
                  (<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-4 rounded-md bg-red-100 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 mr-7">
                          <h3 className="text-sm text-red-800 font-semibold">No current courses!</h3>
                        </div>
                      </div>
                    </div>
                  </div>) : 
                  (<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Ended Courses</h2>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {cards.map((card) => (
                        <div key={card.param} className="bg-white overflow-hidden shadow rounded-lg">
                          <div className="p-5">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <card.icon className="rounded-full h-10 w-10 p-2 bg-yellow-500 text-white" aria-hidden="true" />
                              </div>
                              <div className="ml-5 w-0 flex-1">
                                <dl>
                                  <dt className="text-base font-medium text-gray-900 truncate">{card.name}</dt>
                                  <dd>
                                    <div className="text-sm font-medium text-gray-600">{card.dates}</div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                              <Link to={ `/dashboard/${card.to}`} className="font-medium text-cyan-700 hover:text-cyan-900">
                                View Dashboard &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>)
                )
              }
              <HomeAnnouncements />
            </div>
          </main>
        </div>
      </div>
    </Page>
  )
}