import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
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
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 duration-150"
            >
              Our courses
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              to="/resources"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-gray-200 hover:bg-cyan-100 duration-150"
            >
              Our Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}