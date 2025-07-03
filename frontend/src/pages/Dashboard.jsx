import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/campaigns", {
        withCredentials: true,
      });
      setCampaigns(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/signin");
      } else {
        console.error("Error fetching campaigns", err);
      }
    } 
  };

  const handleSendEmail = (id) => {
    localStorage.setItem('CampaignID', id);
    navigate('/email');
  };

  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/campaigns/${id}`, {
        withCredentials: true,
      });
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete campaign:", err);
    }
  };

  const editCampaign = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#0f172a] mb-8 border-b pb-4">
        📊 My Campaigns
      </h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">No campaigns launched yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign._id}
              className="bg-white shadow-lg rounded-2xl p-6 transition-transform duration-300 flex flex-col justify-between hover:scale-[1.02]"
            >
              <div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#1e293b]">
                  {campaign.campaignName}
                </h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(campaign.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Updated: {new Date(campaign.updatedAt).toLocaleString()}
                </p>

                <p className="text-gray-700">
                  <strong>Subject:</strong> {campaign.subject}
                </p>
                <p className="text-gray-700 truncate">
                  <strong>Body:</strong> {campaign.body}
                </p>
              </div>

              {campaign.followUps?.length > 0 && (
                <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h3 className="text-sm font-bold text-[#0f766e] mb-1">
                    📩 Follow-Up Emails
                  </h3>
                  {campaign.followUps.map((follow, idx) => (
                    <div key={idx} className="text-gray-600 text-sm mb-2 pl-2 border-l-2 border-teal-400">
                      ⏱ <strong>Delay:</strong> {follow.delayInDays} day(s)<br />
                      ✉️ <strong>Subject:</strong> {follow.subject}<br />
                      📝 <strong>Body:</strong> {follow.bodyTemplate.slice(0, 50)}...
                    </div>
                  ))}
                </div>
              )}
</div>
              <div className="flex justify-between  mt-6">
                <Button
                  onClick={() => handleSendEmail(campaign._id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <SendIcon fontSize="small" />
                  Send Email
                </Button>

                <div className="flex gap-2">
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteCampaign(campaign._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => editCampaign(campaign._id)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
