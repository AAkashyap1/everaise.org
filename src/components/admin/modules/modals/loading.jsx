import { Dialog } from "@headlessui/react";
import { CogIcon } from "@heroicons/react/solid";

export default function Loading() {
  return (
    <div>
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100">
        <CogIcon className="animate-spin h-6 w-6 text-cyan-600" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
          This may take a minute. Do not exit the page.
        </Dialog.Title>
      </div>
    </div>
  )
}