🎓 Interactive Presentation Platform

An interactive real-time classroom platform where teachers can upload slides (PDF), control live presentations, create activities, and students can join sessions and respond in real-time.

Built using React, Node.js, Express, MongoDB, Socket.IO, and modern UI/UX principles.

🧠 Key Highlights

⚡ Real-time sync using WebSockets (Socket.IO)

📄 PDF → Image slide conversion

📊 Live activity analytics

🎨 Premium UI with Tailwind CSS

🔔 Upload progress feedback & toast notifications

🧑‍🎓 Child-friendly UI design

👩‍🏫 UX clarity for Teacher vs Student roles

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

1.Create a session

2.Upload slides (PDF/PPT)

3.Navigate slides live

4.Add live activity

5.View analytics

Student:

1.Join session via code

2.View slides live

3.Answer activities

4.See results
