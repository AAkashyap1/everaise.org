import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'  
import EvCirc from '../images/evcirc.png'
import Latex from 'react-latex'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

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
    name: 'Everaise Academy',
    date: 'August 6, 2021',
    time: '11 AM ET',
    location: 'Discord Server',
    email: 'info@everaise.org',
    image: EvCirc,
    status: 'Ended',
  },
]

const speakers = [
  {
    name: 'Sameer Rajesh',
    roles: ['Junior @ UC Berkeley'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/unnamed-9-1.png',
    title: 'Itsy Bitsy Origami',
    description: 
      `Beginning with a brief discussion and survey of the introduction of concepts from physics 
      to the study of biology, we will make our way through understanding the protein folding problem 
      and looking at recent advances, culminating in the recent release of AlphaFold as an efficient 
      protein structure prediction algorithm. Topics include biophysics, modeling, and computational 
      methods in biology.`,
    background: 
      `Sameer Rajesh is a rising junior at UC Berkeley studying Molecular and Cell Biology. Sameer’s 
      interests lie in biophysics and biophysical chemistry, and he uses tools from these fields to 
      help build physical models for biological phenomena. When not hunched over his bench, he’s usually 
      hanging out with friends, watching TV, and, as of recently, dabbling in writing.`,
    link: 'https://www.youtube.com/watch?v=L53MnG4uOlo',
  },
  {
    name: 'CJ Quines',
    roles: ['Junior @ MIT'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/2020/05/received_595203618020746.jpeg',
    title: 'Type Theory',
    description: 
      `What are types, how are they related to proofs, and how do computers use them to automatically 
      check proofs?`,
    background: 
      `CJ Quines is a rising junior at the Massachusetts Institute of Technology, studying math and 
      computer science. He represented the Philippines at the IOI and at the APMO, where he won a bronze 
      medal and participated in their IMO training camps; additionally, he and his partner won second 
      prize for their mathematics project at Intel ISEF. Currently, he helps run the Philippines’ training 
      camps for the IOI and IMO. In his free time, CJ enjoys writing, talking to friends, and giving and 
      receiving hugs.`,
    link: 'https://www.youtube.com/watch?v=bnbOlnRa5rM&pp=sAQA',
  },
  {
    name: 'Dr. Chong Hon Yew',
    roles: ['President @ Astronomical Society of Penang'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/Photo-1.jpg',
    title: 'Hubble is great; what will James Webb will tell us?',
    description: 
      `Since its launch in 1990, the Hubble Space Telescope has not ceased to amaze astronomers and 
      astronomy enthusiasts around the world with its amazing images of astronomical objects, ranging 
      from the Earth and nearby stars to the edge of the observable universe. The James Webb Space 
      Telescope, to be launched in late 2021, will explore even further into the universe and discover 
      unimaginable astronomical objects and astrophysical phenomena. What could these include, and how 
      are they practical today?`,
    background: 
      `Dr. Chong Hon Yew is the president of the Astronomical Society of Penang, Malaysia. Dr. Chong 
      received his Ph.D. in Low-Temperature Physics from the University of Grenoble, France in 1979 and 
      later became a lecturer in physics at the University of Science, Malaysia. As an advisor to the 
      university’s astronomy club, he has promoted a variety of astronomy activities in schools, colleges, 
      government departments, multinational companies, and large shopping complexes.`,
    link: 'https://youtu.be/KRKYn1Eyp7E',
  },
  {
    name: 'Professor Michael Sipser',
    roles: ['Professor @ MIT'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/2020/05/sipser2.jpg',
    title: 'P vs NP',
    description: 
      ``,
    background: 
      `Professor Sipser is a theoretical computer scientist at MIT. He is the Donner Professor of 
      Mathematics, a member of CSAIL, and currently the Dean of Science at MIT. His distinctions include 
      the MIT Graduate Student Council Teaching Award, 1984, 1989 & 1991, the MIT School of Science 
      Student Advising Award, 2003, the U.C. Berkeley Distinguished Alumni Award, 2015.`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
  },
  {
    name: 'Professor Scott Sheffield',
    roles: ['Professor @ MIT'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/photo.jpg',
    title: 'Martingales and the Optional Stopping Theorem',
    description: 
      ``,
    background: 
      `Professor Scott Sheffield is a professor of mathematics at MIT. Sheffield is a probability 
      theorist, working on geometrical questions that arise in such areas as statistical physics, game 
      theory, and metric spaces, as well as long-standing problems in percolation theory. Sheffield 
      graduated from Harvard University in 1998 with an A.B. and A.M. in mathematics, and in 2003, 
      received his Ph.D. in mathematics from Stanford University. Before becoming a professor at MIT,
      Sheffield held postdoctoral positions at Microsoft Research, the University of California at 
      Berkeley, and the Institute for Advanced Study.`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
  },
  {
    name: 'Simon Rubinstein-Salzedo',
    roles: ['Founder @ Euler Math Circle'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/unnamed.jpg',
    title: 'Division points of hypocycloids',
    description: 
      ``,
    background: 
      `Simon Rubinstein-Salzedo received his Ph.D. in mathematics from Stanford University in 2012. 
      Afterward, he taught at Dartmouth College and Stanford University. In 2015, he founded Euler 
      Circle, a mathematics institute in the San Francisco Bay Area, dedicated to teaching college-level 
      mathematics classes to advanced high-school students, as well as mentoring them in mathematics 
      research. His research interests include number theory, algebraic geometry, combinatorics,
      probability, and game theory. He is also the namesake of SFFT (Simon’s Favorite Factoring Trick).`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
  },
  {
    name: 'D. Branch Moody, MD',
    roles: ['Professor of Medicine @ Harvard Medical School'],
    imageUrl:
      'https://everaise.org/wp-content/uploads/moody_pic.jpg',
    title: 'TBA',
    description: 
      ``,
    background: 
      `Branch Moody is a Physician at Brigham and Women’s Hospital and a Professor of Medicine at Harvard 
      Medical School. He earned his MD at The Johns Hopkins University School of Medicine in 2002. His 
      lab focuses on the natural interactions of human Dendritic cells and T cells and uses human systems 
      to study the roles of CD1 proteins, Toll-like receptors and lipid antigens in T cell responses to 
      tuberculosis, HIV, and autoimmune diseases.`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
  },
]

export default function Estimathon() {
  useEffect(() => {
    document.title = 'Events - Everaise Academy'
  })

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
                              Host
                            </th>
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
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={contest.image} alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{contest.name}</div>
                                    <div className="text-sm text-gray-500">{contest.email}</div>
                                  </div>
                                </div>
                              </td>
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
                          {`An interval you submit, $[\mathrm{min}, \mathrm{max}]$, where min and max are positive integers, is called good if it contains the correct answer to the problem. Your score is given by:
                          $$\left( 10 + \sum_{\text{good intervals}}\left\lfloor \frac{\mathrm{max}}{\mathrm{min}} \right\rfloor \right) \cdot 2 ^{13 - (\#\text{ of good intervals})}$$
                          Thus, wider intervals increase your score, and incorrect/blank intervals double your score. The lowest score wins.
                          `}
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
                                <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
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