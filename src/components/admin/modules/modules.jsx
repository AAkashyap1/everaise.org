import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import courseData from '../../../data/launch/courseData'
import Module from './module'
import AddModuleModal from './modals/addModule'
import EditModuleModal from './modals/editModule'
import {
  PlusCircleIcon,
} from '@heroicons/react/solid'
import DeleteModuleModal from './modals/confirmation'

export default function Modules() {
  const { course } = useParams()
  const [modules, setModules] = useState([]);
  const [addModuleModalOpen, setAddModuleModalOpen] = useState(false);
  const [editModuleModalOpen, setEditModuleModalOpen] = useState(false);
  const [deleteModuleModalOpen, setDeleteModuleModalOpen] = useState(false);
  const courseModules = useCollectionData(courseData[course].assignmentData)[0];
  const [idToEdit, setIdToEdit] = useState('');
  const [idToDelete, setIdToDelete] = useState('');

  useEffect(() => {
    if (courseModules) {
      let tempModules = [];
      for (const module of courseModules) {
        tempModules.push({
          name: module.name,
          disabled: module.disabled,
        })
      }
      setModules(tempModules);
    }
  }, [courseModules])

  return (
    <div>
      <EditModuleModal
        open={editModuleModalOpen}
        setOpen={setEditModuleModalOpen}
        id={idToEdit}
        modules={modules}
        data={courseData[course].assignmentData}
      />
      <DeleteModuleModal
        open={deleteModuleModalOpen}
        setOpen={setDeleteModuleModalOpen}
        id={idToDelete}
        data={courseData[course].assignmentData}
      />
      <AddModuleModal 
        open={addModuleModalOpen} 
        setOpen={setAddModuleModalOpen} 
        data={courseData[course].assignmentData}
      />
      {modules.map((module) => (
        <Module
          name={module.name} 
          disabled={module.disabled}
          course={course} 
          setIdToEdit={setIdToEdit} 
          setIdToDelete={setIdToDelete}
          setEditModuleModalOpen={setEditModuleModalOpen} 
          setDeleteModuleModalOpen={setDeleteModuleModalOpen}
        />
      ))}
      <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setAddModuleModalOpen(true)}
          className="mt-4 w-full text-center bg-green-300 hover:bg-green-400 rounded-md flex justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 p-2 hover:by-cyan-700"
        >
          <div className="flex ">
            <div className="flex-shrink-0">
              <PlusCircleIcon className="ml-3 h-5 w-5 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-3 mr-7">
              <h3 className="text-sm text-green-800 font-semibold">Add module</h3>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}