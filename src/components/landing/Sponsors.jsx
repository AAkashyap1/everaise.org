import partners from '../../data/landing/partners'
import sponsors from '../../data/landing/sponsors'

export default function Sponsors() {
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Partners
          </p>
          <div className="flow-root ">
            <div className="flex flex-wrap sm:flex-row justify-center">
              {partners.map((s) => {
                let key = s.name.replace(/[\W_]+/g, '-').toLowerCase()
                return (
                  <div key={key} className="mt-4 px-4 lg:px-8 items-center flex">
                    <div>
                      <img
                        className="sm:my-0 h-auto w-72 mx-auto"
                        src={s.image}
                        alt={s.name}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          <p className="text-center mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Sponsors
          </p>
          <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-2 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <div className="rounded-l-sm col-span-1 flex justify-center py-4 px-4">
                <img className="max-h-12 sm:max-h-16" src={sponsor.image} alt={sponsor.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}