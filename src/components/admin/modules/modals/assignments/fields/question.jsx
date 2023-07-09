import { XCircleIcon } from '@heroicons/react/solid';
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const types = [
  { id: 'MC', name: 'Multiple Choice' },
  { id: 'SA', name: 'Short Answer' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Question(props) {
  const [error, setError] = useState('');
  const [type, setType] = useState(types[0]);

  useEffect(() => {
    if (props.assignment.questions[props.index].type) {
      setType(
        props.assignment.questions[props.index].type === 'MC'
          ? types[0]
          : types[1]
      );
    }
  }, [props]);

  useEffect(() => {
    if (props.assignment.questions[props.index].type === 'MC') {
      if (
        !['A', 'B', 'C', 'D', 'E'].includes(
          props.assignment.questions[props.index].answer
        )
      ) {
        setError('MC questions must have an answer of A, B, C, D, or E');
      } else {
        setError('');
      }
    } else if (props.assignment.questions[props.index].type === 'SA') {
      if (isNaN(props.assignment.questions[props.index].answer)) {
        setError('SA questions must have a number for an answer');
      } else {
        setError('');
      }
    }
  }, [props]);

  useEffect(() => {
    props.setError(error !== '');
  }, [error, props]);

  function updateDisplayNo(e, no) {
    e.preventDefault();
    let tempQuestions = props.assignment.questions;
    tempQuestions[props.index].displayNo = no;
    props.setAssignment({ ...props.assignment, questions: tempQuestions });
  }

  function updateType(e) {
    setType(e.id === 'MC' ? types[0] : types[1]);
    let tempQuestions = props.assignment.questions;
    tempQuestions[props.index].type = e.id;
    props.setAssignment({ ...props.assignment, questions: tempQuestions });
  }

  function updateAnswer(e, answer) {
    e.preventDefault();
    let tempQuestions = props.assignment.questions;
    tempQuestions[props.index].answer = answer;
    props.setAssignment({ ...props.assignment, questions: tempQuestions });
  }

  function updatePoints(e, pts) {
    e.preventDefault();
    let tempQuestions = props.assignment.questions;
    tempQuestions[props.index].points = pts;
    props.setAssignment({ ...props.assignment, questions: tempQuestions });
  }

  function updateQuestion(e, question) {
    e.preventDefault();
    let tempQuestions = props.assignment.questions;
    tempQuestions[props.index].question = question;
    props.setAssignment({ ...props.assignment, questions: tempQuestions });
  }

  function updateSolution(e, solution) {
    e.preventDefault();
    let tempQuestions = props.assignment.questions;
    tempQuestions[props.index].solution = solution;
    props.setAssignment({ ...props.assignment, questions: tempQuestions });
  }

  return (
    <div
      className={
        'border-l-2 border-gray-300 pl-3 ml-1' +
        (props.index === 0 ? ' mt-3' : ' mt-4')
      }
    >
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <input
            required
            value={props.question.displayNo}
            onChange={(e) => updateDisplayNo(e, e.target.value)}
            placeholder="Enter number (i.e. 1 or 1a)"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-1">
          <Listbox value={type} onChange={updateType}>
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{type.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-sm max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {types.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'font-bold' : '',
                              'cursor-default select-none relative py-2 pl-3 pr-9'
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate'
                                )}
                              >
                                {option.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'font-bold' : '',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="col-span-1">
          <input
            required
            value={props.question.answer}
            onChange={(e) => updateAnswer(e, e.target.value)}
            placeholder="Enter answer"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-1">
          <input
            required
            min={0}
            type="number"
            value={props.question.points}
            onChange={(e) => updatePoints(e, parseInt(e.target.value))}
            placeholder="Enter point value"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-2">
          <input
            required
            value={props.question.question}
            onChange={(e) => updateQuestion(e, e.target.value)}
            placeholder="Enter question (image link or text / latex)"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-2">
          <input
            required
            value={props.question.solution}
            onChange={(e) => updateSolution(e, e.target.value)}
            placeholder="Enter solution (image link or text / latex)"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {error && (
        <div className="mt-3 rounded-md bg-red-50 px-3 py-2.5">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 mr-7">
              <h3 className="text-sm text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
