import Button from "./button"
import { AutoAwesome } from '@mui/icons-material'
export default function GenerateAI() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl font-extrabold">►  Generate With AI ◄</h1> 
<Button className="hover:scale-105 hover:bg-teal-300 py-2 px-4 rounded-xl bg-teal-600 ease transition"><AutoAwesome />
        <span>Generate</span></Button>
    </div>
  )
}
