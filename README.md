Give me the proper readme.md file code:
# Clone the repository
git clone https://github.com/srajiv9496/event-search-app.git
cd event-search-app

# Build and start the containers
```
sudo docker-compose up --build
```

---

## 🔗 Application URLs

| Service         | URL                             |
|-----------------|----------------------------------|
| React Frontend  | [http://localhost:3000](http://localhost:3000) |
| Django API      | [http://localhost:8000/api/search/](http://localhost:8000/api/search/) |

---

## 🧪 Sample API Usage

```http
GET /api/search/?search_string=ACCEPT&start_time=1725800000&end_time=1725900000

```
---

## 📥 Sample JSON Response

```json
{
  "results": [
    {
      "event": {
        "srcaddr": "192.168.1.1",
        "dstaddr": "10.0.0.2",
        "starttime": "1725800010",
        "endtime": "1725800050",
        "action": "ACCEPT"
      },
      "file": "events1.txt",
      "timestamp": 1725800010
    }
  ],
  "count": 120,
  "next": "http://localhost:8000/api/search/?page=2",
  "previous": null,
  "search_time_seconds": 0.4321
}
```
---

## 📁 Folder Breakdown

| Folder/File         | Description                                  |
|---------------------|----------------------------------------------|
| `backend/`          | Django backend with REST API implementation  |
| `frontend/`         | React application with multiblock search UI  |
| `backend/data/`     | Contains sample `.txt` log files             |
| `docker-compose.yml`| Runs frontend and backend together           |
| `Dockerfile.backend`| Dockerfile to containerize the Django app    |
| `Dockerfile.frontend`| Dockerfile for React production build + Nginx |
