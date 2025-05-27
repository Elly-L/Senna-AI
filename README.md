# 🛡️ Senna AI – Real-Time Cybersecurity Agent

**Live Frontend:** [https://sennaai.netlify.app](https://sennaai.netlify.app)  
**Backend API:** [https://senna-ai.onrender.com](https://senna-ai.onrender.com)

Senna AI is a real-time cybersecurity agent powered by AI, offering users intelligent threat analysis, simulated attack conversations, and interactive security diagnostics via a sleek Web3-ready interface.

---

## 🚀 Features

- 🤖 **AI-Powered Threat Agent**  
  Engage with a live cybersecurity assistant via text prompts or real-time socket chat.

- 🌐 **WebSocket Integration**  
  Real-time bi-directional communication with the backend.

- 🧠 **OpenRouter AI Integration**  
  Backend uses OpenRouter to stream responses from models like OpenChat and Mixtral.

- 📊 **Session Logs & Monitoring**  
  View past interactions, session data, and connection status.

- 🔐 **Cybersecurity Focus**  
  Simulates adversarial behavior, analyzes requests, and detects patterns using AI.

---

## 🧩 Tech Stack

| Frontend            | Backend             | Deployment         |
|---------------------|---------------------|--------------------|
| Next.js 14 (App Router) | Node.js + Express    | Netlify (Frontend) |
| TailwindCSS         | WebSocket (ws)      | Render (Backend)   |
| TypeScript          | OpenRouter API      |                    |

---

## 🧪 Backend API Overview

| Endpoint     | Method   | Description                                     |
|--------------|----------|-------------------------------------------------|
| `/api/ask`   | POST     | Send a question to the AI agent and receive a response. |
| `/ws`        | WebSocket| Real-time chat with the agent.                  |
| `/ws-client` | GET      | WebSocket test UI.                              |
| `/`          | GET      | Root API status + documentation.                |

---

## 📁 Project Structure
Database Logs 
![image](https://github.com/user-attachments/assets/3acd79f5-7102-4943-bbb2-598babb33510)

Web UI 
<img width="935" alt="image" src="https://github.com/user-attachments/assets/08a25ff8-9182-43e3-8674-7f4c4407369a" />

<img width="955" alt="image" src="https://github.com/user-attachments/assets/8799d92e-87da-4482-9a4e-e537b9d34b39" />
<img width="932" alt="image" src="https://github.com/user-attachments/assets/b2facec5-0d36-4e33-aaf4-3b585aeb1fa0" />
<img width="702" alt="image" src="https://github.com/user-attachments/assets/96ae5ad5-cb8d-49b7-bea7-aa86e7e71f64" />

👨‍💻 Developer
Elly Logan Odhiambo – GitHub
Hackathon Project | Built with ❤️ using Cursor, Vercel, Netlify & Render
