export default function Button({className="", children, ...props }) {
  return (
    <button
      className= {` bg-[#30cfd0] hover:scale-105 transition ease hover:bg-teal-400 text-white font-semibold py-2 px-4 rounded-xl shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
