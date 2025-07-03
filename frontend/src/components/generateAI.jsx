import { useNavigate } from 'react-router-dom';
import { AutoAwesome } from '@mui/icons-material'
export default function GenerateAI() {
  const navigate=useNavigate();
  const handleGenerateAI= async ()=>{
    navigate('/genAiPrompt');
  }
  return (
   <div className="flex justify-center">
        <div className="relative group pt-6 w-[120px] h-[120px] flex items-center justify-center">
          <img
            src="/mail_logo.png"
            className="w-[80px] transition-transform duration-300 group-hover:scale-110"
            alt="mail logo"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100 opacity-0 backdrop-blur-md rounded-xl bg-transparent">
            <button className="flex items-center gap-1 whitespace-nowrap text-[#08635e] text-lg font-semibold px-3 py-2 rounded-full bg-white/10 backdrop-blur-md shadow-lg shadow-cyan-400/40 animate-pulse"onClick={handleGenerateAI} >
              <AutoAwesome fontSize="small" />
              Generate with AI
            </button>
          </div>
        </div>
      </div>
  )
}
