import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import courseData from '../../data/launch/courseData';
import { XIcon } from '@heroicons/react/outline';
import {
  CheckIcon,
  ChevronDoubleRightIcon,
  ExclamationIcon
} from '@heroicons/react/solid';
import { database } from '../../firebase';
import printError from '../../utility/printError';
import GetDate from '../../utility/date';

const eventTypes = {
  notstarted: { icon: XIcon, bgColorClass: 'bg-red-400' },
  complete: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  progress: { icon: ChevronDoubleRightIcon, bgColorClass: 'bg-yellow-400' }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Timeline() {
  const { course } = useParams();
  const { module } = useParams();
  const history = useHistory();
  const { currentUser } = useAuth();
  const [timeline, setTimeline] = useState([]);

  function Refresh(event, id) {
    event.preventDefault();
    history.push(`/homework/${course}/${module}/${id}`);
    history.go(0);
  }

  async function getTimeline() {
    try {
      const tempModule = await courseData[course].assignmentData
        .doc(module)
        .collection('assignments')
        .get();
      const userModule = await database.users
        .doc(currentUser.email)
        .collection('courses')
        .doc(course)
        .collection('modules')
        .doc(module)
        .collection('assignments')
        .get();
      let tempTimeline = [];
      for (let i = 0; i < userModule.docs.length; i++) {
        let completed = 0;
        for (const question of userModule.docs[i].data().questions) {
          if (question.submissions < 2 || question.submissions === 99) {
            completed += 1;
          }
        }
        tempTimeline.push({
          id: userModule.docs[i].id,
          type:
            completed === 0
              ? eventTypes.notstarted
              : completed === userModule.docs[i].data().questions.length
              ? eventTypes.complete
              : eventTypes.progress,
          href: `/homework/${course}/${module}/${userModule.docs[i].id}`,
          content:
            completed === 0
              ? 'Not Started'
              : completed === userModule.docs[i].data().questions.length
              ? 'Complete'
              : 'In Progress',
          name: tempModule.docs[i].data().name,
          disabled: tempModule.docs[i].data().disabled,
          date: GetDate(tempModule.docs[i].data().due),
          datetime: tempModule.docs[i].data().due
        });
      }
      tempTimeline.sort((t1, t2) => (t1.due < t2.due ? -1 : 1));
      setTimeline(tempTimeline);
    } catch (err) {
      printError(err);
    }
  }

  useEffect(() => {
    getTimeline();
    // eslint-disable-next-line
  }, []);

  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-1 lg:col-span-1"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Assignment Timeline
        </h2>
        <div className="rounded-md bg-yellow-50 p-4 mt-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Due dates are optional
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  The following due dates are recommended, but not mandatory.
                  This is a self-paced course.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {timeline.map((item, itemIdx) => (
              <li key={item.id}>
                <div className="relative pb-8">
                  {itemIdx !== timeline.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  {item.disabled === true ? (
                    <p className="text-left relative flex space-x-3">
                      <div>
                        <p
                          className={classNames(
                            item.type.bgColorClass,
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          <item.type.icon
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="mb-3 text-sm text-gray-500">
                            {item.content}
                            {' - '}
                            <span className="text-left font-medium text-gray-900 hover:text-gray-500">
                              {item.name}
                            </span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={item.datetime}>{item.date}</time>
                        </div>
                      </div>
                    </p>
                  ) : (
                    <button
                      onClick={(event) => {
                        Refresh(event, item.id);
                      }}
                      className="unfocus text-left relative flex space-x-3"
                    >
                      <div>
                        <p
                          className={classNames(
                            item.type.bgColorClass,
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          <item.type.icon
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="mb-3 text-sm text-gray-500">
                            {item.content}
                            {' - '}
                            <span className="text-left font-medium text-gray-900 hover:text-gray-500">
                              {item.name}
                            </span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={item.datetime}>{item.date}</time>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
