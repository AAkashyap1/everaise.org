import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'
import Math from '../images/books/Math.png'  
import Astronomy from '../images/books/Astronomy.png'  
import Physics from '../images/books/Physics.png'  

const resources = [
  {
    people: 'Saadiq Shaikh and Matthew Chen',
    href: 'https://www.amazon.com/dp/B09LGRQ2P3?ref_=pe_3052080_397514860',
    image: Math,
    title: 'Everaise Academy: Math Competitions I',
    description: 
      `This book was adapted from a series of handouts used during the 2021 session of Everaise Academy's 
      Math Competitions I course. Containing over 200 example problems accompanied by full solutions and 
      hints, this book is suitable for high school students who are interested in learning lower-level 
      undergraduate math or would like to participate in math competitions such as the American Math 
      Competitions (AMC) and American Invitational Math Exam (AIME). Topics include Polynomials, Circle 
      and Triangle Geometry, Principle of Inclusion-Exclusion, and Modular Arithmetic.`
  },
  {
    people: 'Brian Lee and William Shi',
    href: 'https://www.amazon.com/dp/B09LGTTPGS?ref_=pe_3052080_397514860',
    image: Physics,
    title: 'Everaise Academy: Physics Mechanics',
    description: 
      `This book was adapted from a series of handouts used during the 2020 session of Everaise Academy's 
      Physics Mechanics course. Equipped with an introduction to calculus and containing a vast array of 
      hand-selected and originally-written problems accompanied by fully motivated solutions, this challenging 
      and conceptually rich book is both approachable for beginners and apt for experts. Topics include 
      momentum and collisions, oscillations, orbital mechanics, fluid dynamics, and fictitious forces. This 
      book is suitable for high school and college students who are curious about mechanics or would like to 
      participate in physics olympiads.`
  },
  {
    people: 'Chooi Je Qin and Gregory Pylypovych',
    href: 'https://www.amazon.com/dp/B09LGNNMH9?ref_=pe_3052080_397514860',
    image: Astronomy,
    title: 'Everaise Academy: Astronomy',
    description: 
      `This book is adapted from the series of handouts in the Everaise Academy’s 2021 Astronomy course. 
      Containing a foundational physics module and detailed walkthrough solutions for each problem, this book 
      is apt for high school and undergraduate students interested in learning more about Astronomy or preparing 
      for Astronomy competitions such as the USAAAO, NAO, IOAA, and IOA, whether in self-study or group settings. 
      A rigorous technical treatment, this book includes topics such as celestial coordinate conversion, 
      observational data reduction, stellar physics, cosmology, optics of instrumentations, and practical 
      night sky observation.`
  },
]

export default function Resources() {
  useEffect(() => {
    document.title = 'Resources - Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div>
      <Nav />
      <div className="mt-5 bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Our Resources</h2>
              <p className="text-xl text-gray-500">
              These books grew out of the curriculum from Everaise Academy courses taught over the past two years. Each book offers a comprehensive, 
              in-depth review of their respective fields, complete with theoretical exposition, detailed walkthroughs to a myriad of example problems, 
              and a wide variety of practice problems with hints and full solutions. They are available at a low cost on Amazon; our students gain 
              digital access for free.
              </p>
            </div>
            <ul className="flex jusify-center space-y-4 grid">
              {resources.map((book) => (
                <li key={book.title} className="py-10 border border-gray-200 shadow-lg text-left rounded-lg grid grid-cols-1 md:grid-cols-3">
                  <div className="space-y-6 xl:space-y-10">
                    <div className="flex justify-center">
                      <a 
                        target="_blank"
                        rel="noreferrer"
                        href={book.href}
                      >
                        <img className="transform hover:scale-110 object-cover mx-auto h-72 w-72 rounded-full" src={book.image} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="px-8 md:pl-4 lg:pl-0 md:pr-16 col-span-2">
                    <div className="text-gray-900 mt-4 font-semibold text-2xl text-italic">
                      <a 
                        target="_blank"
                        rel="noreferrer"
                        href={book.href}
                        className="hover:text-gray-600"
                      >
                        {book.title}
                      </a>
                    </div>
                    <div className="text-gray-900 mt-4 font-medium text-lg">
                      <div className="font-normal text-lg font-semibold text-gray-700">{book.people}</div>
                    </div>
                    <div className="text-gray-900 mt-4 font-medium text-lg">
                      <div className="font-normal text-base text-gray-700 italic">{book.description}</div>
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