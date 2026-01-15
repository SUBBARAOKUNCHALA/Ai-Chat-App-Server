ai-chat-app/
│
├── client/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── Message.jsx
│   │   │   │   └── UserList.jsx
│   │   │   │
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   └── Common/
│   │   │       ├── Navbar.jsx
│   │   │       └── Loader.jsx
│   │
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │
│   │   ├── services/
│   │   │   ├── api.js              # Axios setup
│   │   │   ├── authService.js
│   │   │   ├── chatService.js
│   │   │   └── aiService.js
│   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │
│   │   ├── hooks/
│   │   │   └── useSocket.js
│   │
│   │   ├── utils/
│   │   │   └── formatTime.js
│   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js               # MongoDB connection
│   │   │   └── env.js
│   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Message.js
│   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── chatController.js
│   │   │   └── aiController.js
│   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── chatRoutes.js
│   │   │   └── aiRoutes.js
│   │
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │
│   │   ├── socket/
│   │   │   └── socket.js           # Socket.io logic
│   │
│   │   ├── langchain/
│   │   │   └── chatAgent.js        # LangChain AI logic
│   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server start
│   │
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                    # Root (optional)

