# ElevateCV - Professional Resume Builder

**ElevateCV** is a modern, full-stack resume builder application designed to help job seekers create ATS-optimized, professional resumes in minutes. Built with the MERN stack (MongoDB, Express, React, Node.js), it offers a seamless experience with real-time previews, multiple templates, and PDF export capabilities.

![ElevateCV Preview](./client/public/logo.svg)

## 🚀 Features

*   **Real-time Resume Editor**: See changes instantly as you type.
*   **ATS-Optimized Templates**:
    *   **Modern Professional**: Clean, balanced layout for general use.
    *   **Harvard / Ivy League**: Traditional, text-heavy format preferred by top firms.
    *   **Project Centric**: ideal for developers showcasing GitHub projects.
    *   **Student / Intern**: Optimized for freshers with focus on education and skills.
*   **PDF Export**: High-quality, selectable text PDF generation for ATS parsers.
*   **User Authentication**: Secure signup/login to save and manage multiple resumes.
*   **Smart Defaults**: Pre-filled content for various roles (SDE, Product Manager, Data Scientist) to get started quickly.
*   **Customization**: Adjustable fonts, colors, spacing, and section ordering.

## 🛠️ Tech Stack

*   **Frontend**: React.js, Tailwind CSS, Framer Motion, Axios
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (Mongoose)
*   **Authentication**: JWT (JSON Web Tokens)
*   **PDF Generation**: Puppeteer (Server-side)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/s1ub1am/ElevateCV.git
    cd ElevateCV
    ```

2.  **Install Dependencies**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the Application**
    ```bash
    # Run backend (from server directory)
    npm run dev

    # Run frontend (from client directory)
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
