import { useEffect } from 'react'
// import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { LightBulbIcon, LockOpenIcon, SearchCircleIcon } from '@heroicons/react/outline'
import PhysicsCalc from '../images/physics.jpg'
import Board from '../images/index.png'
import { core, staff } from './team'
import CountUpOnce from '../utility/count'
import Carousel from 'react-elastic-carousel'

import JaneStreet from '../images/sponsors/JaneStreet.png'
import AoPS from '../images/sponsors/AoPS.png'
import Wolfram from '../images/sponsors/Wolfram.png'
import Maple from '../images/sponsors/Maple.png'
import Biolympiads from '../images/sponsors/Biolympiads.png'

import Moody from '../images/speakers/Moody.png'
import Quines from '../images/speakers/Quines.png'
import Rajesh from '../images/speakers/Rajesh.png'
import Salzedo from '../images/speakers/Salzedo.png'
import Scheffield from '../images/speakers/Scheffield.png'
import Sipser from '../images/speakers/Sipser.png'
import Yew from '../images/speakers/Yew.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const metrics = [
  { id: 1, end: 1500, suffix: '+', emphasis: 'Students', rest: 'have been inspired through Everaise.' },
  { id: 2, end: core.length + staff.length, suffix: '', emphasis: 'Experienced staff members', rest: 'help contribute to Everiase.' },
  { id: 3, end: 40, suffix: '+', emphasis: 'Countries', rest: 'from around the globe have been impacted by Everaise.' },
]

const people = [
  {
    name: 'Krish Shah',
    course: 'Math Competitions 1 student',
    testimonial: `“The commitment to learning and excellence all for free really stood out. 
      Normally, you would assume people to charge large swaths of money for content 
      of this standard and genre, but the level at which content was presented and 
      the follow-up and help to students was phenomenal and at the same time was 
      free of cost.”`
  },
  {
    name: 'Alex Kaneko',
    course: 'Math Competitions 2 student',
    testimonial: `“Everaise is the same quality of a paid program. It is very 
      organized, and I had lots of fun. I learned more in this one month than I 
      probably did in a year. I would really push you to consider it, the value 
      for your money is, quite literally, infinite! 10^10^10/10 would recommend.”`
  },
  {
    name: 'Aryaan Jena',
    course: 'Math Competitions 2 student',
    testimonial: `“I am not really in a position to afford expensive summer camps, 
      so the idea that I could have a program like this online for free stood out 
      to me, and that’s why I’m really thankful to Everaise.”`
  },
  {
    name: 'Felix Yew',
    course: 'Physics Mechanics student',
    testimonial: `“Tons of problem solving skills, different aspects and considerations 
      in advanced researches in the Sciences (via guest lectures), having to communicate 
      with avid learners from all over the world and a brand-new respect and appreciation 
      for Physics!”`
  },
  {
    name: 'Sushrit Pasumarthy',
    course: 'Biology student',
    testimonial: `“The best part of the program were learning something new everyday in 
      a well presented manner through the handouts. I loved how the information in the 
      handout was easy to digest so I could understand them better.” `
  },
]

const speakers = [
  {
    name: 'Dr. Chong Hon Yew',
    roles: ['President @ Astronomical Society of Penang'],
    imageUrl:
      Yew,
    title: 'What will James Webb tell us?',
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
    date: 'August 2, 2021'
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
    date: 'July 31, 2021'
  },
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
    date: 'July 28, 2021'
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
    date: 'July 26, 2020'
  },
  {
    name: 'Professor Scott Sheffield',
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
    date: 'July 18, 2020'
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
    date: 'July 18, 2020'
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
    date: 'July 2020'
  },
]

const sponsors = [
  {
    name: "Jane Street",
    image: JaneStreet,
  },
  {
    name: "AoPS",
    image: AoPS,
  },
  {
    name: "Wolfram",
    image: Wolfram,
  },
  {
    name: "Maple",
    image: Maple,
  },
]

