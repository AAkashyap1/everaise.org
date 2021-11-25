import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import speakers from '../data/guestSpeakers'

export default function Guest() {

  useEffect(() => {
    document.title = 'Guest Speakers - Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div>
      <Nav />
      <div className="mt-5 bg-white">
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
                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw"><span className="text-indigo-500">YouTube channel</span></a>{' '}
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
                        <h3 className="flex text-2xl font-semibold -mt-3 sm:-mt-2 md:-mt-2 lg:-mt-2 xl:-mt-6 mb-2 justify-center text-gray-900">{person.name}</h3>
                        <div className="flex justify-center">
                          <h3 className="flex text-md font-medium leading-6 mx-6 justify-center text-gray-900">{person.role}</h3>
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