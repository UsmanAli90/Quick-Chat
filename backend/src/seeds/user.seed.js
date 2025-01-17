import { config } from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import {ConnectDB} from '../lib/db.js';
import User from "../models/user.model.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Move up two directories from /src/seeds to /backend where .env should be
const envPath = path.resolve(__dirname, '../../.env');
console.log('Looking for .env file at:', envPath);

const result = config({ path: envPath });
console.log('Dotenv config result:', result.parsed ? 'Found and parsed .env' : 'Could not find or parse .env');

const seedUsers = [
    // Female Users
    {
      email: "emma.thompson@example.com",
      fullName: "Emma Thompson",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      email: "olivia.miller@example.com",
      fullName: "Olivia Miller",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      email: "sophia.davis@example.com",
      fullName: "Sophia Davis",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      email: "ava.wilson@example.com",
      fullName: "Ava Wilson",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      email: "isabella.brown@example.com",
      fullName: "Isabella Brown",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      email: "mia.johnson@example.com",
      fullName: "Mia Johnson",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      email: "charlotte.williams@example.com",
      fullName: "Charlotte Williams",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      email: "amelia.garcia@example.com",
      fullName: "Amelia Garcia",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  
    // Male Users
    {
      email: "james.anderson@example.com",
      fullName: "James Anderson",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "william.clark@example.com",
      fullName: "William Clark",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "benjamin.taylor@example.com",
      fullName: "Benjamin Taylor",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "lucas.moore@example.com",
      fullName: "Lucas Moore",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "henry.jackson@example.com",
      fullName: "Henry Jackson",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "alexander.martin@example.com",
      fullName: "Alexander Martin",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      email: "daniel.rodriguez@example.com",
      fullName: "Daniel Rodriguez",
      password: "12345678",
      profilepic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];
  

const seedDatabase = async () => {
  try {
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    await ConnectDB();
    const insertedUsers = await User.insertMany(seedUsers);
    console.log(`Database seeded successfully with ${insertedUsers.length} users`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();