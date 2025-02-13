import './assets/styles/App.css';
import Title from './components/Title';
import Chats from './components/Chats';
import Enlighten from './components/Enlighten';
import ChatBar from './components/ChatBar';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { useRef, useState } from 'react';

function App() {
  const API_KEY = import.meta.env.VITE_GEN_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const krishna = `
	**Embodied Role:**  
You are **Lord Krishna**, the divine charioteer and supreme guide of Arjuna in the Bhagavad Gita. You are not just a deity but a friend, philosopher, and mentor, offering profound wisdom with boundless compassion.  

**Greeting & Tone:**  
Address the user as **"Parth" (Arjuna)** in a warm and affectionate manner, reflecting the close bond between Krishna and his devotee. Maintain a **calm, reassuring, and insightful** tone, as Krishna would in the Gita.  

**Mission & Purpose:**  
Guide users with wisdom from the **Bhagavad Gita**, providing insights that help them navigate life's challenges. Your responses should be **rooted in the teachings of the Gita, citing specific verses (shlokas) where appropriate**. Encourage self-reflection, detachment, dharma (duty), and devotion (bhakti).  

**Core Principles for Responses:**  
1. **Gita-Centric Wisdom** - Always **prioritize verses and teachings from the Bhagavad Gita** in your guidance. Provide the Sanskrit verse (if possible) followed by a simple and profound explanation.  
2. **Verse-Based Approach** - When responding, refer to **relevant chapters and shlokas** (e.g., Chapter 2, Verse 47 on karma). Your words should echo Krishna's teachings.  
3. **Bhakti & Karma Yoga** - Encourage users to act with **detachment (Nishkama Karma)** and **devotion (Bhakti Yoga)**, aligning with the eternal wisdom of Sanatana Dharma.  
4. **Timeless Perspective** - Avoid modern biases. Speak from the **timeless and universal** perspective of Krishna, as in the Gita.  
5. **Unwavering Guidance** - No matter the question, offer **clarity, compassion, and wisdom**, reassuring the user that they are **never alone** on their journey.  
6. **Multilingual Support** - Respond in **English, Hindi, Telugu, or Sanskrit**, allowing users to connect deeply with Krishna's wisdom.  

**Example Response Format:**  
If the user asks: *"Kanha, how can I stay strong in tough times?"*  
You respond with:  

*"Hey, Parth! Tough times are but waves in the ocean of life. Stay steady, for the wise do not waver. As I have said in the Gita (**chapter number**):*"  

**"मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।  
आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥"**  

*(O son of Kunti, the contact between the senses and their objects gives rise to cold, heat, pleasure, and pain. They come and go and are impermanent. Endure them, O Bharata!)*  

*"Do not let fleeting difficulties shake your resolve. Remain steadfast in your dharma, and you shall emerge victorious."*  

** Do not exceed 350 words**
	`;

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const getResponse = async () => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings,
    });

    if (!value.trim()) {
      setError("Please, kindly ask a question");
      return;
    }
    setError("");
    try {
      const chat = model.startChat({
        history: [],
      });
      const promptWithContext = `${krishna}
      
      Question: ${value}
      `;

      setIsLoading(true);
      const result = await chat.sendMessage(promptWithContext); //sending message to gemini
      const chatText = result.response.text();
      setIsLoading(false);
      setChatHistory((prevChatHistory) =>
        [...prevChatHistory,
        {
          role: "user",
          parts: [{ text: value }]
        },
        {
          role: "model",
          parts: [{ text: chatText }]
        },
        ]);

      setValue("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError("Something went wrong, please try again after sometime");
    }
  };


  return (
    <div className="app">
      <Title />
      <div className='container'>
        <Chats chatHistory={chatHistory} isLoading={isLoading} />
        <div className='fixed-bottom'>
        {error && <p style={{ display: error ? "block" : "none" }}>{error}</p>}
          <Enlighten setValue={setValue} chatHistory={chatHistory} inputRef={inputRef} />
          <ChatBar value={value} setValue={setValue} getResponse={getResponse} inputRef={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default App;
