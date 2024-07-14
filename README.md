# ODOO COMBAT FINAL COMPITITION PROJECT

# Books Library Management System

## Overview
The Books Library Management System is a web application designed to manage book inventories and borrowing processes for a library. It features role-based access control, book inventory management, a borrowing system, advanced search and recommendations, notifications and alerts, and reporting capabilities.

## Features

### User Management
- **Login/Logout Functionality**: Supports both Admin and Users.
- **Role-Based Access Control**: Roles include Admin, Librarian, and User.

### Book Inventory Management
- **CRUD Operations**: Add, update, delete, and search for books.
- **Book Details**: Includes ISBN, title, author, publisher, year, genre, quantity.
- **Real-Time Availability Status**: Shows current availability of books.
- **Google Books API Integration**: Fetches book details using ISBN. Example: `https://www.googleapis.com/books/v1/volumes?q=isbn:9781787123427`

### Borrowing System
- **Checkout Process**: For borrowing books.
- **Return Process**: Including due dates and late fees calculation.
- **History Tracking**: For each user's borrowed and returned books.

### Search and Recommendations
- **Advanced Search Options**: By title, author, genre, etc.
- **Book Recommendations**: Based on user history or popular trends.

### Notifications and Alerts
- **Due Date Reminders**: Email or SMS notifications.
- **New Arrivals Alerts**: For newly added books.
- **Overdue Alerts**: For overdue books and outstanding fees.

### Reporting
- **Generate Reports**: On book usage, overdue items, user activity, etc.
- **Dashboard**: For admins and librarians to see real-time statistics.

## Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB
- Git

### Installation

1. **Clone the repository:**
    ```sh
    git clone [https://github.com/yourusername/library-management-system.git](https://github.com/Kishan931644/odoo-final)
    cd odoo-final
    ```

2. **Install dependencies:**
    ```sh
    cd frontend
    npm install
    
    cd backend
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=3000||PORT
    CORS_ORIGIN=cors origin
    ```

4. **Run the application:**
    ```sh
    cd frontend
    npm run dev
    cd backend
    node index.js
    ```

5. **Access the application:**
    Open your browser and navigate to `http://localhost:5173`

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js
- **Authentication**: JWT
- **Styling**: CSS


## Repository
[[(https://github.com/Kishan931644/odoo-final/)]](https://github.com/Kishan931644/odoo-final/)

## System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v14 or higher
- **MongoDB**: v4 or higher
