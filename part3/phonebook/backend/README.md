# 📞 Phonebook Backend

RESTful API server for the Phonebook application, built with Node.js, Express, and MongoDB. Handles persistent storage, validation, and error handling for phonebook contacts.

## 🎯 What it does

- Serves phonebook data from MongoDB database
- Supports full CRUD operations (GET, POST, PUT, DELETE)
- Validates name length (min 3 characters) and phone number format (XX-XXXXXXX or XXX-XXXXXXXX)
- Provides a live `/info` endpoint with database statistics
- Serves the frontend production build as static files

## 🧠 What I practiced

- 🌐 Building a RESTful API with Express
- 🗄️ Connecting and modeling data with Mongoose + MongoDB Atlas
- ✅ Implementing custom validators for phone numbers
- 🧹 Structuring middleware (error handling, logging with Morgan)
- 🚀 Deploying full-stack app to Render
- 🛡️ Securing environment variables with `.env`

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB Atlas + Mongoose ODM
- **Validation:** Custom validators (regex) + built-in validators
- **Logging:** Morgan
- **Linting:** ESLint + Prettier
- **Deployment:** Render

## 🚀 How to run locally

```bash
# Clone and navigate
git clone https://github.com/MucahidTech/fullstackopencourse/tree/main/backend/part3
cd backend/part3

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=<your_mongodb_uri>" > .env
echo "PORT=3001" >> .env

# Start in development mode
npm run dev

# Start in production mode
npm start
```

Then open http://localhost:3001

## 📚 Reference

- [Full Stack Open Part 3](https://fullstackopen.com/en/part3)
- Exercises 3.1 - 3.22
