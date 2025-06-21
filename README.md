# 📌 Event Search App

A full-stack event log explorer that enables powerful, concurrent searching across large log files using a React-based frontend and a multithreaded Django REST API backend. Fully containerized using Docker and Docker Compose.

---

## 🔧 Tech Stack

- **Backend**: Django REST Framework (with multithreading and pagination)
- **Frontend**: React + Bootstrap
- **Deployment**: Docker & Docker Compose
- **Concurrency**: Python `ThreadPoolExecutor` for parallel log file processing

---

## 🚀 Features

- 🔍 Search events using filters: `search_string`, `start_time`, `end_time`
- 🚀 Multithreaded backend for concurrent search across multiple `.txt` files
- 📄 Supports paginated results for large datasets
- 🔀 Multiple independent search blocks on the frontend
- 🔁 "Search All" button to trigger all blocks concurrently
- 🐳 Fully Dockerized setup for consistent local environment

---

## 🐳 How to Run (with Docker)

```bash
# Clone the repository
git clone https://github.com/your-username/event-search-app.git
cd event-search-app

# Build and start the containers
sudo docker-compose up --build
# Event-Search-App
