export default function Textarea(props) {
  return (
    <textarea
      className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
      {...props}
    />
  );
}
