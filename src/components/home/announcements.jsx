import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GetDate from '../../utility/date';
import { UserCircleIcon } from '@heroicons/react/solid';

export default function HomeAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const announcementCollectionData = useCollectionData(
    database.announcements.orderBy('date', 'desc')
  )[0];

  useEffect(() => {
    if (announcementCollectionData) {
      let tempAnnouncements = [];
      for (const announcement of announcementCollectionData) {
        tempAnnouncements.push({
          title: announcement.title,
          date: GetDate(announcement.date),
          datetime: announcement.date,
          body: announcement.body,
          author: announcement.author
        });
      }
      setAnnouncements(tempAnnouncements);
    }
  }, [announcementCollectionData]);

  return (
    <div>
      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Announcements
      </h2>

      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8 lg:gap-8">
          <main className="mt-2 col-span-1 lg:col-span-9 xl:col-span-6">
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
        </div>
      </div>
    </div>
  );
}
