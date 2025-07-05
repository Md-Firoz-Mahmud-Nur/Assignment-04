# BookHive - Library Management System

BookHive is a modern, full-stack Library Management System built using the MERN stack with TypeScript. It is designed to manage books, borrowing records, and availability tracking in a streamlined and efficient manner. The system follows a modular and layered architecture, with clearly separated responsibilities for UI, state, and data handling.


## Live Site URL
Visit the live client site at [Client Side](https://assignment-04-dusky.vercel.app/)
Visit the live server site at [Server Side](https://assignment-3-five-iota.vercel.app/)

## Server Side Github Link
[Server Code](https://github.com/Md-Firoz-Mahmud-Nur/l2-assignment-3.git)

## Key Features
- **Book Operations:**
  Add, update, delete, and retrieve books
  Includes metadata such as title, author, genre, ISBN, and availability status

- **Borrowing Functionality:**
  Allows users to borrow books
  Automatically tracks due dates
  Handles inventory updates and availability

- **Inventory and State Handling:**
  Tracks the total number of book copies
  Reflects real-time borrowing status through backend logic

The system is designed as a backend service that can be consumed by frontend applications, mobile apps, or other services requiring library management functionality.


## Technology Stack
- React with TypeScript
- Redux Toolkit & RTK Query for state and API interaction
- Tailwind CSS and Shadcn UI for design and responsiveness
- Vite for development and production builds


## API Structure
- `/api/books` – Book CRUD endpoints
- `/api/borrow` – Borrowing operations


## How to Start This Application

1. **Clone the Repositories:**
    ```sh
    https://github.com/Md-Firoz-Mahmud-Nur/Assignment-04.git
    cd Assignment-04
    ```

2. **Install Dependencies:**
    ```sh
    npm install
    ```

3. **Start the Development Server:**
    ```sh
    npm run dev
    ```


## Environment Variables:
  - Create a `.env` file in the root of your client project and add the following variables:


## Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.
