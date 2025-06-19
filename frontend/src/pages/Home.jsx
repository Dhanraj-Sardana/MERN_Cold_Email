import { useState } from "react";
import  Button  from "../components/button.jsx";
import  Card  from "../components/card";
import Input  from "../components/input";
import  Textarea  from "../components/textarea";
import Label  from "../components/label";
import GenerateAI from "../components/generateAI.jsx";

export default function HomePage() {
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [followUpEnabled, setFollowUpEnabled] = useState(false);
  const [followUpDelay, setFollowUpDelay] = useState(2);
  const [followUpSubject, setFollowUpSubject] = useState("");
  const [followUpBody, setFollowUpBody] = useState("");

  const handleSubmit = () => {
    const data = {
      campaignName,
      subject,
      body,
      followUps: followUpEnabled
        ? [
            {
              delayInDays: followUpDelay,
              subject: followUpSubject,
              bodyTemplate: followUpBody,
            },
          ]
        : [],
    };

    console.log("Submitting campaign:", data);
    // TODO: Call backend API to save campaign
  };

  return (
    <div className="p-6  max-w-3xl mx-auto ">
       
      <Card className="p-4 space-y-4">
        
          <div>
            <Label>Campaign Name</Label>
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Product Launch Q3"
            />
          </div>
          <div>
            <Label>Email Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Quick question about your hiring needs..."
            />
          </div>
          <div>
            <Label>Email Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hi {{name}}, I came across your profile..."
              rows={6}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={followUpEnabled}
              onChange={() => setFollowUpEnabled(!followUpEnabled)}
            />
            <Label>Enable Follow-Up</Label>
          </div>
          {followUpEnabled && (
            <div className="space-y-4">
              <div>
                <Label>Follow-Up Delay (in days)</Label>
                <Input
                  type="number"
                  min={1}
                  value={followUpDelay}
                  onChange={(e) => setFollowUpDelay(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Follow-Up Subject</Label>
                <Input
                  value={followUpSubject}
                  onChange={(e) => setFollowUpSubject(e.target.value)}
                  placeholder="Just checking in..."
                />
              </div>
              <div>
                <Label>Follow-Up Body</Label>
                <Textarea
                  value={followUpBody}
                  onChange={(e) => setFollowUpBody(e.target.value)}
                  placeholder="Hi {{name}}, just following up on my previous message..."
                  rows={5}
                />
              </div>
            </div>
          )}
          <div className="flex justify-center">
          <Button className="w-1/2 p-1 rounded-xl bg-[#30cfd0] hover: hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] hover:scale-110 transition ease hover:bg-teal-400 font-bold" onClick={handleSubmit}>
            Launch Campaign 
          </Button>
        </div>
      </Card>
    
    </div>
  );
}
