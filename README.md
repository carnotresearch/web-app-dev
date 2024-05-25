# User Info Management with Diabetes Prediction

This repository contains a full-stack application for managing user information and predicting the probability of diabetes using a machine learning model. The application includes a React frontend and a Node.js backend.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Goolge ReCaptcha impl
- Add and view user information (name, age, weight, height, gender)
- Predict diabetes probability using a pre-trained machine learning model

## Prerequisites

- Node.js
- Python 3.x (for model conversion, if needed)
- MongoDB

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/atpk/todo-app.git
   cd todo-app/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with the following content:

   ```env
   MONGO_URI=your_mongo_uri_here
   JWT_SECRET=your_jwt_secret_here
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
   PORT=5000
   ```

4. Convert your ML model to ONNX format and place it in the backend directory.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with the following content:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   ```

## Installation

### Backend

Start the backend server:

    ```bash
    cd backend
    node server.js
    ```

### Backend

Start the frontend server:

    ```bash
    cd frontend
    npm start
    ```

Open your browser and navigate to http://localhost:3000.

# Usage

1. Register a new user.
2. Log in with the registered user credentials.
3. Add user information (name, age, weight, height, gender).
4. View the added user information and the predicted diabetes probability.

# API Endpoints

1. POST /register: Register a new user.
2. POST /login: Log in an existing user.
3. POST /todos: Add user information.
4. GET /todos: Retrieve user information.
5. POST /predict: Predict diabetes probability.

# Project Structure

    ```
    .
    ├── backend
    │   ├── models
    │   ├── routes
    │   ├── server.js
    |   ├── .env
    │   └── model.onnx (your ONNX model file)
    ├── frontend
    │   ├── public
    │   ├── src
    │   │   ├── components
    │   │   ├── App.js
    │   │   ├── index.js
    │   └── .env
    ├── README.md
    └── package.json
    ```

# Contributing

Contributions are welcome! Please open an issue or submit a pull request.
