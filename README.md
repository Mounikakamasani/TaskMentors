# Arqonz MERN Demo

Monorepo with Express/Mongo backend and Vite React frontend implementing Mentors and Task pages.

## Prerequisites
- Node 18+
- MongoDB running locally or connection string in `.env`

## Backend
```
cd backend
cp .env.example .env # or create manually
npm install
npm run seed
npm run dev
```

Create `.env`:
```
MONGO_URI=mongodb://127.0.0.1:27017/arqonz
PORT=4000
```

## Frontend
```
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`. API base can be overridden with `VITE_API_BASE` in `.env`.


