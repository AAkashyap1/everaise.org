import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilIcon, XIcon } from '@heroicons/react/solid'
import { database } from '../../../../firebase'

export default function EditModal(props) {
  const [announcement, setAnnouncement] = useState({
    title: '',
    body: '',
    author: {
      imageUrl: '',
      name: ''
    }
  });

  useEffect(() => {
    if (props.announcements && props.id) {
      for (let i = 0; i < props.announcements.length; i++) {
        if (props.announcements[i].id === props.id) {;
          setAnnouncement({
            title: props.announcements[i].title,
            body: props.announcements[i].body,
            author: {
              imageUrl: props.announcements[i].author.imageUrl,
              name: props.announcements[i].author.name
            }
          });
        }
      }
    }
  }, [props.announcements, props.id])

  function savePost(e) {
    e.preventDefault();
    database.announcements.doc(props.id).update({
      title: announcement.title,
      body: announcement.body,
      author: {
        imageUrl: announcement.author.imageUrl,
        name: announcement.author.name
      },
    }).then(() => {
      console.log('Assignment succesfully edited!')
      props.setOpen(false)
    })
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => props.setOpen(!props.open)}>
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
                    Edit announcement
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You must hit the save button for any edits to be saved. All unsaved work will be lost!
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-6 grid grid-cols-2 gap-6" onSubmit={savePost} method="POST">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                    Author Profile Image
                  </label>
                  <input
                    value={announcement.author.imageUrl}
                    onChange={e => setAnnouncement({...announcement, author: {...announcement.author, imageUrl: e.target.value}})}
                    type="url"
                    name="url"
                    id="url"
                    placeholder="Enter link to profile picture"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                    Author Name{'*'}
                  </label>
                  <input
                    required
                    value={announcement.author.name}
                    onChange={e => setAnnouncement({...announcement, author: {...announcement.author, name: e.target.value}})}
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Enter name of author"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                    Title{'*'}
                  </label>
                  <input
                    required
                    value={announcement.title}
                    onChange={e => setAnnouncement({...announcement, title: e.target.value})}
                    type="title"
                    name="title"
                    id="title"
                    placeholder="Enter title of announcement"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="question_id" className="block text-sm font-medium text-gray-700">
                    Announcement{'*'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={announcement.body}
                    onChange={e => setAnnouncement({...announcement, body: e.target.value})}
                    type="announcement"
                    name="announcement"
                    id="announcement"
                    placeholder="Enter the announcement"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="col-span-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Save announcement
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}