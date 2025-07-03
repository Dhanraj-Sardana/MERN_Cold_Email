import { useState } from "react";
import Input from "../components/input";          
import Button from "../components/button";        
import Textarea from "../components/textarea";     
import Card from "../components/card";
import Label from "../components/label";
import axios from "axios";
import { AutoAwesome } from "@mui/icons-material";

export default function GenAiPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/genai", 
        { prompt },
        { withCredentials: true }
      );
      setResponse(res.data.response || "No response received.");
    } catch (err) {
      console.error(err);
      setError("Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
    <Card className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#30cfd0]"> <AutoAwesome/> Generate Cold Email / Prompt Response</h2>

      <div className="space-y-2">
        <Label>Enter Prompt</Label>
        <Input
          placeholder="e.g. Write a cold email for a web development service"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <Button
          className="bg-teal-500 hover:bg-teal-600 font-semibold w-1/2"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm font-semibold">{error}</p>
      )}

      {response && (
        <div className="mt-4">
          <Label>AI Response</Label>
          <Textarea value={response} readOnly rows={8} className="bg-white/10 backdrop-blur-md" />
        </div>
      )}
    </Card>
    </div>
  );
}
