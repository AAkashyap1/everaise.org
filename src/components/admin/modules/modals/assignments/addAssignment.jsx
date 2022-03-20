import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, RadioGroup } from '@headlessui/react'
import { PencilIcon, XIcon } from '@heroicons/react/solid'
import Handout from './fields/handout'
import Question from './fields/question'
import { database } from '../../../../../firebase'
import { useParams } from 'react-router-dom'
import printError from '../../../../../utility/printError'
import Loading from '../loading'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const settings = [
  { name: 'Not Disabled', description: 'Students will be able to access this assignment' },
  { name: 'Disabled', description: 'No student will be able to access this assignment' },
]

export default function AddAssignmentModal(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { course } = useParams();
  const [assignment, setAssignment] = useState({
    name: '',
    disabled: false,
    due: {
      month: 1,
      day: 1,
    },
    handouts: [{
      name: '',
      link: '',
    }],
    questions: [{
      points: NaN,
      question: '',
      displayNo: '',
      type: 'MC',
      answer: '',
      solution: '',
    }]
  });

  async function addAssignment(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let tempHandouts = []
      for (const handout of assignment.handouts) {
        if (handout.name && handout.link.startsWith('https')) {
          tempHandouts.push(handout);
        }
      }
      const id = new Date().getTime().toString();
      const users = await database.users.get();
      let userQuestions = [];
      for (const question of assignment.questions) {
        userQuestions.push({
          id: question.displayNo,
          submissions: question.type === 'MC' ? 2 : 100,
          userAnswer: '',
        })
      }
      for (const doc of users.docs)
        await database.users.doc(doc.id)
          .collection('courses')
          .doc(course)
          .collection('modules')
          .doc(props.name)
          .collection('assignments')
          .doc(id)
          .set({
            questions: userQuestions,
          })
      await props.data.doc(`${props.name}`).collection('assignments').doc(id).set({
        name: assignment.name,
        disabled: assignment.disabled,
        due: new Date(2022, assignment.due.month - 1, assignment.due.day),
        handouts: tempHandouts,
        questions: assignment.questions,
      })
      console.log('Assignment succesfully created!');
      props.setOpen(false);
      setAssignment({
        name: '',
        disabled: false,
        due: {
          month: 1,
          day: 1,
        },
        handouts: [{
          name: '',
          link: '',
        }],
        questions: [{
          points: NaN,
          question: '',
          displayNo: '',
          type: 'MC',
          answer: '',
          solution: '',
        }]
      })
    } catch (err) {
      printError(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    let errors = 0;
    for (const question of assignment.questions) {
      if ((question.type === 'MC' && !['A', 'B', 'C', 'D', 'E'].includes(question.answer))
      || (question.type === 'SA' && isNaN(question.answer))) {
        errors += 1;
      }
    }
    setError(errors > 0);
  }, [assignment])

  function updateHandoutName(index, name) {
    let newArr = [...assignment.handouts];
    let prevLink = newArr[index].link;
    newArr[index] = {
      name: name,
      link: prevLink,
    };
    setAssignment({ ...assignment, handouts: newArr });
  }

  function updateHandoutLink(index, link) {
    let newArr = [...assignment.handouts];
    let prevName = newArr[index].name;
    newArr[index] = {
      name: prevName,
      link: link,
    };
    setAssignment({ ...assignment, handouts: newArr });
  }

  function addHandout(e) {
    e.preventDefault();
    let tempHandouts = assignment.handouts;
    tempHandouts.push({
      name: '',
      link: '',
    });
    setAssignment({ ...assignment, handouts: tempHandouts })
  }

  function removeHandout(e) {
    e.preventDefault();
    let tempHandouts = assignment.handouts;
    tempHandouts.pop();
    setAssignment({ ...assignment, handouts: tempHandouts });
  } 

  function addQuestion(e) {
    e.preventDefault();
    let tempQuestions = assignment.questions;
    tempQuestions.push({
      points: NaN,
      question: '',
      displayNo: '',
      type: 'MC',
      answer: '',
      solution: '',
    })
    setAssignment({ ...assignment, questions: tempQuestions });
  }

  function removeQuestion(e) {
    e.preventDefault();
    let tempQuestions = assignment.questions;
    tempQuestions.pop();
    setAssignment({ ...assignment, questions: tempQuestions })
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => (!loading && props.setOpen(false))}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {!loading ? 
              <div>
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => props.setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100">
                    <PencilIcon className="h-6 w-6 text-cyan-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Create assignment
                    </Dialog.Title>
                  </div>
                </div>
                <form className="mt-6 grid grid-cols-2 gap-6" onSubmit={addAssignment} method="POST">
                  <div className="col-span-2">
                    <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                      Name{'*'}
                    </label>
                    <input
                      required
                      value={assignment.name}
                      onChange={e => setAssignment({ ...assignment, name: e.target.value })}
                      placeholder="Enter assignment name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                      Disabled{'*'}
                    </label>
                    <div className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <RadioGroup value={assignment.disabled ? settings[1] : settings[0]} onChange={e => setAssignment({ ...assignment, disabled: e.name === 'Disabled' })}>
                        <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
                        <div className="">
                          {settings.map((setting, settingIdx) => (
                            <RadioGroup.Option
                              key={setting.name}
                              value={setting}
                              className={({ checked }) =>
                                classNames(
                                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                  settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                  checked ? 'bg-indigo-50 border-indigo-200' : '',
                                  'relative p-4 flex cursor-pointer focus:outline-none'
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <span
                                    className={classNames(
                                      checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                      active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                      'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                    )}
                                    aria-hidden="true"
                                  >
                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                  </span>
                                  <div className="rounded-md ml-3 flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                                    >
                                      {setting.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                                    >
                                      {setting.description}
                                    </RadioGroup.Description>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                      Due date (MM / DD){'*'}
                    </label>
                    <div className="mt-1 grid grid-cols-9 ">
                      <div className="col-span-4">
                        <label htmlFor="card-expiration-date" className="sr-only">
                          Month
                        </label>
                        <input
                          required
                          value={assignment.due.month}
                          onChange={e => setAssignment({ ...assignment, due: { ...assignment.due, month: parseInt(e.target.value) } })}
                          min={1}
                          max={12}
                          type="number"
                          name="month"
                          id="month"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-l-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          placeholder="MM"
                        />
                      </div>
                      <span className="shadow-sm col-span-1 flex justify-center px-auto items-center px-3 border border-r-0 border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <div className="flex justify-center mx-auto">
                          /
                        </div>
                      </span>
                      <div className="col-span-4">
                        <label htmlFor="card-cvc" className="sr-only">
                          Day
                        </label>
                        <input
                          required
                          value={assignment.due.day}
                          onChange={e => setAssignment({ ...assignment, due: { ...assignment.due, day: parseInt(e.target.value) } })}
                          min={0}
                          max={31}
                          type="number"
                          name="day"
                          id="day"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-r-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          placeholder="DD"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                      Handouts
                    </label>
                    {assignment.handouts.map((handout, handoutIdx) => (
                      <Handout 
                        index={handoutIdx} 
                        name={handout.name} 
                        link={handout.link} 
                        updateName={updateHandoutName} 
                        updateLink={updateHandoutLink} 
                      />
                    ))
                    }
                    <div className="mt-4">
                      <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          onClick={addHandout}
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          Add handout
                        </button>
                        <button
                          onClick={removeHandout}
                          disabled={assignment.handouts.length === 0}
                          type="button"
                          className={"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium " + (assignment.handouts.length === 0 ? "text-gray-300" : "text-gray-700") + " hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
                        >
                          Remove handout
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                      Questions
                    </label>
                    {assignment.questions.map((question, questionIdx) => (
                      <Question 
                        error={error}
                        setError={setError}
                        index={questionIdx} 
                        question={question}
                        assignment={assignment}
                        setAssignment={setAssignment}
                      />
                    ))
                    }
                    <div className="mt-4">
                      <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          onClick={addQuestion}
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          Add question
                        </button>
                        <button
                          onClick={removeQuestion}
                          disabled={assignment.questions.length === 0}
                          type="button"
                          className={"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium " + (assignment.questions.length === 0 ? "text-gray-300" : "text-gray-700") + " hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"}
                        >
                          Remove question
                        </button>
                      </span>
                    </div>
                  </div>
                  <button
                    disabled={loading || error}
                    type="submit"
                    className="col-span-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Save assignment
                  </button>
                </form>
              </div> : <Loading />
              }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}