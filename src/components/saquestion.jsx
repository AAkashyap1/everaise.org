import { useState, useEffect } from 'react'
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import { useParams } from 'react-router-dom'
import firebase from 'firebase/app'
import { database, increment } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import AsciiMathParser from "../utility/asciimath";

const parser = new AsciiMathParser();

export default function SAQuestion(props) {
  const { assignmentId } = useParams()
  const [message, setMessage] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [updateData, setUpdateData] = useState(false)
  const { currentUser } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [response, setResponse] = useState('')
  const [append, setAppend] = useState(false)

  const renderedLatex = response && parser.parse(response)

  let userData = null
  let solution = null

  if (props.course === 'physics') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
    userData = database.physics_users
  } else if (props.course === 'math') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
    userData = database.math_users
  } else if (props.course === 'biology') {
    solution = <TeX math={props.solution} />
    userData = database.biology_users
  } else if (props.course === 'astronomy') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
    userData = database.astronomy_users
  }

  useEffect(() => {
    setResponse(props.userAnswer)
    if (props.attempts === 1) {
      setAppend(true)
      setMessage('You have earned ' + props.points + ' points. Solution: ')
      setDisabled(true)
    } else if (props.attempts === 0) {
      setAppend(true)
      setError('Solution: ')
      setDisabled(true)
    }
  }, [props.completed, props.userAnswer, props.attempts, props.points, assignmentId])

  function UpdateStatus(status) {
    userData.doc(currentUser.email).collection('assignments').doc(props.id)
      .collection('questions').doc(String(props.number)).update({
        completed: status
      }).finally(() => {
        setUpdateData(!updateData)
      })
  }

  useEffect(() => {
    userData.doc(currentUser.email).collection('assignments')
      .doc(props.id).collection('questions').doc(String(props.number)).update({
        status: response,
      })
    console.log(true)
  }, [userData, response, currentUser.email, props.id, props.number])

  function UpdateSubmissions(number) {
    userData.doc(currentUser.email).collection('assignments').doc(props.id).collection('questions')
      .doc(String(props.number)).update({
        attempts: number
      }).finally(() => {
        setUpdateData(!updateData)
      })
  }

  function CheckAnswer(event) {
    setConfirmation('')
    event.preventDefault()
    setMessage('')
    setError('')
    if (response.trim() === String(props.answer)) {
      setDisabled(true)
      UpdateStatus(true)
      UpdateSubmissions(1)
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
      setError('Sorry, that is not correct')
    }
  }

  function GiveUp(event) {
    event.preventDefault()
    setError('')
    setConfirmation('Are you sure you want to give up on this question?')
  }

  function Confirmed(event) {
    event.preventDefault()
    UpdateStatus(true)
    UpdateSubmissions(0)
    setConfirmation('')
    setDisabled(true)
    setAppend(true)
    setError('Solution: ')
    userData.doc(currentUser.email).collection('assignments').doc(assignmentId).update({
      completed: increment
    })
  }

  function NotConfirmed(event) {
    event.preventDefault()
    setConfirmation('')
  }


  return (
    <div>
      <form onSubmit={CheckAnswer} action="#" method="POST">
        <textarea
          id="about"
          name="about"
          rows={3}
          className="mt-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          defaultValue={response}
          disabled={disabled}
          onChange={e => { setResponse(e.target.value) }}
        ></textarea>
        {renderedLatex && <div className="mt-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm text-green-800"><TeX math={renderedLatex} /></h3>
            </div>
          </div>
        </div>}
        <span className="mt-4 relative z-0 inline-flex rounded-md">
          <button
            disabled={disabled}
            type="submit"
            className={disabled ? "-ml-px relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" :
              "-ml-px relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
          >
            Submit
          </button>
          <button
            disabled={disabled}
            onClick={GiveUp}
            type="button"
            className={disabled ? "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" :
              "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
          >
            Give Up
          </button>
        </span>
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
                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3 mr-7">
                <h3 className="text-sm text-green-800"><p className={append ? 'font-semibold mb-2' : 'font-semibold'}>{message}</p> {append ? solution : ''}</h3>
              </div>
            </div>
          </div>
        }
        {error && 
          <div className="mt-4 rounded-md bg-red-50 p-4">
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
    </div>
  )
}