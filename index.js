// index.js

// 1. IMPORT LIBRARIES
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// 2. INITIALIZE THE APP
const app = express();
const PORT = 8000;

// 3. CONFIGURE THE AI MODEL
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// 4. APPLY MIDDLEWARE
app.use(cors());
app.use(express.json());

// 5. DEFINE THE API ENDPOINT (THE ROUTE)
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage);

    // This is the AI's "brain" with all your personal data.
    const knowledgeBase = `
      ---
      ABOUT ME:
      - My name is Jaden Sulaiman. I am an Aspiring Engineer with a Passion for Software and Hardware.
      - I was born on March 31, 2005
      - I am a student at The University of Texas at San Antonio (UTSA).
      - The UTSA college I attend is the KLESSE College of Engineering and Integrated Design.
      - My major is Computer Engineering and my minor is in Business Administration.
      - I am from Houston, Texas.
      - I currently live in San Antonio, Texas.
      - My expected graduation date is May 2027.
      - Jaden is class of 2027.
      - I am a rising sophomore in college.
      - I have a strong interest in software engineering, hardware engineering, and AI.
      - I am passionate about creating elegant solutions to complex problems.
      - I am currently seeking Computer Engineer and Software Engineer roles for Summer 2026.
      - I am an entrepreneur; I founded JTF Studios, a Media Agency, in 2024.
      - JTF STUDIOS is a media agency that specializes in photography, videography, and digital marketing services.
      - I love to go to the gym and work out.
      - I do day trading and I am a big fan of the stock market.
      - I love to listen to lots of music.
      - I love to travel and explore new places.
      - I love food and trying new cuisines.
      - I am a big fan of technology and always stay updated with the latest trends.
      - I am a lifelong learner and enjoy taking on new challenges.
      - I am a creative thinker and enjoy brainstorming innovative ideas.
      - I am a team player and enjoy collaborating with others to achieve common goals.
      - I am a Christian and I am involved in my church community.



      // --- UPDATED LINKS SECTION WITH MARKDOWN FORMAT ---
      PROFESSIONAL & CREATIVE LINKS:
      - You can find [Jaden's LinkedIn Profile](https://www.linkedin.com/in/jadensulaiman) here.
      - You can find [Jaden's GitHub Profile](https://github.com/jadenS123) here.
      - You can find his photography work at [JTF Studios](https://www.jtfstudios.com).
      
      CONTACT INFORMATION:
      - The best email to reach me at is: jsulaimantx@gmail.com
      - My phone number is: (346) 445-1334.

      SKILLS:
      - Programming Languages: TypeScript, JavaScript, Python, C/C++, MATLAB
      - Frameworks & Libraries: React, Next.js, Node.js, Express.js
      - Web Development: Frontend and Backend Development, RESTful APIs
      - Tools & Platforms: Git, GitHub, Docker, Vercel, Railway
      - Hardware Engineering: Circuit Design, Digital Logic Design
      - AI & Machine Learning: Familiar with AI concepts and APIs, including Google Gemini API
      - CS Fundamentals: Data Structures, Algorithms, Object-Oriented Programming
      - Database Management: Basic knowledge of SQL and NoSQL databases
      - Operating Systems: Windows, macOS
      - Cloud Services: Familiar with AWS and cloud deployment
      - Soft Skills: Strong problem-solving abilities, effective team collaboration, and excellent communication skills.

      PROFESSIONAL EXPERIENCE:
      - The University of Texas at San Antonio (UTSA):
        - Position: Student Assistant
        - Duration: September 2023 - December 2023
        - Responsibilities:
          - Streamlined support processes using the ServiceNow platform, managing a weekly volume of 50+ inquiries to improve department efficiency and response times. 
          - Ensured 100% data integrity for all entries by generating and reviewing detailed queries, maintaining consistency across department records. 
         - Overhauled the department's email management system, resulting in more reliable follow-up and a more organized communication workflow.
      
      - Tennis Express:
        - Position: Logistics Operations Assistant
        - Duration: May 2022 - August 2022
        - Responsibilities:
          - Optimized the inventory workflow for incoming and outgoing goods by leveraging inventory control systems, significantly improving stock accuracy. 
          - Engineered more efficient shipping and receiving processes that reduced package handling time and maintained high operational throughput
          - Implemented a new systematic organization strategy for warehouse storage, leading to faster order fulfillment and fewer picking errors.

      - Harris County District Clerk's Office:
        - Position: Electronic Support Specialist
        - Duration: October 2022 - November 2022
        - Responsibilities:
          - Served as a key technical resource for court staff, troubleshooting and resolving issues with electronic filing systems to ensure critical operational continuity. 
          - Upheld strict data integrity and security protocols within the court's official records management system, safeguarding sensitive information. 
          - Collaborated with legal staff to re-engineer document handling workflows, which improved filing efficiency and reduced procedural errors.

      PROJECT EXPERIENCE:
      - Personal AI Chatbot:
          - Architected and deployed a full-stack, AI-powered chatbot to serve as a dynamic, interactive resume, allowing recruiters to retrieve my qualifications via natural language conversations. 
          - Constructed a scalable and efficient backend using Node.js and Express.js, featuring a secure RESTful API that serves as the communication bridge between the user interface and the Google AI service. 
          - Leveraged the Google Generative AI (Gemini) SDK to drive the chatbot's core logic, meticulously crafting the AI's knowledge base and persona to ensure accurate and personalized responses. 
          - Developed a performant, server-rendered front-end with Next.js and TypeScript, creating a seamless user interface that prioritizes fast load times and a fluid conversational experience.

      - Forage JP Morgan Software Engineering Virtual Experience:
          - Configured a complete Python development environment using Git and data analysis libraries to establish a professional-grade workflow. 
          - Developed Python scripts to process and analyze real-time financial data streams, preparing raw data for effective visualization. 
          - Implemented a live data visualization graph using JPMorgan Chase’s proprietary ‘Perspective’ library, creating a user-friendly interface for traders to monitor real-time stock prices.

    LEADERSHIP INVOLVEMENT & ACTIVITIES:
      - ColorStack Active Member:
        - Actively participate in a national community dedicated to increasing the number of Black and Latinx computer science graduates.
        - Engage in technical workshops, career-readiness events, and networking opportunities with professionals from leading tech companies.

      - National Society of Black Engineers (NSBE) Active Member:
        - Collaborate with a diverse group of peers on engineering-related initiatives, enhancing teamwork and problem-solving skills.
        - Participate in professional development workshops, gaining industry insights and networking with engineering professionals.
    
    CLUBS & ORGANIZATIONS:
      - National Society of Black Engineers (NSBE)
      - Student of Valor (SOV): A Christian student organization at UTSA.
      - African Student Association (ASA)


      // --- UPDATED RESUME SECTION WITH MARKDOWN FORMAT ---
      RESUME:
      - When asked for my resume, respond with this exact markdown link: [Download Jaden's Resume](https://drive.google.com/file/d/1YqHJ17tce4nkl1tsocrd23AoPxGCd-GG/view?usp=sharing)
      ---
    `;

    // === UPDATED PROMPT WITH NEW PERSONALITY INSTRUCTIONS ===
    const prompt = `
      You are a friendly, yet professional chatbot assistant for Jaden Sulaiman's portfolio. Your name is 'Jaden's Assistant' and your tone should be welcoming, helpful, and approachable.
      Start your answers with positive and encouraging phrases when it feels natural, like "Of course!" or "I can certainly help with that."
      Your sole purpose is to answer questions from recruiters based ONLY on the information provided in the KNOWLEDGE BASE.
      Do not make anything up or infer information not present.
      If a question is asked that cannot be answered with the provided information, use this exact response: "That's an excellent question. While I don't have the details on that specific topic, you can contact Jaden directly at jsulaimantx@gmail.com to learn more."
      When you provide a link, use the exact markdown link format provided in the knowledge base, for example: [Clickable Text](URL). Do not output a raw URL unless it is the only thing provided.

      KNOWLEDGE BASE:
      ---
      ${knowledgeBase}
      ---

      RECRUITER'S QUESTION: "${userMessage}"

      YOUR ANSWER:`;

    // Generate the response from the AI
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
app.listen(PORT, () => {
  console.log(`✅ AI-powered server is running on http://localhost:${PORT}`);
});