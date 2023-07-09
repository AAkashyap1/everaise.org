import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { database } from '../../../firebase';
import {
  useCollectionData,
  useCollection
} from 'react-firebase-hooks/firestore';
import ConfirmationModal from './modals/confirmation';
import EditModal from './modals/edit';
import CreateModal from './modals/create';
import GetDate from '../../../utility/date';
import {
  DotsVerticalIcon,
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  UserCircleIcon
} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const announcementCollectionData = useCollectionData(
    database.announcements.orderBy('date', 'desc')
  )[0];
  const announcementCollection = useCollection(
    database.announcements.orderBy('date', 'desc')
  )[0];
  const [idToEdit, setIdToEdit] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    if (announcementCollection && announcementCollectionData) {
      const docs = announcementCollection.docs;
      let tempAnnouncements = [];
      for (
        let i = 0;
        i < Math.min(docs.length, announcementCollectionData.length);
        i++
      ) {
        let announcement = announcementCollectionData[i];
        tempAnnouncements.push({
          id: docs[i].id,
          title: announcement.title,
          date: GetDate(announcement.date),
          datetime: announcement.date,
          body: announcement.body,
          author: announcement.author
        });
      }
      setAnnouncements(tempAnnouncements);
    }
  }, [announcementCollectionData, announcementCollection]);

  function confirmDeletion(e, id) {
    e.preventDefault();
    setIdToEdit(id);
    setConfirmationModalOpen(true);
  }

  function editPost(e, id) {
    e.preventDefault();
    setIdToEdit(id);
    setEditModalOpen(true);
  }

  function createPost(e) {
    e.preventDefault();
    setCreateModalOpen(true);
  }

  return (
    <div>
      <ConfirmationModal
        id={idToEdit}
        open={confirmationModalOpen}
        setOpen={setConfirmationModalOpen}
      />
      <EditModal
        announcements={announcements}
        id={idToEdit}
        open={editModalOpen}
        setOpen={setEditModalOpen}
      />
      <CreateModal open={createModalOpen} setOpen={setCreateModalOpen} />
      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Edit Announcements
      </h2>

      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8">
          <main className="mt-2">
            <ul className="space-y-4">
              {announcements.map((announcement) => (
                <li
                  key={announcement.id}
                  className="bg-white px-4 py-6 shadow sm:p-6 rounded-lg"
                >
                  <article
                    aria-labelledby={'announcement-title-' + announcement.id}
                  >
                    <div>
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <a
                            href={announcement.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {announcement.author.imageUrl ? (
                              <img
                                className="h-10 w-10 rounded-full"
                                src={announcement.author.imageUrl}
                                alt=""
                              />
                            ) : (
                              <UserCircleIcon className="text-yellow-400 h-10 w-10 rounded-full" />
                            )}
                          </a>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            <a
                              href={announcement.href}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {announcement.author.name}
                            </a>
                          </p>
                          <p className="text-sm text-gray-500">
                            <p className="hover:underline">
                              <time dateTime={announcement.datetime}>
                                {announcement.date}
                              </time>
                            </p>
                          </p>
                        </div>
                        <div className="flex-shrink-0 self-center flex">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Open options</span>
                                <DotsVerticalIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={(e) =>
                                          confirmDeletion(e, announcement.id)
                                        }
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'w-full flex px-4 py-2 text-sm'
                                        )}
                                      >
                                        <TrashIcon
                                          className="mr-3 h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span>Delete post</span>
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={(e) =>
                                          editPost(e, announcement.id)
                                        }
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'w-full flex px-4 py-2 text-sm'
                                        )}
                                      >
                                        <PencilIcon
                                          className="mr-3 h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span>Edit post</span>
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <h2
                        id={'announcement-title-' + announcement.id}
                        className="mt-4 text-base font-medium text-gray-900"
                      >
                        {announcement.title}
                      </h2>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      {announcement.body}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </main>
          <button
            onClick={createPost}
            className="mt-4 w-full text-center bg-green-300 hover:bg-green-400 rounded-md flex justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 p-2 hover:by-cyan-700"
          >
            <div className="flex ">
              <div className="flex-shrink-0">
                <PlusCircleIcon
                  className="ml-3 h-5 w-5 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 mr-7">
                <h3 className="text-sm text-green-800 font-semibold">
                  Add announcement
                </h3>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
