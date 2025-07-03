// pages/EditCampaign.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/card";
import Input from "../components/input";
import Textarea from "../components/textarea";
import Button from "../components/button";
import Label from "../components/label";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/campaigns/${id}`, {
        withCredentials: true,
      });
      const { campaignName, subject, body, followUps } = res.data;
      setCampaignName(campaignName);
      setSubject(subject);
      setBody(body);
      setFollowUps(followUps || []);
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
      navigate("/dashboard");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/campaigns/${id}`,
        {
          campaignName,
          subject,
          body,
          followUps,
        },
        { withCredentials: true }
      );
      navigate("/dashboard",{ replace: true });
    } catch (err) {
      console.error("Failed to update campaign:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="p-4 space-y-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-4">Edit Campaign</h1>

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

        {followUps.length > 0 && (
          <div className="space-y-2">
            <Label>Follow-Up</Label>
            {followUps.map((fup, idx) => (
              <div key={idx} className="space-y-1 border p-2 rounded-md">
                <Input
                  type="number"
                  min={1}
                  value={fup.delayInDays}
                  onChange={(e) => {
                    const updated = [...followUps];
                    updated[idx].delayInDays = e.target.value;
                    setFollowUps(updated);
                  }}
                  placeholder="Delay in days"
                />
                <Input
                  value={fup.subject}
                  onChange={(e) => {
                    const updated = [...followUps];
                    updated[idx].subject = e.target.value;
                    setFollowUps(updated);
                  }}
                  placeholder="Follow-Up Subject"
                />
                <Textarea
                  rows={4}
                  value={fup.bodyTemplate}
                  onChange={(e) => {
                    const updated = [...followUps];
                    updated[idx].bodyTemplate = e.target.value;
                    setFollowUps(updated);
                  }}
                  placeholder="Follow-Up Body"
                />
              </div>
            ))}
          </div>
        )}

        <Button onClick={handleUpdate} >
          Update Campaign
        </Button>
      </Card>
    </div>
  );
}
