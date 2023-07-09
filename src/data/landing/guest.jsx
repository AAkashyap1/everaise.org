import { Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import speakers from '../../data/guestSpeakers';

const bp = [
  { width: 1, itemsToShow: 1 },
  { width: 450, itemsToShow: 2 },
  { width: 700, itemsToShow: 3 },
  { width: 950, itemsToShow: 4 }
];

function Arrow({ type, onClick, isEdge }) {
  const pointer =
    type === 'PREV' ? (
      <ArrowLeftIcon
        className={`${
          isEdge
            ? 'text-gray-400 cursor-not-allowed'
            : 'cursor-pointer text-gray-900'
        } unfocus block h-8 w-8`}
      />
    ) : (
      <ArrowRightIcon
        className={`${
          isEdge
            ? 'text-gray-400 cursor-not-allowed'
            : 'cursor-pointer text-gray-900'
        } unfocus block h-8 w-8`}
      />
    );
  return (
    <button onClick={onClick} disabled={isEdge}>
      {pointer}
    </button>
  );
}

export default function GuestSpeakers() {
  return (
    <div className="relative bg-white pt-16 pb-4">
      <div className="mx-auto max-w-md px-4 text-center max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
          Everaise Academy Event
        </h2>
        <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
          Guest Speakers
        </p>
        <p className="mt-4 text-base text-gray-700 sm:text-lg">
          Every year, Everaise Academy invites professors from prestigious
          universities, industry professionals, and top graduate and
          undergraduate students to give free talks.{' '}
          <span className="text-indigo-500">
            <Link to="/events/guest-speakers">Learn more &rarr;</Link>
          </span>
        </p>
        <div className="mt-12">
          <div>
            <Carousel
              className="flex justify-center flex-col border-gray-200 py-3 gap-8"
              breakPoints={bp}
              pagination={false}
              renderArrow={Arrow}
            >
              {speakers.map((speaker) => (
                <div key={speaker.name} className="py-6 px-2">
                  <div className="flow-root border border-gray-200 shadow-lg rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full p-1 shadow-lg">
                          <img
                            alt={speaker.name}
                            src={speaker.imageUrl}
                            className="h-44 w-44 rounded-full object-cover text-indigo-500"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-5 sm:text-xl text-lg font-medium text-gray-900 tracking-tight">
                        {speaker.title}
                      </h3>
                      <h3 className="mt-1 text-base font-medium text-gray-700 tracking-tight">
                        {speaker.name}
                      </h3>
                      <h3 className="mt-3 text-lg font-medium text-gray-900 tracking-tight">
                        {speaker.date}
                      </h3>
                      <a
                        href={speaker.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 hover:text-indigo-700 trans-300 text-indigo-500"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="youtube"
                          className="svg-inline--fa fa-youtube fa-w-18 h-4 w-4 mr-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                          ></path>
                        </svg>{' '}
                        View Talk
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
