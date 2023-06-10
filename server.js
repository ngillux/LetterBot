console.log("Building Recommendation Bot.");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const PORT = 8000;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(cors());
/* ==================== MAKE API REQUEST ====================  */

// POST request to the OpenAI completions endpoint
// req = request params from frontend
// res = response from OpenAI completions endpoint
app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "How far is the sun from the earth?" },
      ],
      max_tokens: 10,
    }),
  }; // end options object

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

/* ==================== SERVER RUNNING ====================  */
app.listen(PORT, () => {
  console.log("Your servyserve is running on Port: " + PORT + ".");
});

module.exports = app;
