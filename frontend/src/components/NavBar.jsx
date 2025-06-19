import { AutoAwesome } from '@mui/icons-material';

export default function NavBar() {
  return (
    <>
      <div className="flex items-center justify-center pt-5">
        <img
          src="/Home_LOGO.png"
          className="w-25 transition-transform duration-700 ease-in-out hover:rotate-[360deg]"
          alt="Home logo"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#2b3a4b]">COLDCONNECT</h1>
          <p className="text-[#4ccbc4] pl-6">CONNECT . CONVERT</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative group pt-6 w-[120px] h-[120px] flex items-center justify-center">
          <img
            src="/mail_logo.png"
            className="w-[80px] transition-transform duration-300 group-hover:scale-110"
            alt="mail logo"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100 opacity-0 backdrop-blur-md rounded-xl bg-transparent">
            <span className="flex items-center gap-1 whitespace-nowrap text-[#08635e] text-lg font-semibold px-3 py-2 rounded-full bg-white/10 backdrop-blur-md shadow-lg shadow-cyan-400/40 animate-pulse">
              <AutoAwesome fontSize="small" />
              Generate with AI
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
