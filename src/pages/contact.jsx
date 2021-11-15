import Nav from '../components/nav';
import Footer from '../components/footer'
import { useEffect } from 'react'  

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us - Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div>
      <Nav />
      <div className="mt-5 bg-white">
        <div className="mx-auto pb-2 pt-6 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Contact Us</h2>
              <p className="text-xl text-gray-500">
              Questions or concerns? Send an email to {' '}
              <span className="text-indigo-500">
                <a 
                  href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=info@everaise.org`}
                  target="_blank"
                  rel="noreferrer"
                >
                  info@everaise.org
                </a>
              </span>
              {' '} (alternate {' '}
              <span className="text-indigo-500">
                <a 
                  href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=everaise.academy@gmail.com`}
                  target="_blank"
                  rel="noreferrer"
                >
                  everaise.academy@gmail.com
                </a>
              </span>
              ), or use the following form: {' '}
              <embed className="my-10 h-screen w-full" src="https://docs.google.com/forms/d/e/1FAIpQLSf3K3g-ET3cAM3n0QfPQGZjlcQlh_D7owXIaPbrUAmq5i_bsg/viewform?embedded=true" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}