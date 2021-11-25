import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react' 
import { Link } from 'react-router-dom' 

import PrestonFu from '../images/team/PrestonFu.png'
import MatthewChen from '../images/team/MatthewChen.png'
import ChooiJeQin from '../images/team/ChooiJeQin.png'
import AshmitDutta from '../images/team/AshmitDutta.png'
import KrishJayarapu from '../images/team/KrishJayarapu.png'
import KiranSun from '../images/team/KiranSun.png'
import AnanthKashyap from '../images/team/AnanthKashyap.png'
import AbhayBestrapalli from '../images/team/AbhayBestrapalli.png'
import FarazAhmedSiddiqui from '../images/team/FarazAhmedSiddiqui.png'
import JeffreyWei from '../images/team/JeffreyWei.png'

import AnujSakarda from '../images/team/AnujSakarda.png'
import OliviaLi from '../images/team/OliviaLi.png'
import GaryHu from '../images/team/GaryHu.png'
import JustinHua from '../images/team/JustinHua.png'
import IvyZheng from '../images/team/IvyZheng.png'
import DerekChen from '../images/team/DerekChen.png'
import PeterPu from '../images/team/PeterPu.png'
import AnuragChittawar from '../images/team/AnuragChittawar.png'
import AniruddhaSharma from '../images/team/AniruddhaSharma.png'
import AtharvaMahajan from '../images/team/AtharvaMahajan.png'
import YamanAcharya from '../images/team/YamanAcharya.png'
import HaoliYin from '../images/team/HaoliYin.png'
import VictorLi from '../images/team/VictorLi.JPG'
import NathanMa from '../images/team/NathanMa.png'
import AlbertYe from '../images/team/AlbertYe.png'
import JeffreyHu from '../images/team/JeffreyHu.jpg'
import LohithTummala from '../images/team/LohithTummala.png'
import EvanKim from '../images/team/EvanKim.png'