const goals = [
  {
    name: 'Inspire',
    description: 'We instill a lifelong love of learning in aspiring scientists, equipping them with relevant, novel material to make change.',
    icon: LightBulbIcon,
  },
  {
    name: 'Unlock',
    description: 'Connect with a global community of avid learners of all backgrounds through free education by high-performing, well-trained instructors.',
    icon: LockOpenIcon,
  },
  {
    name: 'Discover',
    description: 'No more memorization: Develop a deeper understanding through detailed examples and explanations',
    icon: SearchCircleIcon,
  },
]

export default function Landing() {
  useEffect(() => {
    document.title = 'Everaise Academy'
    window.scrollTo(0, 0)
  })

  const bp = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2 },
    { width: 700, itemsToShow: 3 },
    { width: 950, itemsToShow: 4 },
  ]

  function Arrow({ type, onClick, isEdge }) {
    const pointer =
      type === 'PREV' ? (
        <ArrowLeftIcon
          className={`${
            isEdge
              ? 'text-gray-400 cursor-not-allowed'
              : 'cursor-pointer text-gray-900'
          } unfocus block h-8 w-8`}
        />
      ) : (
        <ArrowRightIcon
          className={`${
            isEdge
              ? 'text-gray-400 cursor-not-allowed'
              : 'cursor-pointer text-gray-900'
          } unfocus block h-8 w-8`}
        />
      )
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }

  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="bg-gray-50 z-20">
          <Nav />
          <main className="lg:relative -py-5">
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
              <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">Inspiring Students</span>{' '}
                  <span className="block text-cyan-600 xl:inline">Worldwide</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  By students, for students: Making quality education freely accessible to all. This is the official website for Everaise Academy.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <AnchorLink
                      className="shadow-lg w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:py-4 md:text-lg md:px-10"
                      href="#about"
                      offset="40px"
                    >
                      Learn More
                    </AnchorLink>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link
                      to="/enroll"
                      className="shadow-lg w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Enroll &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-0 lg:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                className="absolute inset-0 w-full h-full object-cover shadow-lg"
                src={Board}
                alt=""
              />
            </div>
          </main>
        </div>
        
        {/* Goals Section */}
        <div className="relative bg-white pt-16 pb-16">
          <div id="about" className="mx-auto max-w-md px-4 text-center max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Our Goals</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              At Everaise, we're committed to building a deeper understanding.
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                  <div key={goal.name} className="pt-6">
                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-by-500 to-cyan-600 rounded-md shadow-lg">
                            <goal.icon className="h-7 w-7 text-indigo-500" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{goal.name}</h3>
                        <p className="mt-5 text-base text-gray-500">{goal.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto pb-12 px-8 sm:px-10 md:pb-16 md:px-12 md:flex md:items-center md:justify-between">
            <h2 className="text-center md:text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block text-cyan-600">View our courses and resources.</span>
            </h2>
            <div className="flex justify-center mt-8 flex md:ml-6 lg:ml-0 md:mt-0 md:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
                >
                  Our courses
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/resources"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-white hover:bg-cyan-50"
                >
                  Our Resources
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div className="relative bg-gray-50">
          <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
            <div className="h-full w-full xl:grid xl:grid-cols-2">
              <div className="h-full xl:relative xl:col-start-2">
                <img
                  className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                  src={PhysicsCalc}
                  alt="Chalkboard"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                />
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
            <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  By the numbers
                </span>
              </h2>
              <p className="mt-3 text-xl font-bold text-gray-900">
              We are a group of 30 or so high school and college students who have been successful in a variety of STEM fields, including math, physics, and biology.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                {metrics.map((item) => (
                  <p key={item.id}>
                    <span className="block text-2xl font-bold text-gray-900">  
                      <CountUpOnce end={item.end} suffix={item.suffix} />
                    </span>
                    <span className="mt-1 block text-base text-gray-700">
                      <span className="font-medium text-gray-9000">{item.emphasis}</span> {item.rest}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Section */}
        <div className="relative bg-white pt-16 pb-4">
          <div className="mx-auto max-w-md px-4 text-center max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Everaise Academy Event</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
                Guest Speakers
            </p>
            <p className="mt-4 text-base text-gray-700 sm:text-lg">
              Every year, Everaise Academy invites professors from prestigious universities, industry professionals, 
              and top graduate and undergraduate students to give free talks.
            </p>
            <p className="mt-8">
              <Link to="/events/guest-speakers" className="py-3 px-5 rounded-md bg-cyan-600 unfocus hover:bg-cyan-700 font-normal text-lg text-white">
                Learn more &rarr;
              </Link>
            </p>
            <div className="mt-8">
              <div>
                <Carousel className="flex justify-center flex-col border-gray-200 py-3 gap-8" breakPoints={bp} pagination={false} renderArrow={Arrow}>
                  {speakers.map((speaker) => (
                    <div key={speaker.name} className="py-6 px-2">
                      <div className="flow-root border border-gray-200 shadow-lg rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full p-1 shadow-lg">
                              <img alt={speaker.name} src={speaker.imageUrl} className="h-44 w-44 rounded-full object-cover text-indigo-500" aria-hidden="true" />
                            </span>
                          </div>
                          <h3 className="mt-5 sm:text-xl text-lg font-medium text-gray-900 tracking-tight">{speaker.title}</h3>
                          <h3 className="mt-1 text-base font-medium text-gray-700 tracking-tight">{speaker.name}</h3>
                          <h3 className="mt-3 text-lg font-medium text-gray-900 tracking-tight">{speaker.date}</h3>
                          <a href={speaker.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 hover:text-indigo-700 trans-300 text-indigo-500">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube fa-w-18 h-4 w-4 mr-2" 
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                            </svg> View Talk
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative bg-white pt-10">
          <div className="mx-auto max-w-md px-4 text-center max-w-4xl lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              See what others have to say about Everaise.
            </p>
            <div className="mt-12">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {people.map((person) => (
                  <li key={person} className="px-3 md:px-4 col-span-1" >
                    <figure className="shadow-lg border border-gray-200 rounded-xl flex-none" >
                      <blockquote className="rounded-t-xl bg-white px-6 py-8 md:px-10 py-8 text-lg md:text-lg leading-8 md:leading-8 font-semibold text-gray-900">
                        <svg
                          className="mb-3 h-8 w-8 text-cyan-300"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p>{person.testimonial}</p>
                      </blockquote>
                      <figcaption className="flex items-center space-x-4 p-6 md:px-10 py-2 bg-gradient-to-br rounded-b-xl leading-6 font-semibold text-white from-cyan-500 to-blue-300">
                        <div className="flex-auto">{person.name}, {person.course}</div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Partners
            </p>
            <div className="flow-root ">
              <div className="flex flex-wrap sm:flex-row justify-center">
                {[{ name: 'Biolympiads', image: Biolympiads }].map((s) => {
                  let key = s.name.replace(/[\W_]+/g, '-').toLowerCase()
                  return (
                    <div key={key} className="mt-4 px-4 lg:px-8 items-center flex">
                      <div>
                        <img
                          className="sm:my-0 h-auto w-72 mx-auto"
                          src={s.image}
                          alt={s.name}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Logo Cloud */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
            <p className="text-center mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Sponsors
            </p>
            <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-2 lg:grid-cols-4">
              {sponsors.map((sponsor) => (
                <div className="rounded-l-sm col-span-1 flex justify-center py-4 px-4">
                  <img className="max-h-12 sm:max-h-16" src={sponsor.image} alt={sponsor.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sponsor Us
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 py-12 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Want to support Everaise Academy?</span>
              <span className="block">Become a <span className="text-indigo-500">sponsor</span> or donate!</span>
            </h2>
            <div className="mt-8">
              <PayPalButton
                amount="0.01"
                shippingPreference="NO_SHIPPING" 
                horizontal
              />
            </div>
          </div>
        </div>
        */}
      </main>
      <Footer />
    </div>
  )
}