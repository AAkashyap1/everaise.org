import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { database } from '../firebase'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex'

export default function MCQuestion(props) {
  const { currentUser } = useAuth();
  const { course, assignmentId, module } = useParams();
  const docRef = database.users.doc(currentUser.email)
    .collection('courses')
    .doc(course)
    .collection('modules')
    .doc(module)
    .collection('assignments')
    .doc(assignmentId)

  const [answer, setAnswer] = useState(props.userAnswer);
  const [error, setError] = useState(props.submissions === 0 ? (String(props.answer) === String(props.userAnswer) ? '' : 'Solution:') : '');
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState(String(props.answer) === String(props.userAnswer));
  const [submissions, setSubmissions] = useState(props.submissions);

  useEffect(() => {
    async function updateSubmissions() {
      let result = await docRef.get();
      let tempQuestions = result.data().questions;
      tempQuestions[props.index].submissions = submissions;
      docRef.update({
        questions: tempQuestions,
      })
    }
    updateSubmissions();
  // eslint-disable-next-line
  }, [submissions])

  async function checkAnswer(e) {
    e.preventDefault();
    let result = await docRef.get();
    let tempQuestions = result.data().questions;
    tempQuestions[props.index].userAnswer = answer;
    docRef.update({
      questions: tempQuestions,
    })
    setConfirmation(false);
    if (String(answer) === String(props.answer)) {
      setSubmissions(0); 
      setError('');
      setMessage(true);
    } else {
      if (submissions === 2) {
        setError(`You have one attempt remaining`);
        setSubmissions(1);
      } else {
        setError('Solution:');
        setSubmissions(0);
      }
    }
  }

  function giveUp(e) {
    e.preventDefault();
    setSubmissions(0);
    setConfirmation(false);
    setError('Solution:');
  }

  return (
    <form onSubmit={checkAnswer} action="#" method="POST">
      <div className="my-3">
        {(props.question.startsWith('https') ? 
          <img alt="Question" src={props.question} className="h-30 w-full"/> : 
          <Latex>{props.question}</Latex>)
        }
      </div>
      <div class="mx-auto grid grid-cols-5">
        {['A', 'B', 'C', 'D', 'E'].map((choice) => (
          <div 
            key={choice}
            class="flex items-center"
          >
            <input
              id={choice}
              name={choice}
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"
              checked={answer === choice}
              disabled={submissions === 0}
              onChange={e => setAnswer(choice)}
            ></input>
            <label htmlFor={`push_${choice.toLowerCase()}`} class="ml-3 block text-sm font-medium text-gray-700">
              {choice}
            </label>
          </div>
        ))}
      </div>
      <span className="mt-4 relative z-0 inline-flex rounded-md">
        <button
          disabled={submissions === 0}
          type="submit"
          className={submissions === 0 ? "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" :
            "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
        >
          Submit
        </button>
        <button
          disabled={submissions === 0}
          onClick={() => { 
            setConfirmation(true);
            setError('');
          }}
          type="button"
          className={submissions === 0 ? "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" :
            "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
        >
          Give Up
        </button>
      </span>
      <p className="mt-2 text-sm font-medium text-gray-500">{submissions}/2 Submissions Remaining</p>
      {confirmation &&
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <QuestionMarkCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm text-red-800">Are you sure you want to give up?</h3>
              <div className="mt-2">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    onClick={giveUp}
                    type="button"
                    className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmation(false)}
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
              <h3 className="text-sm text-green-800 font-semibold">
                <div>Correct! You have earned {props.points} points</div>
                  <div className="mt-2">
                    {(props.solution.startsWith('https') ? 
                      <img alt="Solution" src={props.solution} className="h-30 object-contain"/> : 
                      <Latex>{props.solution}</Latex>)
                    }
                  </div>
              </h3>
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
              <h3 className="text-sm text-red-800 font-semibold">
                <div>{error}</div>
                {submissions === 0 && 
                  <div className="mt-2">
                    {(props.solution.startsWith('https') ? 
                      <img alt="Solution" src={props.solution} className="h-30 object-contain"/> : 
                      <Latex>{props.solution}</Latex>)
                    }
                  </div>
                }
              </h3>
            </div>
          </div>
        </div>
      }
    </form>
  )

}