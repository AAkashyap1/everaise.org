import Nav from '../components/global/navs/nav';
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import { current, archive } from '../data/team'
import Page from '../components/page'

export default function Team() {
  return (
    <Page
      title="Team - Everaise Academy"
      description="Our team is comprised of high school and college students who have been successful 
      in a variety of STEM fields, including math, physics, and biology."
    >
      <Nav />
      <div className="mt-5 bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="">
            <div className="space-y-5 sm:space-y-4 xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Meet Our Team</h2>
              <p className="text-xl text-gray-500">
                Our team is comprised of high school and college students who have been successful
                in a variety of STEM fields, including math, physics, and biology. Interested in being part
                of the team? Learn more {' '}<a href="https://docs.google.com/forms/d/e/1FAIpQLSeiQXl_vdbjcAFv4SRt1Zr8wZiylSfh4y30CMSVFr5r_ZQl3g/viewform" rel="noreferrer" target="_blank"><span className="text-indigo-500">here</span></a>!
              </p>
            </div>
            <ul className="mt-6 flex jusify-center space-y-4 grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
              {current.map((person) => (
                <li key={person.name} className="py-10 px-6 border border-gray-200 shadow-lg text-left rounded-lg xl:px-10">
                  <div className="space-y-6 xl:space-y-10">
                    <img className="object-cover mx-auto h-56 w-56 rounded-full" src={person.imageUrl} alt="" />
                    <div className="space-y-2 flex justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-gray-900">{person.name}</h3>
                        {person.roles.map(role => {
                          return (
                            <span
                              className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 bg-gray-300 text-sm font-normal text-gray-900"
                              key={role}
                            >
                              {role}
                            </span>
                          )
                        })}
                      </div>
                      <ul className="items-center flex justify-center space-x-5">
                        {person.gitHubUrl && <li>
                          <a href={person.gitHubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">GitHub</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>}
                        {person.linkedInUrl && <li>
                          <a href={person.linkedInUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>}
                      </ul>
                    </div>
                  </div>
                  <div className="text-gray-900 mt-4 font-medium text-lg">
                    Education:
                    <ul className="">
                      <li className="font-normal text-base text-gray-700">{person.education}</li>
                    </ul>
                  </div>
                  <div className="text-gray-900 mt-4 font-medium text-lg">
                    Achievements:
                    <ul className="ml-7 list-disc">
                      {person.achievements.map(achievement => {
                        return <li className="font-normal text-base text-gray-700">{achievement}</li>
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-3xl font-bold text-gray-900 sm:text-4xl">Team Archive</h2>
            <ul className="mt-6 flex jusify-center space-y-4 grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
              {archive.map((person) => (
                <li key={person.name} className="py-10 px-6 border border-gray-200 shadow-lg text-left rounded-lg xl:px-10">
                  <div className="space-y-6 xl:space-y-10">
                    <img className="object-cover mx-auto h-56 w-56 rounded-full" src={person.imageUrl} alt="" />
                    <div className="space-y-2 flex justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-gray-900">{person.name}</h3>
                        {person.roles.map(role => {
                          return (
                            <span
                              className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 bg-gray-300 text-sm font-normal text-gray-900"
                              key={role}
                            >
                              {role}
                            </span>
                          )
                        })}
                      </div>
                      <ul className="items-center flex justify-center space-x-5">
                        {person.gitHubUrl && <li>
                          <a href={person.gitHubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">GitHub</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>}
                        {person.linkedInUrl && <li>
                          <a href={person.linkedInUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>}
                      </ul>
                    </div>
                  </div>
                  <div className="text-gray-900 mt-4 font-medium text-lg">
                    Education:
                    <ul className="">
                      <li className="font-normal text-base text-gray-700">{person.education}</li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            {/* <ul className="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {staff.map((person) => (
                <li key={person.name} className="py-10 px-6 border border-gray-200 shadow-lg rounded-lg xl:px-10 text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <img className="object-cover mx-auto sm:h-24 sm:w-24 md:w-32 md:h-32 lg:h-40 lg:w-40 h-40 w-40 h-40 w-40 rounded-full" src={person.imageUrl} alt="" />
                    <div className="space-y-2 flex justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-gray-900">{person.name}</h3>
                        {person.roles.map(role => {
                          return (
                            <span
                              className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 bg-gray-300 text-sm font-normal text-gray-900"
                              key={role}
                            >
                              {role}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-900 mt-4 font-medium text-lg">
                    Education:
                    <ul className="">
                      <li className="font-normal text-base text-gray-700">{person.education}</li>
                    </ul>
                  </div>
                  <div className="text-gray-900 mt-4 font-medium text-lg">
                    Achievements:
                    <ul className="ml-7 list-disc">
                      {person.achievements.map(achievement => {
                        return <li className="font-normal text-base text-gray-700">{achievement}</li>
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
      <Footer />
    </Page>
  )
}