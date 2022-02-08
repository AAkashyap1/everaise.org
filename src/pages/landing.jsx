import { useEffect } from 'react'
import Footer from '../components/footer'
// import { PayPalButton } from 'react-paypal-button-v2'
import Hero from '../components/landing/Hero'
import Goals from '../components/landing/Goals'
import CallToAction from '../components/landing/CallToAction'
import Numbers from '../components/landing/Numbers'
import GuestSpeakers from '../data/landing/guest'
import Testimonials from '../components/landing/Testimonials'
import Sponsors from '../components/landing/Sponsors'

export default function Landing() {
  useEffect(() => {
    document.title = 'Everaise Academy'
    window.scrollTo(0, 0)
  })

  return (
    <div className="bg-white">
      <main>
        <Hero />
        <Goals />
        <CallToAction />
        <Numbers />
        <GuestSpeakers />
        <Testimonials />
        <Sponsors />
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