import { Fragment } from 'react'
import { Link,/* useHistory, useParams */} from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import Launch from '../../../images/launch.png'
import {
  XIcon,
} from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideNav(props) {
  /*
  const history = useHistory();
  const { course } = useParams();
  
  function RefreshModule(event, moduleVal, id) {
    event.preventDefault()
    history.push(`/homework/${course}/${moduleVal}/${id}`)
    history.go(0)
  }
  */

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={props.sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={props.sidebarOpen}
          onClose={() => props.setSidebarOpen(!props.sidebarOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link to="/landing">
                  <img
                    className="h-12 w-auto"
                    src={Launch}
                    alt="Everaise logo"
                  ></img>
                </Link>
              </div>
              <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {props.navigation.map((item) => (
                    item.href === '' ? 
                      <p
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </p> : 
                      item.href.startsWith('https') ?
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </a> :
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {props.secondaryNavigation.map((item) => (
                      item.href === '' ? 
                        <p
                          className={classNames(
                            item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md'
                          )}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </p> : 
                        item.href.startsWith('https') ?
                          <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className={classNames(
                              item.href === module ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                          >
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </a> :
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                          >
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </Link> 
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/landing">
                <img
                  className="h-12 w-auto"
                  src={Launch}
                  alt="Everaise logo"
                ></img>
              </Link>
            </div>
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {props.navigation.map((item) => (
                  item.href === '' ? 
                    <p
                      className={classNames(
                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                      )}
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </p> : 
                    item.href.startsWith('https') ?
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </a> :
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {props.secondaryNavigation.map((item) => (
                    item.href === '' ? 
                      <p
                        className={classNames(
                          item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {item.name}
                      </p> : 
                      item.href.startsWith('https') ? 
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                          )}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </a> :
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                          )}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}