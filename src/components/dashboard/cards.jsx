import { useState, useEffect } from 'react'
import { database } from '../../firebase'
import printError from '../../utility/printError'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import {
  ChartSquareBarIcon,
} from '@heroicons/react/outline'
import {
  FireIcon,
} from '@heroicons/react/solid'

const indices = {
  'physics': 0,
  'biology': 1,
  'astronomy': 2,
  'math': 3,
}

export default function Cards() {
  const { course } = useParams()
  const { currentUser } = useAuth()
  const [cards, setCards] = useState([]);

  async function getPoints(id) {
    let tempPoints = await database.users.doc(id).collection('courses').doc(course).get();
    return (tempPoints.data().points);
  }
  
  async function getCards() {
    try {
      const points = await database.users.doc(currentUser.email).collection('courses').doc(course).get();
      const users = await database.users.get();
      let rank = 1;
      let total = 0;
      for (const user of users.docs) {
        if (user.data().courses[indices[course]].enrolled) {
          total += 1;
          const result = await getPoints(user.id);
          if (user.id !== currentUser.email && result > points.data().points) {
            rank += 1;
          }
        }
      }
      setCards(
        [
          {
            name: 'Points', 
            icon: FireIcon,
            amount: points.data().points
          },
          {
            name: 'Rank', 
            icon: ChartSquareBarIcon,
            amount: rank + '/' + total
          },
        ]
      )
    } catch (err) {
      printError(err);
    }
  }

  useEffect(() => {
    getCards();
    // eslint-disable-next-line
  }, []);


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.length === 0 &&
          ['1', '2'].map((card) => (
            <div key={card} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl className="space-y-1.5">
                      <dt className="text-sm rounded-md text-gray-200 bg-gray-200 w-1/2 h-4 animate-pulse">Points</dt>
                      <dd>
                        <div className="text-sm rounded-md text-gray-200 bg-gray-200 animate-pulse">1/333</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        {cards.length > 0 && 
          cards.map((card) => (
            <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}