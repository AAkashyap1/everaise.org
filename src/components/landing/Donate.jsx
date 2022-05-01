export default function Donate() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block mb-1">Want to support the Everaise Academy?</span>
          <span className="block">Donate to us!</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex">
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_blank"
            >
              <input
                type="hidden"
                name="hosted_button_id"
                defaultValue="DS587RY7M3CDG"
              />
              <button
                type="submit"
                className="shadow inline-flex items-center justify-center px-12 py-3 border border-transparent text-base font-medium rounded-md text-yei-primary-dark bg-cyan-600 text-white"
              >
                Donate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}