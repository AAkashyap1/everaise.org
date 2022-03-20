import { 
  CalendarIcon,
  DotsVerticalIcon, 
  EyeIcon, 
  FireIcon, 
  PencilIcon,
  PlusCircleIcon, 
  QuestionMarkCircleIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { Link, useParams } from 'react-router-dom'
import courseData from '../../../data/launch/courseData'
import GetDate from '../../../utility/date'
import AddAssignmentModal from './modals/assignments/addAssignment'
import DeleteAssignmentModal from './modals/assignments/deleteAssignment'
import EditAssignmentModal from './modals/assignments/editAssignment'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Module(props) {
  const { course } = useParams();
  const [addAssignmentModal, setAddAssignmentModal] = useState(false);
  const [deleteAssignmentModal, setDeleteAssignmentModal] = useState(false);
  const [editAssignmentModal, setEditAssignmentModal] = useState(false);
  const assignmentIdData = useCollection(courseData[props.course].assignmentData.doc(`${props.name}`).collection('assignments').orderBy("due", "desc"))[0];
  const assignmentCollection = useCollectionData(courseData[props.course].assignmentData.doc(`${props.name}`).collection('assignments').orderBy("due", "desc"))[0]
  const [assignments, setAssignments] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [idToEdit, setIdToEdit] = useState('');
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (assignmentCollection) {
      let tempAssignments = [];
      for (const assignment of assignmentCollection) {
        let tempHandouts = [];
        if (assignment.handouts) {
          for (const handout of assignment.handouts) {
            tempHandouts.push({
              name: handout.name,
              link: handout.link,
            })
          }
        }
        let tempQuestions = [];
        if (assignment.questions) {
          for (const question of assignment.questions) {
            tempQuestions.push({
              points: question.points,
              question: question.question,
              displayNo: question.displayNo,
              type: question.type,
              answer: question.answer,
              solution: question.solution,
            })
          }
        }
        tempAssignments.push({
          name: assignment.name,
          disabled: assignment.disabled,
          dueDate: GetDate(assignment.due),
          link: `/admin/home`,
          due: {
            month: assignment.due.toDate().getMonth() + 1,
            day: assignment.due.toDate().getDate(),
          },
          handouts: tempHandouts,
          questions: tempQuestions,
        })
      }
      setAssignments(tempAssignments)
    }
  }, [assignmentCollection])

  useEffect(() => {
    if (assignmentIdData) {
      let tempIds = [];
      for (const doc of assignmentIdData.docs) {
        tempIds.push(doc.id);
      }
      setIds(tempIds);
    }
  }, [assignmentIdData])

  /*
  function changeId(e) {
    e.preventDefault();
    props.setIdToEdit(props.name);
    props.setEditModuleModalOpen(true);
  }
  */

  function deleteModule(e) {
    e.preventDefault();
    props.setIdToDelete(props.name);
    props.setDeleteModuleModalOpen(true);
  }

  function deleteAsssignment(e, id) {
    e.preventDefault();
    setIdToDelete(id);
    setDeleteAssignmentModal(true);
  }

  
  function editAssignment(e, id) {
    e.preventDefault();
    setIdToEdit(id);
    setEditAssignmentModal(true);
  }
  
  function calculatePoints(questions) {
    let points = 0;
    for (const question of questions) {
      points += question.points;
    }
    return points;
  }

  return (
    <div>
      <AddAssignmentModal 
        open={addAssignmentModal}
        setOpen={setAddAssignmentModal}
        name={props.name}
        data={courseData[course].assignmentData}
      />
      <DeleteAssignmentModal 
        open={deleteAssignmentModal}
        setOpen={setDeleteAssignmentModal}
        name={props.name}
        id={idToDelete}
        data={courseData[course].assignmentData}
      />
      <EditAssignmentModal
        open={editAssignmentModal}
        setOpen={setEditAssignmentModal}
        name={props.name}
        id={idToEdit}
        ids={ids}
        assignments={assignments}
        data={courseData[course].assignmentData}
      />
      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
      </h2>
      <div className="mt-2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="bg-white px-4 py-2 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {' ' + props.name}
                </h3>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-100 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item> 
                          {({ active }) => (
                            <button
                              onClick={() => setAddAssignmentModal(true)}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'w-full flex px-4 py-2 text-sm'
                              )}
                            >
                              <PlusCircleIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span>Add assignment</span>
                            </button>
                          )}
                        </Menu.Item>
                        {/*
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={changeId}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'w-full flex px-4 py-2 text-sm'
                              )}
                            >
                              <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span>Edit module</span>
                            </button>
                          )}
                        </Menu.Item>
                        */}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={deleteModule}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'w-full flex px-4 py-2 text-sm'
                              )}
                            >
                              <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span>Delete module</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {assignments.map((assignment, assignmentIdx) => (
              <div
                className="cursor-pointer"
                key={assignment.name}
              >
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium truncate">{assignment.name}</p>
                      <div className="grid grid-cols-3 ">
                        <Link 
                          to={`/homework/${course}/${props.name}/${ids[assignmentIdx]}`}
                          className="hover:text-green-700 text-green-500 ml-2 flex-shrink-0 flex justify-center"
                        >
                          <EyeIcon className="mt-0.5 flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true" />
                          View 
                        </Link>
                        <button 
                          onClick={e => editAssignment(e, ids[assignmentIdx])}
                          className="hover:text-indigo-700 text-indigo-500 ml-2 flex-shrink-0 flex justify-center"
                        >
                          <PencilIcon className="mt-0.5 flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true" />
                          Edit 
                        </button>
                        <button 
                          onClick={e => deleteAsssignment(e, ids[assignmentIdx])}
                          className="hover:text-red-700 text-red-500 ml-2 flex-shrink-0 flex justify-center"
                        >
                          <TrashIcon className="mt-0.5 flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true" />
                          Delete 
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <QuestionMarkCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-indigo-400" aria-hidden="true" />
                          {assignment.questions.length} Question{assignment.questions.length !== 1 && 's'}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-600 sm:mt-0 sm:ml-6">
                          <FireIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
                          {calculatePoints(assignment.questions)} Point{calculatePoints !== 1 && 's'}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p>
                          <time>{assignment.dueDate}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
          {!assignments.length &&
            <div className="block hover:bg-gray-50">
              <div className="flex p-7 items-center text-lg justify-center m-auto">
                No assignments in this module!
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}