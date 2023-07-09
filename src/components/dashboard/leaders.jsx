import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../firebase';
import printError from '../../utility/printError';
import { UserIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';

const indices = {
  physics: 0,
  biology: 1,
  astronomy: 2,
  math: 3
};

export default function Leaders() {
  const { course } = useParams();
  const [leaders, setLeaders] = useState([]);

  async function getPoints(id) {
    let tempPoints = await database.users
      .doc(id)
      .collection('courses')
      .doc(course)
      .get();
    return tempPoints.data().points;
  }

  async function getLeaders() {
    try {
      const users = await database.users.get();
      let tempUsers = [];
      for (const user of users.docs) {
        if (user.data().courses[indices[course]].enrolled) {
          const points = await getPoints(user.id);
          tempUsers.push({
            first_name: user.data().first_name,
            last_name: user.data().last_name,
            points: points
          });
        }
      }
      tempUsers.sort((u1, u2) => (u1.points < u2.points ? 1 : -1));
      let tempLeaders = [];
      for (let i = 0; i < Math.min(10, tempUsers.length); i++) {
        tempLeaders.push({
          name: tempUsers[i].first_name + ' ' + tempUsers[i].last_name,
          points: tempUsers[i].points
        });
      }
      setLeaders(tempLeaders);
    } catch (err) {
      console.log(err);
      printError(err);
    }
  }

  useEffect(() => {
    getLeaders();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Leaderboard
      </h2>

      <div className="shadow sm:hidden">
        <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          {leaders.map((leader) => (
            <li key={leader.points}>
              <p className="block px-4 py-4 bg-white hover:bg-gray-50">
                <span className="flex items-center space-x-4">
                  <span className="flex-1 flex space-x-2 truncate">
                    <UserIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col text-gray-900 text-sm truncate">
                      <span className="truncate">{leader.name}</span>
                      <span>
                        <span className="text-gray-900 font-medium">
                          {leader.points}
                        </span>{' '}
                      </span>
                      <span>{leader.date}</span>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaders.length === 0
                    ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(
                        (leader) => (
                          <tr key={leader} className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <p className="group inline-flex space-x-2 truncate text-sm">
                                  <UserIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="rounded-md w-1/2 h-4 bg-gray-200 truncate text-gray-200 animate-pulse">
                                    Ananth Kashyap / Ananth Kashyap
                                  </span>
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-200 bg-gray-200 rounded-md w-full h-4 animate-pulse">
                                250
                              </span>
                            </td>
                          </tr>
                        )
                      )
                    : leaders.map((leader) => (
                        <tr key={leader.points} className="bg-white">
                          <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex">
                              <p className="group inline-flex space-x-2 truncate text-sm">
                                <UserIcon
                                  className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="text-gray-900 truncate group-hover:text-gray-400">
                                  {leader.name}
                                </span>
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">
                              {leader.points}{' '}
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
