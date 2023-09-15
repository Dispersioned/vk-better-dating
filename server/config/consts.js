import dotenv from 'dotenv';
dotenv.config();

export const X_LOVINA_AGENT = process.env.X_LOVINA_AGENT;
export const X_SESSION_KEY = process.env.X_SESSION_KEY;

if (!X_LOVINA_AGENT || !X_SESSION_KEY) throw new Error('configure all .env fields. Read .env.example');
