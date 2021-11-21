import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import MCQuestion from './mcquestion'
import SAQuestion from './saquestion'
import FRQuestion from './frquestion'
import {
  ExclamationIcon,
  PaperClipIcon,
} from '@heroicons/react/solid'


export default function Assignment(props) {
  const { currentUser } = useAuth()
  const { assignmentId } = useParams()
  const [points, setPoints] = useState(0)
  const [completed, setCompleted] = useState(0)

  let userData = null
  let append = null
  let appendLink = null

  if (props.course === 'physics') {
    userData = database.physics_users
    append = 'Calculus Overview - Handout'
    appendLink = 'https://drive.google.com/file/d/1Z30k3amvLsbzFejlBkGWvjKmlXJ8YV9G/view?usp=sharing'
  } else if (props.course === 'math') {
    userData = database.math_users
  } else if (props.course === 'biology') {
    userData = database.biology_users
    append = 'Biology Homework'
    appendLink = 'https://drive.google.com/drive/folders/15meDK_rPtglxtjiWVayk37ZBliM53rrc?usp=sharing'
  } else if (props.course === 'astronomy') {
    userData = database.astronomy_users
  }

  const assignment = useDocumentData(userData.doc(currentUser.email).collection('assignments').doc(assignmentId))[0]

  useEffect(() => {
    if (assignment) {
      setPoints(assignment.earned)
      setCompleted(assignment.completed)
    }
  }, [assignment])

  function GetQuestions() {
    const [questions, setQuestions] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
      userData.doc(currentUser.email).collection('assignments').doc(assignmentId).collection('questions').orderBy("number", "asc").get()
        .then((querySnapshot) => {
          let data = []
          let temp = 0
          querySnapshot.forEach((doc) => {
            if (doc.data().type === 'MC') {
              temp = temp + 1
              data.push(<MCQuestion
                id={assignmentId}
                course={props.course}
                userAnswer={doc.data().status}
                number={doc.id}
                attempts={doc.data().attempts}
                completed={doc.data().completed}
                answer={doc.data().answer}
                points={doc.data().points}
                solution={doc.data().solution}
              />)
            } else if (doc.data().type === 'SA') {
              temp = temp + 1
              data.push(<SAQuestion
                id={assignmentId}
                course={props.course}
                userAnswer={doc.data().status}
                number={doc.id}
                attempts={doc.data().attempts}
                completed={doc.data().completed}
                answer={doc.data().answer}
                points={doc.data().points}
                solution={doc.data().solution}
              />)
            }
          })
          setCount(temp)
          setQuestions(data)
        })
    }, [])

    return {
      questions,
      count
    }
  }

  function GetFRQuestions() {
    const [frquestions, setFRQuestions] = useState([])

    useEffect(() => {
      userData.doc(currentUser.email).collection('assignments').doc(assignmentId).collection('questions').orderBy("number", "asc").get()
        .then((querySnapshot) => {
          let data = []
          querySnapshot.forEach((doc) => {
            if (doc.data().type === 'FR') {
              data.push(<FRQuestion
                id={assignmentId}
                course={props.course}
                number={doc.data().number}
                points={doc.data().points}
                solution={doc.data().solution}
              />)
            }
          })
          setFRQuestions(data)
        })
    }, [])

    return frquestions
  }

  return (
    <div className="space-y-6 lg:col-start-2 lg:col-span-2 ">
      {/* Description list*/}
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
              {props.name}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Recommended Due Date: {props.due}</p>
          </div>
          {appendLink && <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Progress</dt>
                <dd className="mt-1 text-sm text-gray-900">{Math.round((completed / props.problems) * 100)}% Completed</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Points</dt>
                <dd className="mt-1 text-sm text-gray-900">{points}/{props.points}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li
                      key={'1'}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 flex-1 w-0 truncate">{props.name} - Handout</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={props.handout}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View
                        </a>
                      </div>
                    </li>
                    <li
                      key={'1'}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 flex-1 w-0 truncate">{append}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={appendLink}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>}
          {!appendLink && 
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Progress</dt>
                <dd className="mt-1 text-sm text-gray-900">{Math.round((props.completed / props.problems) * 100)}% Completed</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Points</dt>
                <dd className="mt-1 text-sm text-gray-900">{props.earned}/{props.points}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li
                      key={'1'}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 flex-1 w-0 truncate">{props.name} - Handout</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={props.handout}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h2 id="applicant-information-title" className="mb-4 text-lg leading-6 font-medium text-gray-900">
                  Multiple Choice/Short Answer Section
                </h2>
              </div>
              {GetQuestions().count === 0 && 
                <div className="rounded-md bg-yellow-50 p-4 my-1 col-span-2">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">No multiple choice/short answer questions for this assignment</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Move on to the free response section
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {GetQuestions().count !== 0 && 
                <div className="rounded-md bg-yellow-50 p-4 my-1 col-span-2">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">For short answer questions, please use the <a className="underline" href="https://www.overleaf.com/read/hppwrtmqtcvh" target="_blank" rel="noreferrer">answer submission formatting guide</a></h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          To ensure that you are correctly formatting your submissions to the short answer questions, view the formatting guide linked above.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              <div class="col-span-2">
                {GetQuestions().questions.map((question) => (
                  <div className={question.props.number === 1 ? "mt-5 " : "mt-10 "}>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Question #{question.props.number} ({question.props.points} points):
                    </label>
                    {question}
                  </div>
                ))}
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h2 id="applicant-information-title" className="mb-4 text-lg leading-6 font-medium text-gray-900">
                  Free Response Section
                </h2>
              </div>
              <div className="rounded-md bg-yellow-50 p-4 my-1 col-span-2">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">No submissions required for free response questions</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        For grading purposes, the free response questions must be self-checked and will not be scored by staff. When you are ready to view the solution to a question, click the 'View Solution' button for the corresponding section.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                {GetFRQuestions().map((frquestion) => (
                  <div className="mt-4">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Question #{frquestion.props.number}:
                    </label>
                    {frquestion}
                  </div>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}