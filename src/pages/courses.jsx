import Nav from '../components/global/navs/nav';
import Footer from '../components/footer';
import Page from '../components/page';
import { Link, useHistory } from 'react-router-dom';
import Physics from '../images/courses/Physics.jpg';
import Math from '../images/courses/Math.jpg';
import Biology from '../images/courses/Biology.jpg';
import Astronomy from '../images/courses/Astronomy.jpg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const catalog = [
  {
    name: 'Physics Mechanics',
    img: Physics,
    desc: `A rigorous treatment of mechanics including kinematics, Newton’s laws, collisions, 
          rolling motion, oscillations, fluid statics, fictitious forces, and error analysis.`,
    dates: 'June 26 - July 30',
    link: 'physics'
  },
  {
    name: 'Biology',
    img: Biology,
    desc: `A deep study of theoretical biology, covering a range of topics from cell biology, 
            genetics, and human anatomy and physiology to the mechanisms underlying plant life`,
    dates: 'June 26 - July 23',
    link: 'biology'
  },
  {
    name: 'Math Competitions I',
    img: Math,
    desc: `An intuition-building math competitions course including sequences and series, 
            polynomials, combinatorial identities, triangle centers, and modular arithmetic.`,
    dates: 'June 26 - July 30',
    link: 'math'
  },
  {
    name: 'Astronomy',
    img: Astronomy,
    desc: `An introductory course in astronomy, including celestial coordinates, stellar systems, 
            and cosmology in addition to important physics topics such as orbital mechanics.`,
    dates: 'June 26 - July 30',
    link: 'astronomy'
  }
];