export const core = [
  {
    name: 'Preston Fu',
    roles: ['Co-founder', 'Executive Board Member', 'Logistics', 'Outreach'],
    imageUrl:
      PrestonFu,
    achievements: ['USA(J)MO Qualifier', 'USAPhO Honorable Mention', 'Canadian Open Mathematics Challenge (COMC) International Honor Roll', 'Ross Mathematics Program Alumnus'],
    education: 'Saratoga High School, CA – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Matthew Chen',
    roles: ['Math 1 Head', 'Executive Board Member', 'Math 1 Founding Member'],
    imageUrl:
      MatthewChen,
    achievements: ['2x USA(J)MO Qualifier', 'PUMaC A Algebra 8th Place, Individual Finals 20th Place', 'USEMO Distinction', 'USAPHO Qualifier'],
    education: 'Wayzata High School, MN – Class of 2023',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Je Qin Chooi',
    roles: ['Astronomy Head', 'Executive Board Member', 'Astronomy Founding Member'],
    imageUrl:
      ChooiJeQin,
    achievements: ['IESO 2018', 'IAO 2019', 'IOI 2021', 'IPhO 2021', 'IOAA 2021'],
    education: `Kolej Tuanku Ja'afar, Malaysia – Class of 2022`,
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Ashmit Dutta',
    roles: ['Physics Head', 'Executive Board Member', 'Physics Founding Member'],
    imageUrl:
      AshmitDutta,
    achievements: ['Thomas Jefferson Physics Olympiad (TJPhO) Second Place', 'Physics Unlimited Explorer Competition (PUEC) Special Award', 'Online Physics Olympiad (OPhO) Problem Writer'],
    education: 'Wayzata High School, MN – Class of 2023',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Krish Jayarapu',
    roles: ['Biology Head', 'Executive Board Member'],
    imageUrl:
      KrishJayarapu,
    achievements: ['USABO Honorable Mention, Semifinalist', 'Science Olympiad National Medalist', 'Researcher at IU'],
    education: 'Carmel High School, IN – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Kiran Sun',
    roles: ['Math 1 Associate Head', 'Executive Board Member', 'Math 1 Founding Member'],
    imageUrl:
      KiranSun,
    achievements: ['Canadian Junior Mathematical Olympiad (CJMO) Qualifier', '2x Canadian Mathematical Olympiad Qualifying Repêchage (CMOQR) Qualifier', 'AIME Qualifier'],
    education: 'St. George’s School, British Columbia – Class of 2024',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Ananth Kashyap',
    roles: ['Director of Technology'],
    imageUrl:
      AnanthKashyap,
    achievements: ['2021 AIME Qualifier / AMC 10 Distinction', 'Research Intern at CMU School of Computer Science', 'Congressional App Challenge Winner'],
    education: 'Fox Chapel Area High School, PA – Class of 2023',
    linkedInUrl: 'https://www.linkedin.com/in/ananth-kashyap-88b996209/',
    gitHubUrl: 'https://github.com/AAkashyap1',
  },
  {
    name: 'Abhay Bestrapalli',
    roles: ['Astronomy Associate Head'],
    imageUrl:
      AbhayBestrapalli,
    achievements: ['Indian International Mathematical Olympiad Training Camp (IMOTC)', 'USA IOAA 2021 Main Team', 'Indian Astronomy Selection Camp (IOAA OCSC)'],
    education: 'Delhi Public School Bangalore East – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Faraz Ahmed Siddiqui',
    roles: ['Astronomy Associate Head'],
    imageUrl:
      FarazAhmedSiddiqui,
    achievements: ['INAO Qualifier', 'Physics Unlimited Explorer Competition (PUEC) Bronze Award', 'OPhO Invitational Qualifier'],
    education: 'Holy Family High School, Maharashtra, India – Class of 2024',
    linkedInUrl: 'https://www.linkedin.com/in/faraz-ahmed-siddiqui-73a3ba216/',
    gitHubUrl: '',
  },
  {
    name: 'Jeffrey Wei',
    roles: ['Astronomy Associate Head'],
    imageUrl:
      JeffreyWei,
    achievements: [],
    education: 'Acton Boxborough Regional High School, MA – Class of 2023',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Evan Kim',
    roles: ['Physics', 'Curriculum', 'Instructor'],
    imageUrl:
      EvanKim,
    achievements: ['USAPhO Semifinalist', 'AMC 10 Distinguished Honor Roll', 'AIME Qualifier', 'National Science Bowl Qualifier'],
    education: 'Tesla STEM High School, WA – Class of 2023',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Lohith Tummala',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      LohithTummala,
    achievements: ['USABO Honorable Mention, Semifinalist', 'Science Olympiad National Medalist', 'Researcher at IU'],
    education: 'Paul Laurence Dunbar High School, KY – Class of 2021',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Jeffrey Hu',
    roles: ['Math 1', 'Physics', 'Curriculum', 'Instructor'],
    imageUrl:
      JeffreyHu,
    achievements: ['3x AIME qualifier', 'USAPhO qualifier', 'Santa Clara University Math Contest Honorable Mention'],
    education: 'Saratoga High School, CA – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Albert Ye',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      AlbertYe,
    achievements: ['3x AIME Qualifier', 'AMC 10 Distinguished Honor Roll', 'USAMTS Leaderboard'],
    education: 'Saratoga High School, CA – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Nathan Ma',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      NathanMa,
    achievements: ['2x AMC 10 Distinguished Honor Roll', '2x AIME Qualifier', 'MathCounts Nationals Qualifier'],
    education: 'Stevenson High School, IL – Class of 2023',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Victor Li',
    roles: ['Biology', 'Curriculum', 'Instructor'],
    imageUrl:
      VictorLi,
    achievements: ['2020 USABO Top 20 Finalist', '2018 USESO Finalist'],
    education: 'Massachusetts Institute of Technology – Class of 2025',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Haoli Yin',
    roles: ['Biology', 'Curriculum', 'Instructor'],
    imageUrl:
      HaoliYin,
    achievements: [],
    education: '',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Yaman Acharya',
    roles: ['Astronomy', 'Curriculum', 'Instructor'],
    imageUrl:
      YamanAcharya,
    achievements: ['IAO Qualifier', 'NAO Finalist', 'Intern at Nepal Astronomical Society (NASO)'],
    education: 'Vishwa Adarsha College, Province No. 1, Nepal – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Atharva Mahajan',
    roles: ['Physics', 'Curriculum', 'Instructor'],
    imageUrl:
      AtharvaMahajan,
    achievements: ['Indian Physics Selection Camp (OCSC)', 'KVPY Top 50', 'RMO Qualifier'],
    education: 'Rankers International School, Madhya Pradesh, India – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Aniruddha Sharma',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      AniruddhaSharma,
    achievements: ['Physics Unlimited Explorer Competition (PUEC) Third Place', 'Stanford Code in Place Alumnus', 'Gaussian Curvature Mathematics Committee Member'],
    education: 'Delhi Public School, Bhopal, India – Class of 20XX',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Anurag Chittawar',
    roles: ['Biology', 'Curriculum', 'Instructor'],
    imageUrl:
      AnuragChittawar,
    achievements: ['2x INBO gold medalist', 'AIR 52 in KVPY SA'],
    education: 'Yogi Raj Public School, Rajasthan, India – Class of 2021',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Peter Pu',
    roles: ['Biology', 'Curriculum', 'Instructor'],
    imageUrl:
      PeterPu,
    achievements: ['USABO Finalist (Top 20)', 'AMC 10 DHR', 'AMC 12 DHR'],
    education: 'University of Chicago Laboratory Schools, IL – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Derek Chen',
    roles: ['Biology', 'Curriculum', 'Instructor'],
    imageUrl:
      DerekChen,
    achievements: ['2021 USABO Team Member', '5x AIME Qualifier', 'USAPhO Honorable Mention', 'PROMYS Alumnus'],
    education: 'Belmont High School, MA – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Ivy Zheng',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      IvyZheng,
    achievements: ['2x AIME Qualifier', 'AMC 10 Distinguished Honor Roll'],
    education: 'Lexington High School, MA – Class of 2024',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Justin Hua',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      JustinHua,
    achievements: ['Ross Mathematics Program Alumnus'],
    education: 'Hugh McRoberts Secondary School, British Columbia, Canada – Class of 2021',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Gary Hu',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      GaryHu,
    achievements: ['AIME Qualifier', 'AMC 10 Distinction', 'CMIMC Algebra Number Theory Top 50'],
    education: 'Montclair Kimberley Academy, NJ – Class of 2024',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Olivia Li',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      OliviaLi,
    achievements: ['AIME Qualifier', 'Math Prize for Girls Alumnus', 'USACO Silver Qualifier'],
    education: 'Dougherty Valley High School, CA – Class of 2023',
    linkedInUrl: '',
    gitHubUrl: '',
  },
  {
    name: 'Anuj Sakarda',
    roles: ['Math 1', 'Curriculum', 'Instructor'],
    imageUrl:
      AnujSakarda,
    achievements: ['USAMO Qualifier', 'MIT PRIMES Researcher', 'HCSSIM Alumnus', 'PROMYS Mathematics Program'],
    education: 'Acton Boxborough Regional High School, MA – Class of 2022',
    linkedInUrl: '',
    gitHubUrl: '',
  },
]

export const staff = []

export default function Team() {
  useEffect(() => {
    document.title = 'Team - Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div>
      <Nav />
      <div className="mt-5 bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Meet Our Team</h2>
              <p className="text-xl text-gray-500">
              Our team is comprised of high school and college students who have been successful 
              in a variety of STEM fields, including math, physics, and biology. Interested in being part
              of the team? Learn more {' '}<Link to="/people/join"><span className="text-indigo-500">here</span></Link>!
              </p>
            </div>
            <ul className="flex jusify-center space-y-4 grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
              {core.map((person) => (
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
            <ul className="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}