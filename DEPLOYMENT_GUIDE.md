# 🚀 Free Deployment Guide for ElevateCV

Follow these steps to deploy your MERN stack application for free using MongoDB Atlas, Render, and Vercel.

## 1. Database Setup (MongoDB Atlas)
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login.
2.  Create a **New Project**.
3.  Click **Create a Deployment** (Choose **M0 Sandbox** for free tier).
4.  **Security Quickstart**:
    -   Create a database user (Username/Password). **Save these!**
    -   Add `0.0.0.0/0` to IP Access List (allows access from anywhere).
5.  Go to **Database** -> **Connect** -> **Drivers**.
6.  Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0...`).
7.  Replace `<password>` with your actual password.

## 2. Backend Deployment (Render)
1.  Go to [Render](https://render.com/) and sign up with GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your `ElevateCV` repository.
4.  **Configuration**:
    -   **Root Directory**: `server`
    -   **Name**: `elevatecv-api` (or similar)
    -   **Environment**: `Node`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
5.  **Environment Variables** (Advanced):
    -   `MONGO_URI`: (Paste your MongoDB connection string)
    -   `JWT_SECRET`: (Create a random secret key, e.g., `mysecretkey123`)
    -   `NODE_ENV`: `production`
6.  Click **Create Web Service**.
7.  Wait for deployment. **Copy the URL** provided by Render (e.g., `https://elevatecv-api.onrender.com`).

## 3. Frontend Deployment (Vercel)
1.  Go to [Vercel](https://vercel.com/) and sign up with GitHub.
2.  Click **Add New...** -> **Project**.
3.  Import `ElevateCV`.
4.  **Framework Preset**: Vite (should be auto-detected).
5.  **Root Directory**: Click `Edit` and select `client`.
6.  **Environment Variables**:
    -   `VITE_API_URL`: (Paste your **Render Backend URL**)
        -   *Important*: Add `/api` at the end (e.g., `https://elevatecv-api.onrender.com/api`).
7.  Click **Deploy**.

## 🎉 Done!
Your application is now live!
-   **Frontend**: Your Vercel URL
-   **Backend**: Your Render URL
-   **Database**: MongoDB Atlas
