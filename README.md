# Score App

This is a simple application that simulates a score counter for a game. It has two teams, home and away, and their scores are updated at different intervals. The project is split into a frontend and a backend, each with its own Docker container.

### Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository to your local machine.
```
git clone https://github.com/Antoinelc7/pwa_nodejs-react.git
```

2. Navigate to the project directory
```
cd pwa_nodejs-react
```

3. Build and start the Docker containers
```
docker-compose up
```

The frontend server will start running at http://localhost:5000 and the backend server will start running at http://localhost:3000.