const courses = [
  {
    course: 'Physics Mechanics',
    dates: 'June 26 - July 30, 2022',
    head: 'Ashmit Dutta / Evan Kim',
    hours: ['TBD'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Biology',
    dates: 'June 26 - July 23, 2022',
    head: 'Krish Jayarapu',
    hours: ['TBD'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Astronomy',
    dates: 'June 26 - July 30, 2022',
    head: 'Abhay Bestrapalli / Jeffrey Wei / Faraz Ahmed',
    hours: ['TBD'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Math Competitions I',
    dates: 'June 26 - July 30, 2022',
    head: 'Matthew Chen / Kiran Sun',
    hours: ['TBD'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Physics Mechanics',
    dates: 'June 21 – August 6, 2021',
    head: 'Ashmit Dutta',
    hours: ['Tuesday 11 AM ET', 'Saturday 11 AM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Biology',
    dates: 'July 5 – August 6, 2021',
    head: 'Krish Jayarapu',
    hours: ['Monday 11 AM ET', 'Thursday 11 AM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Astronomy',
    dates: 'July 12 - August 6, 2021',
    head: 'Chooi Je Qin',
    hours: ['Wednesday 5 AM and 5 PM ET', 'Sunday 5 AM and 5 PM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Math Competitions I',
    dates: 'July 12 – August 6, 2021',
    head: 'Matthew Chen / Kiran Sun',
    hours: ['Tuesday 11 PM ET', 'Thursday 11 PM ET', 'Saturday 11 PM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Astronomy',
    dates: 'June 29 – July 31, 2020',
    head: 'Gregory Pylypovych',
    hours: ['Weekdays, 2 AM and 2 PM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Biology',
    dates: 'June 29 – July 31, 2020',
    head: 'Justin Shan',
    hours: ['Weekdays, 1 AM and 4 PM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Math Competitions I',
    dates: 'June 29 – July 31, 2020',
    head: 'Saadiq Shaikh',
    hours: ['Weekdays, 2 AM and 2 PM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Math Competitions II',
    dates: 'June 29 – July 31, 2020',
    head: 'Andrew Wu',
    hours: ['Weekdays, 12 AM and 1 PM ET'],
    cost: '$0',
    status: 'ended'
  },
  {
    course: 'Physics Mechanics',
    dates: 'June 29 – July 31, 2020',
    head: 'Brian Lee / William Shi',
    hours: ['Weekdays, 1 AM and 2 PM ET'],
    cost: '$0',
    status: 'ended'
  }
];

const statusStyles = {
  'enroll Now!': 'bg-green-100 text-green-800',
  ended: 'bg-red-100 text-red-800'
};

export default function Courses() {
  const history = useHistory();

  function enroll(course) {
    console.log(course);
    if (course.status.split(' ').length === 2) {
      history.push('/enroll');
    }
  }

  return (
    <Page
      title="Courses - Everaise Academy"
      description="Our full course list is listed below, along with their start and end dates. 
      As of now, each course is offered one time throughout the year, during summer. 
      Each offering covers the same material as other offerings of that course. Click 
      any course name below for more information about that course. All times are 
      listed in ET = UTC-4. Click any time below to view its conversion to other time 
      zones."
    >
      <Nav />
      <div className="my-5 bg-white">
        <div className="mx-auto pt-6 pb-12 px-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="-mb-4 space-y-6 xl:max-w-none">
              <h2 className="font-extrabold text-gray-900 tracking-tight text-4xl">
                Course Offerings
              </h2>
              <p className="text-xl text-gray-500">
                Our full course list is listed below, along with their start and
                end dates. As of now, each course is offered one time throughout
                the year, during summer. Each offering covers the same material
                as other offerings of that course. Click any course name below
                for more information about that course. All times are listed in
                ET = UTC-4. Click any time below to view its conversion to other
                time zones.
              </p>
            </div>
            <ul className="flex jusify-center grid space-y-5 md:space-y-8">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-gray-900 tracking-tight">
                  Course Catalog
                </h2>
                <p className="text-xl text-gray-500">
                  Below are all of our courses. Click on any course below for
                  more details about each course, including the dates and times
                  of upcoming classes.
                </p>
              </div>
              <div className="space-y-4">
                {catalog.map((course) => (
                  <div className="border border-gray-200 shadow-lg text-left rounded-lg grid grid-cols-4">
                    <div className="space-y-6 hidden md:block col-span-0 md:col-span-1">
                      <img
                        className="rounded-l-lg w-72 h-80 md:h-60"
                        src={course.img}
                        alt=""
                      />
                    </div>
                    <div className="px-8 pb-6 pt-3 md:py-6 col-span-4 md:col-span-3">
                      <div className="text-gray-900 mt-4 font-semibold text-2xl text-italic">
                        {course.name}
                      </div>
                      <div className="text-gray-900 mt-4 font-medium">
                        <div className="font-normal text-base md:text-lg text-gray-700 italic">
                          {course.desc}
                        </div>
                        <Link to={`/course/${course.link}`} key={course.name}>
                          <button className="py-1 px-4 rounded-md bg-blue-500 unfocus hover:bg-blue-600 mt-4 font-normal text-sm text-white">
                            More info &rarr;
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="mt-5 mb-3 text-3xl font-bold text-gray-900 tracking-tight">
                  Class Schedule
                </h2>
                <p className="text-xl text-gray-500">
                  Information for summer 2022 courses has been posted.
                </p>
              </div>
              <div className="xl:hidden">
                <ul className="border border-gray-200 rounded-md mt-2 divide-y divide-gray-200 ">
                  {courses.map((course) => (
                    <li key={course.course}>
                      <div className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate text-gray-900 font-medium">
                                {course.course}
                                <span
                                  onClick={() => enroll(course)}
                                  className={classNames(
                                    statusStyles[course.status],
                                    course.status.split(' ').length === 2
                                      ? 'cursor-pointer'
                                      : '',
                                    'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                  )}
                                >
                                  {course.status}
                                </span>
                              </span>
                              <span>
                                <span className="text-gray-900 font-medium">
                                  {course.cost}
                                </span>{' '}
                              </span>
                              <span className="mb-2">Head - {course.head}</span>
                              <time dateTime={course.dates}>
                                {course.dates}
                              </time>
                              <div className="flex hidden sm:block">
                                {course.hours.map((hour, index) => {
                                  return (
                                    <span
                                      className={classNames(
                                        'inline',
                                        index === 0 ? '' : 'ml-1'
                                      )}
                                      key={hour}
                                    >
                                      {hour}
                                      {index === course.hours.length - 1
                                        ? ' '
                                        : ','}
                                    </span>
                                  );
                                })}
                              </div>
                            </span>
                          </span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden xl:block">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dates
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Head Instructors
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                          <tr key={course.course} className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">
                                {course.course}{' '}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">
                                {course.dates}{' '}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {course.hours.map((hour) => (
                                <p className="text-gray-500 font-medium">
                                  {hour}
                                </p>
                              ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-500 font-medium">
                                {course.head}{' '}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">
                                {course.cost}{' '}
                              </span>
                            </td>
                            <td className="text-right px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span
                                onClick={() => enroll(course)}
                                className={classNames(
                                  statusStyles[course.status],
                                  course.status.split(' ').length === 2
                                    ? 'cursor-pointer'
                                    : '',
                                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                )}
                              >
                                {course.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </Page>
  );
}
