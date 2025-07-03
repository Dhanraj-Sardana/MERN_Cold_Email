import { useState, useEffect } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Textarea from "../components/textarea";
import Label from "../components/label";
import Papa from "papaparse";
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import Card from "../components/card";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudDoneIcon from '@mui/icons-material/CloudDone';


export default function SendEmail() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState([]); // { email: '', name: '' }
  const [csvName, setCsvName] = useState(null);
  const [email, setEmail] = useState("");

  const getData = async () => {
    const id = localStorage.getItem('CampaignID');
    try {
      const res = await axios.get(`http://localhost:3000/api/campaigns/${id}`, {
        withCredentials: true,
      });
      const { subject, body } = res.data;
      setSubject(subject);
      setBody(body);
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setCsvName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data.map((row) => ({
          email: row.email,
          name: row.name,
        }));
        setRecipients(data);
      },
    });
  };

  const handleAddEmail = () => {
    if (!email) return;
    setRecipients([...recipients, { email, name: "" }]);
    setEmail("");
  };

  const handleSend = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/sendEmails",
        {
          subject,
          body,
          recipients,
        },
        { withCredentials: true }
      );
      alert("Emails sent successfully!");
    } catch (err) {
      console.error("Failed to send emails:", err);
      alert("Failed to send emails.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <h1 className="text-3xl font-bold text-teal-800 flex items-center gap-2 mb-4">
          <EmailIcon fontSize="large" /> Finalize & Send Email
        </h1>

        <div className="space-y-4">
          <div>
            <Label>Email Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Re: Hiring opportunity"
            />
          </div>

          <div>
            <Label>Email Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hi {{name}}, I'm reaching out regarding..."
              rows={8}
            />
            <p className="text-sm text-gray-500 mt-1">
              Use <code>{'{name}'}</code> to personalize with recipient name.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Add Email Manually</Label>
              <div className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                />
                <Button onClick={handleAddEmail}>Add</Button>
              </div>
            </div>

            <div>
              <Label>Upload CSV (name, email)</Label>
              <div className="mt-2">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="csv-upload"
                  className="inline-block cursor-pointer px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-300"
                >
                  <UploadFileIcon fontSize="small" /> 
                </label>
                {csvName && (
                  <p className="text-sm text-teal-600 mt-1">
                    <CloudDoneIcon fontSize="small" /> Uploaded: <span className="font-medium">{csvName}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="mt-4">Recipients Preview</Label>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {recipients.map((r, i) => (
                  <li key={i}>
                    {r.email} {r.name && <span className="text-gray-500">(Name: {r.name})</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl text-lg transition-all duration-300"
            onClick={handleSend}
            disabled={!subject || !body || recipients.length === 0}
          >
            🚀 Send Emails
          </Button>
        </div>
      </Card>
    </div>
  );
}
