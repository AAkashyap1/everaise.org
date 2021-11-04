import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  BookOpenIcon,
  ChartBarIcon,
  ClipboardIcon,
  ClockIcon,
  DatabaseIcon,
  DesktopComputerIcon,
  GlobeIcon,
  IdentificationIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import Math from '../images/books/Math.png'  
import Astronomy from '../images/books/Astronomy.png'  
import Physics from '../images/books/Physics.png'  
import Math1H from '../files/Math1.pdf'
import BiologyH from '../files/Biology.pdf'
import PhysicsH from '../files/Physics.pdf'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const benefits = [
  {
    title: 'Live sessions',
    desc: 'taught by our excellent faculty',
    href: 'https://discord.gg/JE5TaCrrFn',
    icon: ClockIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Well-trained, qualified instructors',
    desc: 'easily accessible on our discussion board whenever you have questions',
    href: '/people/team',
    icon: UsersIcon,
    iconForeground: 'text-cyan-700',
    iconBackground: 'bg-cyan-100',
  },
  { 
    title: 'Global community',  
    desc: 'of avid, supportive, and collaborative learners spanning 6 continents',
    href: 'https://discord.gg/JE5TaCrrFn',
    icon: GlobeIcon, 
    iconForeground: 'text-yellow-700', 
    iconBackground: 'bg-yellow-50' 
  },
  {
    title: 'Well-written course materials',
    desc: 'complete with detailed walkthrough solutions to thousands of problems',
    href: '/resources',
    icon: BookOpenIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Variety of carefully-selected homework problems',
    desc: 'suitable to students of all skill levels',
    href: '/dashboard',
    icon: DatabaseIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Hundreds of instructor-produced videos',
    desc: 'for visual learners',
    href: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw)',
    icon: DesktopComputerIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Exclusive access to our annual competitions',
    desc: 'subject-specific End-of-Course contest and Estimathon',
    href: '/events/estimathon',
    icon: ClipboardIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Priority access in interactive',
    desc: 'guest lectures with professors and industry professionals',
    href: '/events/guest-speakers',
    icon: IdentificationIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Climb the course leaderboard',
    desc: 'to earn different prizes and unique benefits',
    href: '/dashboard',
    icon: ChartBarIcon,
    iconForeground: 'text-cyan-700',
    iconBackground: 'bg-cyan-100',
  },
]

