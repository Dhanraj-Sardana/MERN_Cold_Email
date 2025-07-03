import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const generateWithAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const message = response.data.choices[0].message.content;
    res.json({ response: message });

  } catch (error) {
    console.error("OpenAI API failed:", error.response?.data || error.message);
    res.status(500).json({ message: "OpenAI API failed." });
  }
};

export default generateWithAi;
