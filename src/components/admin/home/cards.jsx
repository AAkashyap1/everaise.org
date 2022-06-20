import { Link } from 'react-router-dom'
import {
  CalculatorIcon,
  FingerPrintIcon,
} from '@heroicons/react/outline'
import {
  GlobeIcon,
  VariableIcon,
} from '@heroicons/react/solid'
import courses from '../../../data/course/courses'

export default function Cards() {

  const cards = [
    ({ name: 'Physics Mechanics', to: 'physics', icon: CalculatorIcon }),
    ({ name: 'Biology', to: 'biology', icon: FingerPrintIcon }),
    ({ name: 'Astronomy', to: 'astronomy', icon: GlobeIcon }),
    ({ name: 'Math Competitions I', to: 'math', icon: VariableIcon }),
  ]

  return (
    <div className="mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Available Courses</h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.param} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon className="rounded-full h-10 w-10 p-2 bg-yellow-500 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-base font-medium text-gray-900 truncate">{card.name}</dt>
                      <dd>
                        <div className="text-sm font-medium text-gray-600">{courses[card.to].dates}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to={ `/admin/dashboard/${card.to}`} className="font-medium text-cyan-700 hover:text-cyan-900">
                    View Dashboard &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}