# Test it out here: 
https://quick-chat-mau1.onrender.com/

---
# QuickChat

QuickChat is a real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. It offers instant and seamless communication with a dynamic and responsive interface, secure messaging, and efficient backend services to support real-time interactions.

---

## Features
- **Real-Time Messaging**: Instant communication using **Socket.IO**.
- **Secure User Authentication**: Protect user data and messages with secure authentication mechanisms.
- **Responsive Design**: Optimized UI for mobile, tablet, and desktop devices.
- **User-Friendly Interface**: Clean and intuitive chat interface for smooth interactions.
- **Scalable Architecture**: Built with the MERN stack for performance and scalability.

---

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO

---

## Installation and Setup
Follow these steps to run the application locally:

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** installed and running locally or in the cloud (e.g., MongoDB Atlas)

### 1. Clone the Repository
```bash
https://github.com/UsmanAli90/Quick-Chat.git
cd Quick-Chat
```
### 2. Install Dependencies
```bash
npm run build
```

### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory and add the following environment variables:
```env
MONGODB_URI=<your-mongodb-code>
PORT=<your-port-number>
JWT_SECRET=<your-secret-key>
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
```

### 4. Run the Application
Start the server:
```bash
npm start
```

The application will run the backend server and build the frontend.

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:<PORT>
```
Replace `<PORT>` with the port number where the app is running.


---

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License
This project is licensed under the **ISC License**.

---

## Author
Developed by Usman Ali. ✨
