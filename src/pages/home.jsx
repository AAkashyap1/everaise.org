import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { database, increment } from '../firebase'
import EvCirc from '../images/evcirc.png'
import {
  CalculatorIcon,
  EyeIcon,
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

const announcements = [
  {
    id: '1',
    likes: '0',
    replies: '0',
    views: '0',
    author: {
      name: 'Everaise Academy',
      imageUrl: EvCirc,
      href: '#',
    },
    date: 'June 20 at 9:45 AM',
    datetime: '2021-06-20T09:45:00',
    href: 'https://everaise.org/',
    title: 'Welcome to Everaise Launch!',
    body:
      '\n          <p>\n            Hello everyone! Welcome to Everaise Launch, the official learning management system for Everaise Academy. Through Launch, you can manage everything from homework submissions to your class rank. If you have any questions feel free to join the discord through the link in the navigation bar. Happy learning! \n          </p>\n          <p>\n',
  },
]

export default function Home() {
  const [name, setName] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signout, currentUser } = useAuth()
  const history = useHistory()
  const [cards, setCards] = useState([])
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Course Home - Everaise Launch'
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    async function fetchData() {
      try {
        await database.total_users.doc("default").update({
          total_users: increment,
        })
  
        database.total_users.doc("default").get()
          .then((doc) => {
            setCount(doc.data().total_users)
          })
      } catch {
        
      }
    }
    fetchData()
  }, [])

  const user = useDocumentData(database.users.doc(currentUser.email))[0]

  useEffect(() => {
    if (user) {
      for (const course of user.courses) {
        if (course.value) {
          let param, cardIcon, dateCourse
          if (course.name === 'Physics Mechanics') {
            param = 'physics'
            cardIcon = CalculatorIcon
            dateCourse = 'June 21 - August 6'
          } else if (course.name === 'Biology') {
            param = 'biology'
            cardIcon = FingerPrintIcon
            dateCourse = 'July 5 - August 6'
          } else if (course.name === 'Astronomy') {
            param = 'astronomy'
            cardIcon = GlobeIcon 
            dateCourse = 'July 12 - August 6'
          } else {
            param = 'math'
            cardIcon = VariableIcon
            dateCourse = 'July 12 - August 6'
          }
          setCards(prevCards => [
            ...prevCards,
            {
              name: course.name, 
              to: param, 
              icon: cardIcon, 
              dates: dateCourse
            }
          ])
        }
      }
      setLoaded(true)
    }
  }, [user])

  function getUserName() {
    database.users.doc(currentUser.email).get()
      .then((doc) => {
        setName(doc.data().first_name + ' ' + doc.data().last_name)
      })
    return name
  }

  async function handleLogout(event) {
    event.preventDefault()

    try {
      await signout()
      history.push("/landing")
    } catch {
      
    }
  }

  return (
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
                              <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                                <dd>
                                  <div className="text-lg font-medium text-gray-900">{card.dates}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <Link to={ `/dashboard/${card.to}`} className="font-medium text-cyan-700 hover:text-cyan-900">
                              View Dashboard
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>)
              )
            }

            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Announcements
            </h2>

            <div className="">
              <div className="mx-auto sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8">
                <main className="mt-2 col-span-1 lg:col-span-9 xl:col-span-6">
                  <ul className="space-y-4">
                    {announcements.map((question) => (
                      <li key={question.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                        <article aria-labelledby={'question-title-' + question.id}>
                          <div>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <a href={question.href} target="_blank" rel="noreferrer">
                                  <img className="h-10 w-10 rounded-full" src={question.author.imageUrl} alt="" />
                                </a>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  <a href={question.href} target="_blank" rel="noreferrer" className="hover:underline">
                                    {question.author.name}
                                  </a>
                                </p>
                                <p className="text-sm text-gray-500">
                                  <p className="hover:underline">
                                    <time dateTime={question.datetime}>{question.date}</time>
                                  </p>
                                </p>
                              </div>
                            </div>
                            <h2 id={'question-title-' + question.id} className="mt-4 text-base font-medium text-gray-900">
                              {question.title}
                            </h2>
                          </div>
                          <div
                            className="mt-2 text-sm text-gray-700 space-y-4"
                            dangerouslySetInnerHTML={{ __html: question.body }}
                          />
                          <div className="mt-6 flex justify-between space-x-8">
                            <div className="flex space-x-6">
                              <span className="inline-flex items-center text-sm">
                                <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                  <span className="font-medium text-gray-900">{count}</span>
                                  <span className="sr-only">views</span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </main>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}