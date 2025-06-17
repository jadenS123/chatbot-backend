// index.js

// 1. IMPORT LIBRARIES
// =================================================================
const express = require('express');
const cors = require('cors');
// NEW: Import the Google AI SDK
const { GoogleGenerativeAI } = require('@google/generative-ai');
// NEW: Import and configure dotenv to read our .env file
require('dotenv').config();


// 2. INITIALIZE THE APP
// =================================================================
const app = express();
const PORT = 8000;


// 3. CONFIGURE THE AI MODEL
// =================================================================
// Get the API key from our .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Specify the model we want to use
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


// 4. APPLY MIDDLEWARE
// =================================================================
app.use(cors());
app.use(express.json());


// 5. DEFINE THE API ENDPOINT (THE ROUTE)
// =================================================================
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage);

    // --- This is the core of the "Brain" ---
    // 1. The Knowledge Base: This is all the information you want the chatbot to know.
    //    It ONLY uses this information to answer questions.
    const knowledgeBase = `
      My name is Jaden. I am a rising junior majoring in Computer Engineering with a minor in Buisness Administration. I am from
      I study at [Your University] and my expected graduation is [Date].
      My key skills include:
      - Programming Languages: Python, C++, JavaScript
      - Frameworks: React, Next.js, Node.js, Express.js
      - Tools: Git, GitHub, Docker, VS Code
      - Key Courses: Data Structures & Algorithms, Computer Architecture, Operating Systems.
      Project Experience:
      - Project 1: Built this AI-powered portfolio chatbot using the MERN stack (MongoDB, Express, React, Node.js) and the Google Gemini API.
      - Project 2: Developed a home automation system using a Raspberry Pi and Python.
      Contact Information:
      - Email: [jsulaimantx@gmail.com]
      - LinkedIn: [your-linkedin-url]
      - GitHub: [your-github-url]
    `;

    // 2. The Prompt: We combine the knowledge base with instructions and the user's question.
    const prompt = `
      You are a professional, helpful chatbot for Jaden's portfolio website.
      Your sole purpose is to answer questions from recruiters based ONLY on the information provided in the following KNOWLEDGE BASE.
      Do not make anything up. If a question is asked that cannot be answered with the provided information,
      politely say "I don't have that information, but you can contact Jaden directly at [your-email@example.com]."

      KNOWLEDGE BASE:
      ---
      ${knowledgeBase}
      ---

      RECRUITER'S QUESTION: "${userMessage}"

      YOUR ANSWER:`;

    // 3. Generate the response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    console.log('AI Response:', responseText);

    // Send the AI's response back to the frontend
    res.json({ reply: responseText });

  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
});


// 6. START THE SERVER
// =================================================================
app.listen(PORT, () => {
  console.log(`✅ AI-powered server is running on http://localhost:${PORT}`);
});