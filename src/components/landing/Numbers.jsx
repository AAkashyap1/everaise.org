import CountUpOnce from '../../utility/count';
import PhysicsCalc from '../../images/physics.png';
import metrics from '../../data/landing/metrics';

export default function Numbers() {
  return (
    <div className="relative bg-gray-50">
      <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
        <div className="h-full w-full xl:grid xl:grid-cols-2">
          <div className="h-full xl:relative xl:col-start-2">
            <img
              className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
              src={PhysicsCalc}
              alt="Chalkboard"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              By the numbers
            </span>
          </h2>
          <p className="mt-3 text-xl font-bold text-gray-900">
            We're a group of high school and college students who have been
            successful in a variety of STEM fields, including math, physics,
            astronomy, and biology.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            {metrics.map((item) => (
              <p key={item.id}>
                <span className="block text-4xl font-bold text-gray-900">
                  <CountUpOnce end={item.end} suffix={item.suffix} />
                </span>
                <span className="mt-1 block text-gray-700">
                  <span className="text-xl font-medium text-gray-9000">
                    {item.emphasis}
                  </span>{' '}
                  {item.rest}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
