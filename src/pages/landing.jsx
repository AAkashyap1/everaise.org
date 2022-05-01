import Footer from '../components/footer'
// import { PayPalButton } from 'react-paypal-button-v2'
import Hero from '../components/landing/Hero'
import Goals from '../components/landing/Goals'
import CallToAction from '../components/landing/CallToAction'
import Numbers from '../components/landing/Numbers'
import GuestSpeakers from '../data/landing/guest'
import Testimonials from '../components/landing/Testimonials'
import Sponsors from '../components/landing/Sponsors'
import Page from '../components/page'
import Donate from '../components/landing/Donate'

export default function Landing() {
  return (
    <Page
      title="Everaise Academy"
      description="By students, for students - making quality education freely accessible to all. We are a group of 50 or so high school and college students who have been successful in a variety of STEM fields, including math, physics, and biology."
    >
      <div className="bg-white">
        <main>
          <Hero />
          <Goals />
          <CallToAction />
          <Numbers />
          <GuestSpeakers />
          <Testimonials />
          <Sponsors />
          <Donate />
        </main>
        <Footer />
      </div>
    </Page>
  )
}