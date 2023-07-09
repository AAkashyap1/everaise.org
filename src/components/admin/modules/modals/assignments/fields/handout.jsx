export default function Handout(props) {
  return (
    <div
      className={
        'border-l-2 border-gray-300 pl-3 ml-1' +
        (props.index === 0 ? ' mt-3' : ' mt-4')
      }
    >
      <input
        required
        value={props.name}
        onChange={(e) => props.updateName(props.index, e.target.value)}
        placeholder="Enter handout name"
        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <input
        required
        value={props.link}
        onChange={(e) => props.updateLink(props.index, e.target.value)}
        placeholder="Enter handout link"
        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
}
