Realtime Patient Form

📝 Overview

The Realtime Patient Form is a dynamic web application designed for efficient management of patient data in real-time. This platform allows staff to handle patient form submissions, track statuses, receive instant notifications, and maintain data consistency across devices. Its responsive design ensures a seamless experience on desktops, tablets, and smartphones.

⚡ Tech Stack

📚 Framework: Next.js

Server-side Rendering (SSR): Enhances performance and SEO by pre-rendering pages on the server.

File-based Routing: Simplifies navigation and route management.

API Routes: Enables backend API creation within the Next.js project.

🎨 Styling: Tailwind CSS

Utility-First Approach: Rapidly build custom designs without leaving the HTML.

Responsive Design: Built-in responsiveness makes designing for different devices seamless.

Customization: Tailwind’s config file allows easy theme adjustments.

🔌 Realtime Communication: WebSocket & Socket.io

Bidirectional Communication: Enables real-time updates between clients and the server.

Low Latency: Ensures instant updates for patient status, notifications, and form submissions.

Event-Driven: Makes handling specific actions (e.g., new patient submission) efficient and scalable.

🌐 Hosting

Frontend: Netlify

Continuous Deployment: Automatically deploys changes from the GitHub repository.

Global CDN: Ensures fast load times across the world.

Built-in SSL: Secures the site with HTTPS by default.

Backend: Railway

Simplified Backend Hosting: Manages Node.js servers and databases effortlessly.

Easy WebSocket Support: Ensures seamless real-time connections.

Scalability: Handles increased traffic and connections smoothly.

Website now Live on https://realtime-patientform.netlify.app/

💡 Features

✅ Patient Status Tracking

Track the real-time status of each patient (e.g., submitted, active, inactive, idle and filling).

Auto-updates across all connected clients when changes occur.

🔔 Notifications

Receive instant alerts when new patient forms are submitted.

Visual indicators (like red dots) highlight new activities.

🔍 Search Functionality

Search patients by ID or full name.

Case-insensitive and optimized for quick filtering.

💾 Data Persistence

Utilizes localStorage to maintain patient status and form data.

Ensures no data loss on page refresh or accidental closures.

📱 Responsive Design

Fully optimized for desktops, tablets, and mobile devices.

Adaptive layouts ensure a user-friendly interface on all screen sizes.

🚀 Setup Instructions

Clone the Repository:

git clone https://github.com/pappa6395/realtime-patientform-app.git
cd realtime-patientform

Install Dependencies:

npm install

Configure Environment Variables:
Create a .env file and add necessary configurations:

NEXT_PUBLIC_BACKEND_URL=http://localhost:3002
HOSTNAME="localhost"
PORT=3002

Run Locally:

npm run dev:socket

Build for Production:

npm run build:socket
npm run start:socket

📊 Why This Tech Stack?

Next.js offers the flexibility of static and dynamic pages, perfect for real-time applications with SEO benefits.

Tailwind CSS allows rapid UI development while maintaining consistency and responsiveness.

WebSocket & Socket.io ensure real-time, low-latency communication, critical for instant form updates and notifications.

Netlify provides a hassle-free frontend hosting solution with global reach and built-in CI/CD.

Railway simplifies backend management, making real-time communication smooth and scalable.

🙌 Contributing

Feel free to fork this repo and submit a PR for any improvements or new features.