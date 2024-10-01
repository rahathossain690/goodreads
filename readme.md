### Overview

This project is a partial clone of **Goodreads**, a popular book review platform that allows users to share book-reading updates, rate and review books, and interact with other users. The goal of this application is to replicate the core functionalities of Goodreads with a focus on **book reviews**, **comments**, and **user interaction**.

This project is containerized using **Docker** and follows Object Oriented Programming (OOP) and Design (OOD) principles. 

---

## Features

1. **Post Book Reviews**  
   Users can post reviews on books they have read. Reviews include a rating and a detailed comment.
   
2. **Comment on Reviews**  
   Users can comment on other users' reviews, fostering interaction and discussion around books.

3. **View Newsfeed**  
   Users can view their newsfeed, which displays their own and other users' reviews and comments.

4. **REST API**  
   A REST API is implemented to facilitate communication between the frontend and backend. All major operations such as posting reviews, adding comments, and viewing newsfeeds are handled via API endpoints.

5. **Relational Database**  
   The project uses a relational database (SQLite in this case) to model users, books, reviews, comments, and follow relationships.

6. **Docker Containerization**  
   The entire application is containerized with Docker, making it easy to set up, run, and maintain. The environment is fully reproducible using Docker.

7. **Follow/Unfollow Users**  
   Users can follow other users to see their activity on the newsfeed. This encourages engagement between users.

8. **Personalized Newsfeed**  
   The newsfeed only shows the activities of users that the logged-in user is following, along with their own activities.

9. **Node.js Backend**  
   The backend is implemented using **Node.js** and uses Sequelize ORM to interact with the SQLite database.

10. **Authentication and Authorization**
    Gateways are protected via authorization.

## Project Structure

```
/backend
    /controllers  - Application logic for handling API requests
    /database     - Database configurations
    /middleware   - Authorization, Authentication, Error handling middlewares
    /models       - Sequelize models for database
    /repository   - Handles data interaction between models and controllers
    /routes       - API routes for different functionalities (reviews, comments, users)
    /config       - Configuration files for database, environment
    /public       - Frontend files (HTML, CSS, JS)
    index.js      - Main application entry point
    Dockerfile    - Docker setup for containerization
```

---

## Tech Stack

- **Backend**: Node.js (Express.js)
- **Frontend**: HTML, Bootstrap, JavaScript (jQuery for dynamic interaction). Initially it was react but due to shortage of time went for this stack.
- **Database**: SQLite with Sequelize ORM
- **Containerization**: Docker


## Setup Instructions

### Prerequisites
- **Docker**: Ensure Docker is installed on your machine.

### Run the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rahathossain690/goodreads-clone.git
   cd goodreads-clone
   ```

2. **Build the Docker image**:
   ```bash
   docker build -t goodreads-clone .
   ```

3. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 goodreads-clone
   ```

4. **Access the Application**:  
   Open your browser and go to `http://localhost:3000` to interact with the application. You can use email: `demo@user.com`, password: `demodemo` to login (Some dummy data are already there).

### Stopping the Application
To stop the running container:
```bash
docker stop <container_id>
```

## How to Use

1. **View Books**: Browse through available books and see what others have reviewed.
2. **Add a Review**: Click on a book, post a review, and rate it.
3. **Comment on Reviews**: Engage with other users by commenting on their reviews.
4. **Follow Users**: Follow other users to see their reviews and comments on your personalized newsfeed.
