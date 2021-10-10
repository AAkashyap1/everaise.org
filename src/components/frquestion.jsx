import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'

export default function FRQuestion(props) {
  var Latex = require('react-latex');
  const [visible, setVisible] = useState(false)

  function updateVisibility(event) {
    event.preventDefault()
    setVisible(!visible)
  }

  let solution = null 

  if (props.course === 'physics') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
  } else if (props.course === 'math') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
  } else if (props.course === 'biology') {
    solution = <Latex>{props.soution}</Latex>
  } else if (props.course === 'astronomy') {
    solution = <img src={props.solution} alt="" className="w-full rounded-md"/>
  }

  return (
    <div>
      <span className="mt-4 relative z-0 inline-flex rounded-md">
        <button
          onClick={updateVisibility}
          className="ml-px relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {visible ? 'Hide Solution' : 'View Solution'}
        </button>
      </span>
      {visible && <div className="mt-4 rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          </div>
          <div className="ml-3 mr-7">
            <h3 className="text-sm text-green-800"><p className={'font-semibold mb-2'}>Solution: </p> {solution}</h3>
          </div>
        </div>
      </div>
      }
    </div>
  )
}