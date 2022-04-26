import { useParams, Link } from 'react-router-dom'
import MCQuestion from './mcquestion'
import SAQuestion from './saquestion'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  EmojiHappyIcon,
  PaperClipIcon,
  PencilIcon
} from '@heroicons/react/solid'
import { database } from '../firebase'
import printError from '../utility/printError'


export default function Assignment(props) {
  const { course } = useParams();
  const { currentUser } = useAuth();
  const [instructor, setInstructor] = useState(false);

  async function getAccess() {
    try {
      const user = await database.users.doc(currentUser.email).get();
      setInstructor(user.data().admin || user.data().instructor);
    } catch (err) {
      printError(err);
    }
  }

  useEffect(() => {
    getAccess();
  // eslint-disable-next-line
  }, [])
 
  return (
    <div className="space-y-6 lg:col-start-2 lg:col-span-2 ">
      {/* Description list*/}
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="flex justify-between px-4 py-5 sm:px-6">
            <div className="">
              <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                {props.name}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Recommended Due Date: {props.due}</p>
            </div>
            <div className="items-center flex">
              {instructor && 
                <Link 
                  to={`/admin/dashboard/${course}`}
                  className="hover:text-indigo-700 text-indigo-500 flex-shrink-0 flex"
                >
                  <PencilIcon className="mt-0.5 flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Edit Assignment
                </Link>
              }
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Progress</dt>
                <dd className="mt-1 text-sm text-gray-900">{
                  props.completed === 0 ? 0 : Math.round((props.completed / props.problems) * 100)
                }% Completed</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Points</dt>
                <dd className="mt-1 text-sm text-gray-900">{props.earned}/{props.points}</dd>
              </div>
              {props.handouts &&
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Handouts</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {props.handouts.map((handout) => (
                        <li
                          key={handout.name}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{handout.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href={handout.link}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              View
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              }
            </dl>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              {props.questions.length === 0 && 
                <div className="rounded-md bg-green-50 p-4 my-1 col-span-2">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <EmojiHappyIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">No HW questions for this assignment</h3>
                    </div>
                  </div>
                </div>
              }
              <div class="col-span-2">
                {props.questions.map((question, questionIdx) => (
                  <div className="mt-5">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Question #{question.displayNo} ({question.points} point{question.points > 1 && 's'}):
                    </label>
                    {
                      question.type === 'MC' ? 
                        <MCQuestion
                          question={question.question}
                          userAnswer={props.answers[questionIdx].userAnswer}
                          number={question.displayNo}
                          submissions={props.answers[questionIdx].submissions}
                          completed={props.completed}
                          answer={question.answer}
                          points={question.points}
                          solution={question.solution}
                          index={questionIdx}
                        /> : 
                        <SAQuestion
                          question={question.question}
                          userAnswer={props.answers[questionIdx].userAnswer}
                          number={question.displayNo}
                          submissions={props.answers[questionIdx].submissions}
                          completed={props.completed}
                          answer={question.answer}
                          points={question.points}
                          solution={question.solution}
                          index={questionIdx}
                        />
                    }
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