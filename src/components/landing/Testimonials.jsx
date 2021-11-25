import testimonials from '../../data/landing/testimonials'

export default function Testimonials() {
  return (
    <div className="relative bg-white pt-10">
      <div className="mx-auto max-w-md px-4 text-center max-w-4xl lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Testimonials</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
          Trusted by students worldwide.
        </p>
        <div className="mt-12">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((person) => (
              <li key={person} className="px-3 md:px-4 col-span-1" >
                <figure className="shadow-lg border border-gray-200 rounded-xl flex-none" >
                  <blockquote className="rounded-t-xl bg-white px-6 py-8 md:px-10 py-8 text-lg md:text-lg leading-8 md:leading-8 font-semibold text-gray-900">
                    <svg
                      className="mb-3 h-8 w-8 text-cyan-300"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p>{person.testimonial}</p>
                  </blockquote>
                  <figcaption className="flex items-center space-x-4 p-6 md:px-10 py-2 bg-gradient-to-br rounded-b-xl leading-6 font-semibold text-white from-cyan-500 to-blue-300">
                    <div className="flex-auto">{person.name}, {person.course}</div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}