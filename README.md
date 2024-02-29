# MERN Stack (tICKET.iFY)

## Overview
This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, providing a robust and scalable solution for developing web applications. The MERN stack is renowned for its flexibility, allowing seamless integration between the frontend and backend components.


## Frontend

### Authentication
- Implemented authentication to control user access.
- If a user is logged in, they are directed to the list page.
- If not logged in, they are redirected to the login page.

### List Page
- Provides functionality to create, update, list, and paginate tickets.

#### Create Ticket
- Allows users to create a new ticket.
- Users can input details such as title, description, etc.
- Upon submission, a new ticket is created and added to the database.

#### Update Ticket
- Enables users to update an existing ticket.
- Users can modify details like title, description, etc.
- Changes are saved upon submission and updated in the database.

#### List Tickets
- Displays a list of existing tickets.
- Tickets are fetched from the backend using the `GET /api/ticket/` endpoint.
- Each ticket is displayed with its title, description, etc.

#### Pagination
- Implemented pagination to manage large ticket lists efficiently.
- Limits the number of tickets displayed per page to improve performance and user experience.
- Users can navigate through different pages of ticket listings.

## Backend

### Routes
- **Ticket Routes**
    - `POST /api/ticket/`: Creates a new ticket.
    - `PATCH /api/ticket/:id`: Updates an existing ticket.
    - `GET /api/ticket/`: Retrieves all tickets.
    - `GET /api/ticket/:id`: Retrieves a single ticket by ID.

- **User Routes**
    - `POST /api/user/login`: Handles user login.
    - `POST /api/user/signup`: Handles user signup.

### Middleware
- `verifyToken`: Middleware used to verify user authentication token.
- Applied to `/api/ticket` routes to ensure only authenticated users can access ticket-related endpoints.

## Flow
1. User accesses the frontend.
2. If logged in, they are directed to the list page.
3. If not logged in, they are redirected to the login page.
4. On the list page, the user can create or update tickets.
5. Frontend sends requests to corresponding backend routes.
6. Backend routes handle requests, perform necessary operations (e.g., create, update, retrieve tickets), and respond accordingly.
7. Authentication middleware (`verifyToken`) ensures that only authenticated users can access ticket-related endpoints.
8. User authentication is handled through `/api/user/login` and `/api/user/signup` routes.
