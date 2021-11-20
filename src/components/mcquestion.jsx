import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { database, increment } from '../firebase'
import { useParams } from 'react-router-dom'
import firebase from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

export default function MCQuestion(props) {
  const { assignmentId } = useParams()
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [updateData, setUpdateData] = useState(false)
  const [value, setValue] = useState(props.attempts)
  const [append, setAppend] = useState(false)
  const { currentUser } = useAuth()

  let userData = null
  let solution = null
  
  if (props.course === 'physics') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
    userData = database.physics_users
  } else if (props.course === 'math') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
    userData = database.math_users
  } else if (props.course === 'biology') {
    solution = <TeX>{props.solution}</TeX>
    userData = database.biology_users
  } else if (props.course === 'astronomy') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
    userData = database.astronomy_users
  }


  useEffect(() => {
    setValue(props.attempts)
    setUserAnswer(props.userAnswer)

    if (props.attempts !== 0) {
      setMessage('')
      setError('')
    } else if (props.completed === false && props.attempts === 0) {
      setAppend(true)
      setError('Solution: ')
    } else if (props.completed === true && props.attempts === 0) {
      setAppend(true)
      setMessage('You have earned ' + props.points + ' points. Solution: ')
    }

  }, [props.completed, props.userAnswer, props.attempts, props.points, assignmentId])

  useEffect(() => {
    userData.doc(currentUser.email).collection('assignments')
      .doc(props.id).collection('questions').doc(String(props.number)).update({
        status: userAnswer,
      })
  }, [userData, userAnswer, currentUser.email, props.id, props.number])

  function UpdateSubmissions(number) {
    userData.doc(currentUser.email).collection('assignments').doc(props.id).collection('questions')
      .doc(String(props.number)).update({
        attempts: number
      }).finally(() => {
        setUpdateData(!updateData)
      })
  }

  function UpdateStatus(status) {
    userData.doc(currentUser.email).collection('assignments').doc(props.id)
      .collection('questions').doc(String(props.number)).update({
        completed: status
      }).finally(() => {
        setUpdateData(!updateData)
      })
  }


  function GiveUp(event) {
    event.preventDefault()
    setConfirmation('Are you sure you want to give up on this question?')
  }

  function Confirmed(event) {
    setUserAnswer('')
    event.preventDefault()
    UpdateSubmissions(0)
    UpdateStatus(false)
    setValue(0)
    setConfirmation('')
    userData.doc(currentUser.email).collection('assignments').doc(assignmentId).update({
      completed: increment
    })
    setAppend(true)
    setError('Solution: ')
  }

  function NotConfirmed(event) {
    event.preventDefault()
    setConfirmation('')
  }

  function CheckAnswer(event) {
    event.preventDefault()
    setMessage('')
    setError('')
    setConfirmation('')

    if (userAnswer === String(props.answer)) {
      UpdateStatus(true)
      UpdateSubmissions(0)
      setValue(0)
      setAppend(true)
      setMessage('You have earned ' + props.points + ' points. Solution: ')
      let Promises = []
      Promises.push(userData.doc(currentUser.email).update({
        points: firebase.firestore.FieldValue.increment(props.points)
      }))
      Promises.push(userData.doc(currentUser.email).collection('assignments').doc(assignmentId).update({
        earned: firebase.firestore.FieldValue.increment(props.points)
      }))
      Promises.push(userData.doc(currentUser.email).collection('assignments').doc(assignmentId).update({
        completed: increment
      }))
      Promise.all(Promises)
    } else {
      if (value > 1) {
        setError('You have one attempt left.')
        UpdateSubmissions(value - 1)
        setValue(value - 1)
      } else {
        userData.doc(currentUser.email).collection('assignments').doc(assignmentId).update({
          completed: increment
        })
        setAppend(true)
        setError('Solution: ')
        UpdateSubmissions(value - 1)
        setValue(value - 1)
      }
    }
  }

  return (
    <form onSubmit={CheckAnswer} action="#" method="POST">
      <div class="mt-4 mx-auto grid grid-cols-5">
        <div class="flex items-center">
          <input
            id="A"
            name="A"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"
            checked={userAnswer === 'A'}
            disabled={value === 0}
            onChange={e => (setUserAnswer('A'))}
          ></input>
          <label htmlFor="push_a" class="ml-3 block text-sm font-medium text-gray-700">
            A
          </label>
        </div>
        <div class="flex items-center">
          <input
            id="B"
            name="B"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"
            checked={userAnswer === 'B'}
            disabled={value === 0}
            onChange={e => (setUserAnswer('B'))}
          ></input>
          <label htmlFor="push_b" class="ml-3 block text-sm font-medium text-gray-700">
            B
          </label>
        </div>
        <div class="flex items-center">
          <input
            id="C"
            name="C"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"
            checked={userAnswer === 'C'}
            disabled={value === 0}
            onChange={e => (setUserAnswer('C'))}
          ></input>
          <label htmlFor="push_c" class="ml-3 block text-sm font-medium text-gray-700">
            C
          </label>
        </div>
        <div class="flex items-center">
          <input
            id="D"
            name="D"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"
            checked={userAnswer === 'D'}
            disabled={value === 0}
            onChange={e => (setUserAnswer('D'))}
          ></input>
          <label htmlFor="push_d" class="ml-3 block text-sm font-medium text-gray-700">
            D
          </label>
        </div>
        <div class="flex items-center">
          <input
            id="E"
            name="E"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"
            checked={userAnswer === 'E'}
            disabled={value === 0}
            onChange={e => (setUserAnswer('E'))}
          ></input>
          <label htmlFor="push_e" class="ml-3 block text-sm font-medium text-gray-700">
            E
          </label>
        </div>
      </div>
      <span className="mt-4 relative z-0 inline-flex rounded-md">
        <button
          disabled={value === 0}
          type="submit"
          className={value === 0 ? "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" :
            "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
        >
          Submit
        </button>
        <button
          disabled={value === 0}
          onClick={GiveUp}
          type="button"
          className={value === 0 ? "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" :
            "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
        >
          Give Up
        </button>
      </span>
      <p className="mt-2 text-sm font-medium text-gray-500">{value}/2 Submissions Remaining</p>
      {confirmation &&
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <QuestionMarkCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm text-red-800">{confirmation}</h3>
              <div className="mt-2">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    onClick={Confirmed}
                    type="button"
                    className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={NotConfirmed}
                    type="button"
                    className="ml-3 bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {message &&
        <div className="mt-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-30 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3 mr-7">
              <h3 className="text-sm text-green-800"><p className={append ? 'font-semibold mb-2' : 'font-semibold'}>{message}</p> {append ? solution : ''}</h3>
            </div>
          </div>
        </div>
      }
      {error && <div className="mt-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3 mr-7">
            <h3 className="text-sm text-red-800"><p className={append ? 'font-semibold mb-2' : 'font-semibold'}>{error}</p> {append ? solution : ''}</h3>
          </div>
        </div>
      </div>
      }
    </form>
  )

}