🎓 Interactive Presentation Platform

An interactive real-time classroom platform where teachers can upload slides (PDF), control live presentations, create activities, and students can join sessions and respond in real-time.

Built using React, Node.js, Express, MongoDB, Socket.IO, and modern UI/UX principles.

🚀 Features
👩‍🏫 Teacher Panel

Upload PDF / PPT slides

Convert slides into images automatically

Live slide navigation

Create live activities (MCQ / Open-ended)

View real-time analytics & student responses

Broadcast results to students

Real-time session control using Socket.IO

👨‍🎓 Student Panel

Join live sessions using session code

View slides synced in real-time

Participate in live activities

Submit answers instantly

View results when published

Auto-restore session on refresh

🧠 Key Highlights

⚡ Real-time sync using WebSockets (Socket.IO)

📄 PDF → Image slide conversion

📊 Live activity analytics

🎨 Premium UI with Tailwind CSS

🔔 Upload progress feedback & toast notifications

🧑‍🎓 Child-friendly UI design

👩‍🏫 UX clarity for Teacher vs Student roles

🛠️ Tech Stack
Frontend:

React

React Router

Tailwind CSS

Axios

React Hot Toast

Socket.IO Client

Backend:

Node.js

Express.js

MongoDB (Mongoose)

Socket.IO Server

Multer (File Upload)

PDF Poppler (Slide Conversion)

fs-extra

Backend Setup:
cd backend
npm install
npm run dev

Create .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Frontend Setup:
cd frontend
npm install
npm run dev

🧪 Demo Flow

Teacher:
Create a session
Upload slides (PDF/PPT)
Navigate slides live
Add live activity
View analytics

Student:
Join session via code
View slides live
Answer activities
See results
