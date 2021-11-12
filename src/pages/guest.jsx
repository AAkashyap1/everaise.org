import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'  
import { Link } from 'react-router-dom'

import Moody from '../images/speakers/Moody.png'
import Quines from '../images/speakers/Quines.png'
import Rajesh from '../images/speakers/Rajesh.png'
import Salzedo from '../images/speakers/Salzedo.png'
import Scheffield from '../images/speakers/Scheffield.png'
import Sipser from '../images/speakers/Sipser.png'
import Yew from '../images/speakers/Yew.png'


const speakers = [
  {
    name: 'Sameer Rajesh',
    roles: ['Junior @ UC Berkeley'],
    imageUrl:
      Rajesh,
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
      Quines,
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
      Yew,
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
      Sipser,
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
    name: 'Professor Scott Scheffield',
    roles: ['Professor @ MIT'],
    imageUrl:
      Scheffield,
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
      Salzedo,
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
      Moody,
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

export default function Guest() {

  useEffect(() => {
    document.title = 'Guest Speakers - Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div>
      <Nav />
      <div className="bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Guest Speakers</h2>
              <p className="text-xl text-gray-500">
              Everaise Academy invites professors from prestigious universities, industry professionals, and top 
              graduate and undergraduate students to give free talks to the public.
              </p>
            </div>
            <ul className="flex jusify-center space-y-4 grid">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Future Speakers</h2>
              <p className="text-xl text-gray-500">
                All of our guest lectures are conducted via video conferencing software, such as Google Meet. In the 
                case that our meetings reach their maximum capacity, our guest lectures are also live streamed on our{' '}
                <a target="_blank" rel="noreferrer"  href="https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw"><span className="text-indigo-500">YouTube channel</span></a>{' '} 
                Note that talk dates, times, titles, and descriptions may be subject to change up to one week before the talk.
              </p>
              <p className="text-xl text-gray-500">
                Want to receive notifications for our upcoming guest speakers?{' '}
                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw"><span className="text-indigo-500">Subscribe to our YouTube channel</span></a>!{' '}
                Interested in giving a talk?{' '}
                <Link to="/contact"><span className="text-indigo-500">Contact Us!</span></Link> 
              </p>
            </ul>
            <ul className="flex jusify-center space-y-4 grid">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Past Speakers</h2>
              {speakers.map((person) => (
                <li key={person.name} className="py-10 border border-gray-200 shadow-lg text-left rounded-lg grid grid-cols-1 md:grid-cols-3">
                  <div className="space-y-6 xl:space-y-10 mb-3 sm:mb-0">
                    <div className="flex justify-center">
                      <img className="object-cover mx-auto h-56 w-56 rounded-full" src={person.imageUrl} alt="" />
                    </div>
                    <div className="space-y-2 flex justify-center">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="flex text-xl font-semibold -mt-3 sm:-mt-2 md:-mt-2 lg:-mt-2 xl:-mt-6 mb-2 justify-center text-gray-900">{person.name}</h3>
                        <div className="flex justify-center">
                          {person.roles.map(role => {
                            return (
                              <span
                                className={person.roles.indexOf(role) === person.roles.length - 1 ? 
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 bg-gray-300 text-sm font-normal text-gray-900" :
                                  "mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 bg-gray-300 text-sm font-normal text-gray-900"
                                }
                                key={role}
                              >
                                {role}
                              </span>
                            )
                          })}
                        </div>
                        <div className="flex justify-center">
                          <a href={person.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 hover:text-indigo-700 trans-300 text-indigo-500">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube fa-w-18 h-4 w-4 mr-2" 
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                            </svg> View Talk
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 md:pl-4 lg:pl-0 md:pr-16 col-span-2">
                    <div className="text-gray-900 mt-4 font-semibold text-2xl text-italic">
                      {person.title}
                    </div>
                    <div className="text-gray-900 mt-4 font-medium text-lg">
                      <div className="font-normal text-base text-gray-700 italic">{person.description}</div>
                    </div>
                    <div className="text-gray-900 mt-4 font-medium text-lg">
                        <div className="font-normal text-base text-gray-700">{person.background}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}