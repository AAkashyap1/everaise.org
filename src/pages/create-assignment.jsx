import { useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { ExclamationCircleIcon, ArrowCircleLeftIcon } from '@heroicons/react/solid'
import { Link, useParams } from 'react-router-dom'
import { database } from '../firebase'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import Question from './admin-question'

export default function CreateAssignment() {
  const [name, setName] = useState('')
  const [module, setModule] = useState(1)
  const [uploaded, setUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)
  const [points, setPoints] = useState(0)
  const [questions, setQuestions] = useState(0)
  const [handout, setHandout] = useState('')
  const { course } = useParams()
  const { assignmentId } = useParams() 
  
  let data, userData, assignmentData, users;

  if (course === 'physics') {
    data = database.physics_users
    assignmentData = database.physics_assignments.doc(assignmentId)
    userData = database.physics_users.doc('ananthkashyap4@gmail.com')
  } else if (course === 'math') {
    data = database.math_users 
    assignmentData = database.math_assignments.doc(assignmentId)
    userData = database.math_users.doc('ananthkashyap4@gmail.com')
  } else if (course === 'biology') {
    data = database.biology_users
    assignmentData = database.biology_assignments.doc(assignmentId)
    userData = database.biology_users.doc('ananthkashyap4@gmail.com')
  } else if (course === 'astronomy') {
    data = database.astronomy_users
    assignmentData = database.astronomy_assignments.doc(assignmentId)
    userData = database.astronomy_users.doc('ananthkashyap4@gmail.com')
  }
  
  users = useCollectionData(data)[0]
  let info = useDocumentData(userData.collection('assignments').doc(assignmentId))

  function getAssignmentName() {
      userData.collection('assignments').doc(assignmentId).get().then((doc) => {
        setName(doc.data().name)
      })
      return name
  }

  function getUploaded() {
    userData.collection('assignments').doc(assignmentId).get().then((doc) => {
      setUploaded(!doc.data().disabled)
    })
    return uploaded ? 'Uploaded' : 'Not Uploaded'
  }

  function GetQuestions() {
    let assignment = []
    for (let i = 0; i < questions; ++i) {
        assignment.push(String(i))
    }
    return assignment
  }
  
  function RenderTemplate(event) {
    event.preventDefault()
    assignmentData.update({
        disabled: false,
        points: points,
        problems: questions,
        handout: handout,
    })
    
    let count = 0
    for (const user of users) {
        data.doc(user.email).collection('assignments').doc(assignmentId).update({
            disabled: false,
            points: points,
            problems: questions,
            handout: handout,
        })
        count++
    }
    if (count === users.length) {
        setLoading(false)
        setCreated(true)
    }
  }

  useEffect(() => {
    document.title = 'Create ' + getAssignmentName() + ' - Everaise Launch'
  })

  useEffect(() => {
    if (info[0] !== undefined) {
        setModule(info[0].module)
    }
    if (info[0] !== undefined && questions === 0) {
      setQuestions(info[0].problems)
    }
    if (info[0] !== undefined && points === 0) {
      setPoints(info[0].points)
    }
    if (info[0] !== undefined && handout === '') {
      setHandout(info[0].handout)
    }
  }, [info, questions, points, handout])


  return (
    <div className="bg-white">
        <Disclosure as="nav" className="bg-gray shadow border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
            <div className="flex">
                <Link to={`/admin/${course}`} className="flex-shrink-0 flex items-center">
                <ArrowCircleLeftIcon
                    className="h-8 w-auto text-cyan-600"
                />
                </Link>
            </div>
            <div className="flex">
                <Link to={`/homework/${course}/${module}/${assignmentId}`} className="flex-shrink-0 flex items-center">
                    View Assignment in Launch
                </Link>
            </div>
            </div>
        </div>
        </Disclosure>

        <div className="py-10">
        <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Create{' '} &lsquo;{getAssignmentName()}&rsquo;{' (' + getUploaded() + ')'}</h1>
            {loading && <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm text-red-800">Loading...</h3>
                    </div>
                </div>
            </div>}
            </div>
        </header>
        {!created ? 
        <main>
            <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="space-y-6 lg:px-0 lg:col-span-9">
                <form onSubmit={e => {
                    setLoading(true);
                    RenderTemplate(e)}
                } action="#" method="POST">
                <div className="shadow sm:rounded-md overflow-hidden shadow border border-gray-200">
                    <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Assignment Information</h3>
                        <p className="mt-1 text-sm text-gray-500">{'* '}Denotes a required field.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-3">
                        <label htmlFor="questions" className="block text-sm font-medium text-gray-700">
                            Number of Questions (Include separate parts as separate questions){'*'}
                        </label>
                        <input
                            min="1"
                            required
                            value={questions}
                            onChange={e => setQuestions(parseInt(e.target.value))}
                            type="number"
                            name="age"
                            id="aeg"
                            autoComplete="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                        <div className="col-span-3">
                        <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                            Points{'*'}
                        </label>
                        <input
                            min="1"
                            required
                            value={points}
                            onChange={e => setPoints(parseInt(e.target.value))}
                            type="number"
                            name="points"
                            id="points"
                            autoComplete="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                        <div className="col-span-6">
                        <label htmlFor="handout" className="block text-sm font-medium text-gray-700">
                            Handout Link{'*'}
                        </label>
                        <input
                            required
                            value={handout}
                            onChange={e => setHandout(e.target.value)}
                            type="link"
                            name="handout"
                            id="handout"
                            autoComplete="link"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                        Create Template
                    </button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </main> :
        GetQuestions().map((question) => (
            <Question number={parseInt(question) + 1} />          
        ))
        }
        </div>
    </div>
    )
  }