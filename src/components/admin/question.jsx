import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ExclamationIcon } from '@heroicons/react/outline'

export default function Question(props) {
    const [error, setError] = useState('')
    const [created, setCreated] = useState(false)
    const [number, setNumber] = useState('')
    const [id, setId] = useState('')
    const [answer, setAnswer] = useState('')
    const [solutionLink, setSolutionLink] = useState('')
    const [type, setType] = useState('')
    const [points, setPoints] = useState('')
    const { course } = useParams()
    const { assignmentId } = useParams()

    let data, assignmentData;

    if (course === 'physics') {
        data = database.physics_users
        assignmentData = database.physics_assignments.doc(assignmentId)
      } else if (course === 'math') {
        data = database.math_users 
        assignmentData = database.math_assignments.doc(assignmentId)
      } else if (course === 'biology') {
        data = database.biology_users
        assignmentData = database.biology_assignments.doc(assignmentId)
      } else if (course === 'astronomy') {
        data = database.astronomy_users
        assignmentData = database.astronomy_assignments.doc(assignmentId)
      }
    
    let users = useCollectionData(data)[0] 
    
    function HandleSubmit(event) {
        event.preventDefault()
        assignmentData.collection('questions').doc(id).set({
            number: number,
            attempts: 2,
            status: '',
            completed: false,
            type: type,
            points: points,
            answer: answer,
            solution: solutionLink,
        })
        for (const user of users) {
            console.log(user.email)
            data.doc(user.email).collection('assignments').doc(assignmentId).collection('questions').doc(id).set({
                number: number,
                attempts: 2,
                status: '',
                completed: false,
                type: type,
                points: points,
                answer: answer,
                solution: solutionLink,
            })
        }
        setCreated(true)
    }
  
    useEffect(() => {
      if (!['MC','SA','FR'].includes(type) && type !== '') {
          setError('The question type must be MC (multiple choice), SA (short answer), or FR (free response)')
      } else {
          setError('')
      }
    }, [type])

    return (
        <div className="bg-white">
        <div className={props.number === 1 ? "pt-1 pb-5" : "py-5"}>
            <main>
            <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="space-y-6 lg:px-0 lg:col-span-9">
                <form onSubmit={HandleSubmit} action="#" method="POST">
                    <div className="shadow sm:rounded-md overflow-hidden shadow border border-gray-200">
                    {error && <div className="rounded-md bg-yellow-50 p-4 mx-3 mt-3">
                    <div className="flex">
                        <div className="flex-shrink-0">
                        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Invalid Question</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                            {error}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>}
                    <div className="mb-2 bg-white py-6 px-4 space-y-6 sm:p-6">
                        <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                        <p className="mt-1 text-sm text-gray-500">{'* '}Denotes a required field.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                            Question ID{'*'}
                            </label>
                            <input
                            required
                            value={id}
                            onChange={e => setId(e.target.value)}
                            type="id"
                            name="id"
                            id="id"
                            placeholder="i.e. 1, 2a, 3d"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                            Number{'*'}
                            </label>
                            <input
                            value={number}
                            onChange={e => setNumber(parseFloat(e.target.value))}
                            required
                            type="number"
                            name="number"
                            id="number"
                            placeholder="If it is a question part enter as float - 12a: 12.1, 2b: 2.2"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type{'*'}
                            </label>
                            <input
                            value={type}
                            onChange={e => setType(e.target.value)}
                            required
                            type="string"
                            name="type"
                            id="type"
                            placeholder="Enter One: MC, SA, or FR"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                            Points{'*'}
                            </label>
                            <input
                            required
                            value={points}
                            onChange={e => setPoints(parseInt(e.target.value))}
                            type="number"
                            name="points"
                            id="points"
                            autoComplete="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                            Answer{'*'}
                            </label>
                            <input
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            type="answer"
                            name="answer"
                            id="answer"
                            placeholder="Enter answer to question"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
                            Solution{'*'}
                            </label>
                            <input
                            required
                            value={solutionLink}
                            onChange={e => setSolutionLink(e.target.value)}
                            type="string"
                            name="solution"
                            id="solution"
                            placeholder="BIO: Enter raw solution text. OTHER CLASSES: Enter link to image of solution"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            disabled={created}
                            type="submit"
                            className={created ? "bg-cyan-300 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" : 
                            "bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            }
                            >
                            Add Question
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </main>
        </div>
        </div>
    )
}