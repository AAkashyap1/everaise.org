import goals from '../../data/landing/goals';

export default function Goals() {
  return (
    <div className="relative bg-white pt-16 pb-16">
      <div
        id="about"
        className="mx-auto max-w-md px-4 text-center max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl"
      >
        <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
          Our Mission
        </h2>
        <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
          Committed to building a deeper understanding.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <div key={goal.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-by-500 to-cyan-600 rounded-md shadow-lg">
                        <goal.icon
                          className="h-7 w-7 text-indigo-500"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {goal.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
