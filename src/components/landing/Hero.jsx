import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Nav from '../nav'
import Board from '../../images/index.png'

export default function Hero() {
  return (
    <div className="lg:min-h-screen bg-gray-50 z-20">
      <Nav />
      <main className="lg:relative -py-5">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Inspiring Students</span>{' '}
              <span className="block text-cyan-600 xl:inline">Worldwide</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-3xl text-gray-500 sm:text-3xl md:mt-5 md:max-w-3xl">
              By students, for students: Making quality education freely accessible to all.
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
        <div className="relative w-full h-0 lg:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:min-h-screen lg:h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover shadow-lg"
            src={Board}
            alt=""
          />
        </div>
      </main>
    </div>
  )
}