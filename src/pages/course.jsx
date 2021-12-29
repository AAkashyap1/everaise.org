import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'


import courses from '../data/course/courses';
import BenefitsGrid from '../components/course/BenefitsGrid';
import WhyEveraise from '../components/course/WhyEveraise';
import CourseFormat from '../components/course/CourseFormat';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Course() {
  const { course } = useParams()
  const [current, setCurrent] = useState('')
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

  const navigation = [
    { name: 'Why take ' + data.name + '?', href: '#whyCourse', icon: AcademicCapIcon },
    { name: 'Why Everaise?', href: '#whyEveraise', icon: QuestionMarkCircleIcon },
    { name: 'Course Format', href: '#format', icon: ClipboardIcon },
    { name: 'Course Topics', href: '#topics', icon: CalendarIcon },
    { name: 'Course Materials', href: '#materials', icon: BookOpenIcon },
    { name: 'Is this course for me?', href: '#faq', icon: UserCircleIcon },
  ]

  useEffect(() => {
    document.title = 'Courses - Everaise Academy'
  })

  return (
    <div>
      <Nav />
      <div className="my-5 bg-white">
        <div className="contaier mx-auto pt-4 sm:pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-5 lg:mb-10 space-y-6 xl:max-w-none">
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
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <aside className="relative">
              <nav className="sticky top-6 mb-7 lg:mb-0 col-span-1 pr-10">
                {navigation.map((item) => (
                  <AnchorLink
                    href={item.href}
                    offset={item.href === '#whyCourse' ? "30px" : "10px"}
                  >
                    <div
                      key={item.name}
                      onClick={() => setCurrent(item.name)}
                      className={classNames(
                        item.name === current ? 'bg-gray-100 text-cyan-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'cursor-pointer my-1 group rounded-md py-2 px-2 flex items-center text-base font-medium'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.name === current ? 'text-cyan-600 font-semibold' : 'font-medium text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </AnchorLink>
                ))}
              </nav>
            </aside>
            <div className="col-span-1 lg:col-span-3 space-y-12">
              <ul className="flex jusify-center grid space-y-5 md:space-y-8">
                <div id='whyCourse' className="space-y-6">
                  <h2 className="mb-3 text-3xl font-bold text-gray-900 tracking-tight">Why take {data.name}?</h2>
                  <BenefitsGrid />
                </div>
                <div id='whyEveraise' className="">
                  <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Why Everaise?</h2>
                  <WhyEveraise />
                </div>
                <div id='format'>
                  <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Course Format</h2>
                  <CourseFormat />
                </div>
                <div id='topics'>
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
                <div id='materials'>
                  <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">Course Materials</h2>
                  {data.book.image ?
                    <div className="py-10 border border-gray-200 shadow-lg text-left rounded-lg grid grid-cols-1 md:grid-cols-4">
                      <div className="space-y-6 xl:space-y-10">
                        <div className="flex justify-center">
                          <img className="object-cover mx-auto h-72 w-72 md:w-64 md:h-64 md:ml-8 rounded-full" src={data.book.image} alt="" />
                        </div>
                      </div>
                      <div className="px-8 md:pl-8 md:pr-16 md:col-span-3">
                        <div className="text-gray-900 mt-4 font-semibold text-2xl text-italic">
                          {data.book.title}
                        </div>
                        <div className="text-gray-900 mt-4 font-medium text-lg">
                          <div className="font-normal text-lg font-semibold text-gray-700">{data.book.people}</div>
                        </div>
                        <div className="text-gray-900 mt-4 font-medium text-lg">
                          <div className="font-normal text-base text-gray-700 italic">
                            The course follows the official Everaise Academy {' ' + data.name + ' '} book, which
                            includes both problems and solutions. During the course, students receive printable
                            digital handouts that collectively form the entire book. Many of our students to purchase
                            a physical copy of the book upon completing the course.
                          </div>
                        </div>
                        <a download className="mt-4" href={data.book.sample}>
                          <button className="py-1 px-4 rounded-md bg-blue-500 unfocus hover:bg-blue-600 mt-4 font-normal text-sm text-white">Download Sample &rarr;</button>
                        </a>
                      </div>
                    </div> : 
                    <div className="py-6 border border-gray-200 shadow-lg text-left rounded-lg">
                      <div className="px-8 md:pl-8 md:pr-16">
                        <div className="text-gray-900 font-semibold text-2xl text-italic">
                          {data.book.title}
                        </div>
                        <div className="text-gray-900 mt-4 font-medium text-lg">
                          <div className="font-normal text-base text-gray-700 italic">
                            The course follows the official Everaise Academy {' ' + data.name + ' '} book, which
                            includes both problems and solutions. During the course, students receive printable
                            digital handouts that collectively form the entire book. Many of our students to purchase
                            a physical copy of the book upon completing the course.
                          </div>
                        </div>
                        <a download className="mt-4" href={data.book.sample}>
                          <button className="py-1 px-4 rounded-md bg-blue-500 unfocus hover:bg-blue-600 mt-4 font-normal text-sm text-white">Download Sample &rarr;</button>
                        </a>
                      </div>
                    </div>
                  }
                </div>
                <div id='faq'>
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
      </div>
      <Footer />
    </div>
  )
}
