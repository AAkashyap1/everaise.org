import { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { database } from '../../../firebase' 
import AddAccess from './modals/addAccess'
import RemoveAccess from './modals/removeAccess'
import {
  MinusCircleIcon,
  UserCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'

export default function Access() {
  const users = useCollectionData(database.users)[0];
  const [instructors, setInstructors] = useState([]);
  const [addAccessModalOpen, setAddAccessModalOpen] = useState(false);
  const [removeAccessModalOpen, setRemoveAccessModalOpen] = useState(false);
  const [emailToEdit, setEmailToEdit] = useState('')

  useEffect(() => {
    if (users) {
      let tempInstructors = [];
      for (const tempUser of users) {
        if (tempUser.instructor) {
          tempInstructors.push({
            name: tempUser.first_name + ' ' + tempUser.last_name,
            email: tempUser.email, 
          });
        }
      }
      setInstructors(tempInstructors)
    }
  }, [users])

  function removeInstructor(e, email) {
    e.preventDefault();
    setEmailToEdit(email);
    setRemoveAccessModalOpen(true);
  }

  return (
    <div className="mt-8">
      <AddAccess open={addAccessModalOpen} setOpen={setAddAccessModalOpen} />
      <RemoveAccess email={emailToEdit} open={removeAccessModalOpen} setOpen={setRemoveAccessModalOpen} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Edit Instructors</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {instructors.map((instructor) => (
            <div
              key={instructor.email}
              className="relative rounded-lg border bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-red-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-600"
            >
              <div className="flex-shrink-0">
                <UserCircleIcon className="text-yellow-500 h-10 w-10 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <a target="_blank" rel="noreferrer" href={`mailto:${instructor.email}`} className="focus:outline-none">
                  <p className="text-sm font-medium text-gray-900">{instructor.name}</p>
                  <p className="text-sm text-gray-500 truncate">{instructor.email}</p>
                </a>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  onClick={e => removeInstructor(e, instructor.email)}
                  type="button"
                  className="unfocus w-8 hover:text-red-300 text-red-500 h-8 bg-white inline-flex items-center justify-center rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
                >
                  <span className="sr-only">Remove access</span>
                  <MinusCircleIcon className="w-8 h-8" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={e => setAddAccessModalOpen(true)}
          className="mt-4 w-full text-center bg-green-300 hover:bg-green-400 rounded-md flex justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 p-2 hover:by-cyan-700"
        >
          <div className="flex ">
            <div className="flex-shrink-0">
              <PlusCircleIcon className="ml-3 h-5 w-5 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-3 mr-7">
              <h3 className="text-sm text-green-800 font-semibold">Add instructor</h3>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}