import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { database } from '../firebase';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const faqs = [
  {
    question: "Am I eligible to participate?",
    answer:
      "If you are in the discord server and are enrolled in the program, then yes!",
  },
  {
    question: "How much does it cost to sign up?",
    answer:
      "The Estimathon is a free event.",
  },
]

const contests = [
  {
    date: 'August 6, 2021',
    time: '11 AM ET',
    location: 'Discord Server',
    status: 'Ended',
  },
]

export default function Estimathon() {
  const [scoring, setScoring] = useState('')
  const Latex = require('react-latex')
  useEffect(() => {
    document.title = 'Estimathon - Everaise Academy'
  })

  function GetScoring() {
    database.latex.doc("default").get().then((doc) => {
      setScoring(doc.data().Latex);
    })

    return scoring
  }

  return (
    <div>
      <Nav />
      <div className="bg-white">
        <div className="mb-12 mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Estimathon</h2>
              <p className="text-xl text-gray-500">
              Win prizes by combining trivia, game theory, and STEM knowledge to cool estimation problems!
              </p>
            </div>
            <ul className="flex jusify-center space-y-4 grid">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Details</h2>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="border border-gray-100 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Time
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Location
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Link</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {contests.map((contest) => (
                            <tr key={contest.email}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{contest.date}</div>
                                <div className="text-sm text-gray-500">{contest.time}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contest.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  {contest.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a target="_blank" rel="noreferrer" href="https://discord.com/invite/JE5TaCrrFn" className="text-indigo-600 hover:text-indigo-900">
                                  Link
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
            <ul className="flex jusify-center space-y-4 grid">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Rules</h2>
              <div className="border border-gray-200 bg-white overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:gap-4 sm:px-6">
                      <dt className="text-base font-normal text-gray-700">1. This is an individual competition. 
                      You will have 30 minutes to complete 13 estimation problems. The answer to each 
                      problem is a positive number. You will submit intervals with positive integer 
                      endpoints for each problem. (If this is your first estimathon, this submission format
                      may be new to you!)</dt>
                    </div>
                    <div className="py-4 sm:py-5 sm:gap-4 sm:px-6">
                      <dt className="text-base font-normal text-gray-700">2. You are allowed 18 submissions in 
                      total for the 13 problems. Thus, you may submit multiple times for the same problem; 
                      only the last (not necessarily best) submission counts. The Google Form link will be 
                      made available at the beginning of the competition.</dt>
                    </div>
                    <div className="py-4 sm:py-5 sm:gap-4 sm:px-6">
                      <dt className="text-base font-normal text-gray-700">3. You may not use the Internet, a calculator, 
                      or any other type of external reference material to solve these problems.</dt>
                    </div>
                  </dl>
                </div>
              </div>
            </ul>
            <ul className="flex jusify-center space-y-4 grid">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Scoring</h2>
              <div className="border border-gray-200 bg-white overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:gap-4 sm:px-6">
                      <dt className="text-base font-normal text-gray-700">
                        <Latex>
                          {GetScoring()}
                        </Latex>
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>
            </ul>
            <ul className="space-y-4 grid">
              <div className="bg-white">
                <div className="max-w-7xl mx-auto ">
                  <div className="mx-auto divide-y-2 divide-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900">FAQs</h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                      {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                          {({ open }) => (
                            <>
                              <dt className="text-lg">
                                <Disclosure.Button className="unfocus text-left w-full flex justify-between items-start text-gray-400">
                                  <span className="font-normal text-gray-700">{faq.question}</span>
                                  <span className="ml-6 h-7 flex items-center">
                                    <ChevronDownIcon
                                      className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Disclosure.Button>
                              </dt>
                              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                <p className="text-base text-gray-500">{faq.answer}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}