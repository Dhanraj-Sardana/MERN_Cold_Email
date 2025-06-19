export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl  shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 ${className}`}>
      {children}
    </div>
  );
}