export default function Course() {
  const { course } = useParams()

  const courses = {
    'physics' : {
                  name: 'Physics Mechanics',
                  img: 'https://everaise.org/wp-content/uploads/2020/04/Screen-Shot-2020-04-24-at-9.32.13-PM.png',
                  desc: `A rigorous treatment of mechanics including kinematics, Newton’s laws, collisions, 
                        rolling motion, oscillations, fluid statics, fictitious forces, and error analysis.`,
                  dates: 'June 21 – August 6',
                  link: 'physics', 
                  topics: [['Kinematics in One Dimension and Calculus Overview', 'Kinematics in Two Dimensions', 'Newton’s Laws', 'Friction', 'Momentum and Collisions'], ['Energy', 'Springs', 'Central Forces', 'Angular Kinematics', 'Angular Dynamics'], ['Rolling motion', 'Statics', 'Oscillations', 'Gravitation', 'Orbital Mechanics'], ['Fluid Statics', 'Fluid Dynamics', 'Fictitious Forces', 'Error Propagation and Analysis']],
                  book: {
                    people: 'Brian Lee and William Shi',
                    image: Physics,
                    title: 'Everaise Academy: Physics Mechanics',
                  },
                  testimonial: { 
                    quote: 'Tons of problem solving skills, different aspects and considerations in advanced researches in the Sciences (via guest lectures), having to communicate with avid learners from all over the world and a brand-new respect and appreciation for Physics!',
                    name: 'Felix Yew',
                  },
                  diagnostic: PhysicsH,
                  prereq: <p className="mt-2">Physics: Students at or approaching USAPhO qualification or with sufficient math or physics background.</p>
                },
    'biology' : {
                  name: 'Biology',
                  img: 'https://everaise.org/wp-content/uploads/2020/05/received_864303084037580.png',
                  desc: `A deep study of theoretical biology, covering a range of topics from cell biology, 
                          genetics, and human anatomy and physiology to the mechanisms underlying plant life`,
                  dates: 'July 5 – August 6',
                  link: 'biology', 
                  topics: [['Fundamentals of Macromolecules', 'Membrane Structures', 'Proteins', 'Cellular Metabolism and Cell Cycle', 'Signal Transduction', 'Advanced Topics in Cell Biology'], ['The Genetic Basis of Life', 'The Central Dogma – Transcription', 'The Central Dogma – Translation', 'Population Genetics', 'Phylogenetics / Evolutionary Genetics', 'Biotechnology'], ['Integumentary System, Skeletal System, Muscular System', 'Cardiovascular System, Respiratory System', 'Nervous System', 'Endocrine System, Digestive System', 'Urinary System, Immune System', 'Reproductive System, Development'], ['Fundamentals of Plant Anatomy', 'The Plant Root', 'The Movement of Water / Solutes', 'Plant Hormones', 'Photosynthesis', 'Evolution of Plants']],
                  book: {
                    people: '',
                    image: '',
                    title: '',
                  },
                  testimonial: { 
                    quote: 'The best part of the program were learning something new everyday in a well presented manner through the handouts. I loved how the information in the handout was easy to digest so I could understand them better',
                    name: 'Sushrit Pasumarthy',
                  },
                  diagnostic: BiologyH,
                  prereq: <p className="mt-2">Biology: Students who have participated in USABO or have completed a high school biology course.</p>
                },
    'math'    : {
                  name: 'Math Competitions I',
                  img: 'https://everaise.org/wp-content/uploads/2020/04/Screen-Shot-2020-04-24-at-9.31.32-PM.png',
                  desc: `An intuition-building math competitions course including sequences and series, 
                          polynomials, combinatorial identities, triangle centers, and modular arithmetic.`,
                  dates: 'July 12 – August 6',
                  link: 'math',
                  topics: [['Exponents, Radicals, Logarithms', 'Sequences and Series', 'Polynomials, Graphs'], ['Angles, Circles', 'Triangles and Triangle Centers', 'Area, Length, Ratios'], ['Casework and Complementary Counting', 'Principle of Inclusion-Exclusion', 'Probability'], ['Bases, Decimal Representations', 'Primes, Factorizations, GCD/LCM', 'Modular Arithmetic']],
                  book: {
                    people: 'Saadiq Shaikh and Matthew Chen',
                    image: Math,
                    title: 'Everaise Academy: Math Competitions I',
                  },
                  testimonial: { 
                    quote: 'The commitment to learning and excellence all for free really stood out. Normally, you would assume people to charge large swaths of money for content of this standard and genre, but the level at which content was presented and the follow-up and help to students was phenomenal and at the same time was free of cost.',
                    name: 'Krish Shah',
                  },
                  diagnostic: Math1H,
                  prereq: <p className="mt-2">Math 1: Students at or approaching AIME qualification.</p>
                },
    'astronomy':{
                  name: 'Astronomy',
                  img: 'https://everaise.org/wp-content/uploads/bop.jpg',
                  desc: `An introductory course in astronomy, including celestial coordinates, stellar systems, 
                          and cosmology in addition to important physics topics such as orbital mechanics.`,
                  dates: 'July 12 – August 6',
                  link: 'astronomy', 
                  topics: [['Introduction to Astronomy', 'Kinematics', 'Momentum and Collisions', 'Dynamics and Rotation', 'Gravitation'], ['Orbital Mechanics', 'Spherical Geometry', 'Celestial Coordinate Systems 1', 'Celestial Coordinate System 2', 'Celestial Coordinate Conversions'], ['Celestial Timekeeping Systems', 'Geocentric Planetary Phenomena', 'Reduction in positional observations', 'Physics of Stars and Planets', 'Stellar Evolution'], ['Stellar Systems', 'Cosmic Distance Ladder', 'Cosmology', 'Optics', 'Night Sky Observation']],
                  book: {
                    people: 'Chooi Je Qin and Gregory Pylypovych',
                    image: Astronomy,
                    title: 'Everaise Academy: Astronomy',
                  },
                  testimonial: { 
                    quote: 'The best part about the program was how organized everything was. We got the handout schedule way before the program started, so I always knew what was coming. The handouts were generally well-written and comprehensive as well. The Everaise team clearly put a lot of effort into planning these 5 weeks.',
                    name: 'Cindy Yu',
                  },
                  diagnostic: '',
                  prereq: <p className="mt-2">Astronomy: Students at or approaching NAO qualification or have a strong background in trigonometry.</p>
                },
  }
  const data = courses[course]

  const faqs = [
    {
      id: 1,
      question: "Prerequisites",
      answer: 
        <div>
          <p>There is no prerequisite age. Students are advised to take our diagnostic exam to decide whether they are ready to take this course. As many of the topics covered in our courses are also tested on academic competitions, here is a rough guide based on American STEM competitions.</p>
          {data.prereq}
        </div>
    },
    {
      id: 2,
      question: "Diagnostic",
      answer:
        <span>This diagnostic quiz is a good indication of the difficulty of this course.{data.diagnostic ? <a href={data.diagnostic} download className="ml-1 text-blue-500">Click to download!</a> : <span className="ml-1 text-blue-500">Coming soon!</span>}</span>
    },
  ]

  useEffect(() => {
    document.title = 'Courses - Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div>
      <Nav />
      <div className="mb-5 bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="-mb-4 space-y-6 xl:max-w-none">
              <div>
                <h2 className="text-base font-semibold tracking-wide uppercase text-cyan-600">
                  <Link to="/enroll" className="text-cyan-600 hover:text-cyan-700">
                    Enroll Now!
                  </Link>
                </h2>
                <h2 className="font-extrabold text-gray-900 tracking-tight text-4xl">
                  {data.name}
                </h2>
              </div>
              <p className="text-xl text-gray-500">
                {data.desc}
              </p>
            </div>
            <ul className="flex jusify-center grid space-y-5 md:space-y-8">
              <div className="space-y-6">
                <h2 className="mb-3 text-3xl font-bold text-gray-900 tracking-tight">Why take {data.name}?</h2>
                <div className="rounded-lg shadow-lg border border-gray-200 bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px">
                  {benefits.map((benefit, benefitIdx) => (
                    <div
                      key={benefit.title}
                      className={classNames(
                        benefitIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                        benefitIdx === 2 ? 'sm:rounded-tr-lg' : '',
                        benefitIdx === benefits.length - 3 ? 'sm:rounded-bl-lg' : '',
                        benefitIdx === benefits.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                      )}
                    >
                      <div>
                        <span
                          className={classNames(
                            benefit.iconBackground,
                            benefit.iconForeground,
                            'rounded-lg inline-flex p-3 ring-4 ring-white'
                          )}
                        >
                          <benefit.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="mt-2">
                        <h3 className="text-lg font-medium">
                          {benefit.href.startsWith('https') ? 
                            <a href={benefit.href} target="_blank" rel="noreferrer" 
                               className="focus:outline-none"
                            >
                              {/* Extend touch target to entire panel */}
                              <span className="absolute inset-0" aria-hidden="true" />
                              {benefit.title}
                            </a> :
                            <Link to={benefit.href}  
                               className="focus:outline-none"
                            >
                              {/* Extend touch target to entire panel */}
                              <span className="absolute inset-0" aria-hidden="true" />
                              {benefit.title}
                            </Link>
                          }
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {benefit.desc}
                        </p>
                      </div>
                      <span
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                      >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Why Everaise?</h2>
                <p className="text-xl text-gray-500">
                  Our goal at Everaise is to instill a lifelong love of learning in our students. We aren’t just a 
                  contest preparation bootcamp — although our program is excellent training for academic competitions, 
                  our real objective is to expose kids to cool and interesting material they might never have seen before. 
                  To that end, we offer students comprehensive, in-depth opportunities to learn new subjects — and 
                  come to love them, too.
                </p>
                <p className="mt-4 text-xl text-gray-500">
                  In our courses, we emphasize building deeper understanding over memorizing techniques and formulas. We 
                  provide plenty of detailed examples in each handout, with each solution properly motivated and explained;
                  our office hour sessions are run by some of the most talented high school and college students in their 
                  respective subject areas.
                </p>
                <p className="mt-4 text-xl text-gray-500">
                  We believe that knowledge should be equally accessible to students of all backgrounds, which is why our 
                  courses will always be free for everyone.
                </p>
              </div>
              <div>
                <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Course Format</h2>
                <p className="text-xl text-gray-500">
                  Throughout our Summer 2021 courses, students will work through handouts and watch videos that will develop 
                  theory, provide examples to cultivate a true understanding of the material, and provide challenging problems 
                  to be submitted for homework. Each set of handouts and videos is expected to take roughly 4-5 hours per 
                  topic, so students who wish to gain a deep understanding of the material should expect to spend about 12-15 
                  hours per week.
                </p>
                <p className="mt-4 text-xl text-gray-500">
                  Our web portal, Everaise Launch, is up and running! There, students will be able to register for classes and 
                  view the corresponding handouts, videos, and homework submission forms when the courses begin. All Summer 2021 
                  courses are self-paced with recommended (optional) due dates; students are free to jump around between the 
                  accessible materials. More details about Everaise Launch and registration will be posted shortly.
                </p>
                <p className="mt-4 text-xl text-gray-500">
                  Instructors will be available via Discord, both for general communication on our discussion board and for office 
                  hours that will run several times per week. Students will also be able to chat with each other on Discord. Students
                  who do not have access to Discord will only be able to contact instructors via email, where response times will 
                  be much slower.
                </p>
                <p className="mt-4 text-xl text-gray-500">
                  The Summer 2021 course offerings and dates are posted below.
                </p>
              </div>
              <div>
                <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Course Topics</h2>
                
              <div className="bg-white py-5 px-6">

                {/* Activity Feed */}
                <div className="flow-root">
                  <ul className="-mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-10">
                      {data.topics.map((topics) => (
                        <div>
                          {topics.map((topic, topicIdx) => (
                            <li key={topic}>
                              <div className="relative pb-8">
                                {topicIdx !== topics.length - 1 ? (
                                  <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <div className="relative flex space-x-5">
                                  <div>
                                    <span
                                      className={
                                        'cursor-pointer transform hover:scale-125 bg-green-400 h-8 w-8 rounded-full flex items-center justify-center ring-2 ring-white'
                                      }
                                    >
                                      <Link to="/enroll">
                                        <ClipboardIcon className="w-5 h-5 text-white" aria-hidden="true" />
                                      </Link>
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        {topic}{' '}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
              </div>
              {data.book.image && <div>
                <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Course Materials</h2>
                <div className="py-10 border border-gray-200 shadow-lg text-left rounded-lg grid grid-cols-1 md:grid-cols-4">
                  <div className="space-y-6 xl:space-y-10">
                    <div className="flex justify-center">
                      <img className="object-cover mx-auto h-72 w-72 md:w-56 md:h-56 rounded-full" src={data.book.image} alt="" />
                    </div>
                  </div>
                  <div className="px-8 md:pl-4 lg:pl-0 md:pr-16 md:col-span-3">
                    <div className="text-gray-900 mt-4 font-semibold text-2xl text-italic">
                      {data.book.title}
                    </div>
                    <div className="text-gray-900 mt-4 font-medium text-lg">
                      <div className="font-normal text-lg font-semibold text-gray-700">{data.book.people}</div>
                    </div>
                    <div className="text-gray-900 mt-4 font-medium text-lg">
                      <div className="font-normal text-base text-gray-700 italic">
                        The course follows the official Everaise Academy {' ' + data.name + ' '} book. Though 
                        not required, students often prefer to purchase a physical copy of the book. During the 
                        course, students receive digital handouts that collectively form the entire book.
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
              <div>
                <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Is this course for me?</h2>
                <div className="divide-y divide-gray-200">
                  <div className="mt-8">
                    <dl className="divide-y divide-gray-200">
                      {faqs.map((faq) => (
                        <div key={faq.id} className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8">
                          <dt className="text-base font-medium text-gray-900 md:col-span-5">{faq.question}</dt>
                          <dd className="mt-2 md:mt-0 md:col-span-7">
                            <p className="text-base text-gray-500">{faq.answer}</p>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
              <div>
                <section className="py-4 overflow-hidden md:py-6 lg:py-8">
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <svg
                      className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
                      width={404}
                      height={404}
                      fill="none"
                      viewBox="0 0 404 404"
                      role="img"
                      aria-labelledby="svg-Testimonial"
                    >
                      <defs>
                        <pattern
                          id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                          x={0}
                          y={0}
                          width={20}
                          height={20}
                          patternUnits="userSpaceOnUse"
                        >
                          <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                      </defs>
                      <rect width={404} height={404} fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
                    </svg>

                    <div className="relative">
                      <blockquote className="">
                        <div className="mx-auto text-xl leading-9 font-medium text-gray-700">
                          <p>
                            &ldquo;{data.testimonial.quote}&rdquo;
                          </p>
                        </div>
                        <footer className="mt-8">
                          <div className="md:flex md:items-center md:justify-center">
                            <div className="mt-3 text-center md:mt-0 md:flex md:items-center">
                              <div className="text-base font-medium text-gray-900">{data.testimonial.name}</div>

                              <svg className="hidden md:block mx-1 h-5 w-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 0h3L9 20H6l5-20z" />
                              </svg>

                              <div className="text-base font-medium text-gray-500">{data.name} student</div>
                            </div>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </section>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}