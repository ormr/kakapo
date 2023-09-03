# Kakapo

The network app

### Setup

First of all you need to setup dot environment
Create ``.env`` file and fill following variables (example)

```
MODE=dev
API_PORT=3001
API_HOST=http://localhost:
API_ORIGIN_URL=http://localhost
TYPEORM_CONNECTION=postgres
TYPEORM_USERNAME=admin
TYPEORM_PASSWORD=123456
TYPEORM_DATABASE=blog-db
TYPEORM_PORT=5432
TYPEORM_HOST=localhost
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
JWT_SECRET=topsecretcode
JWT_EXPIRATION_TIME=2678400
UPLOADED_FILES_DESTINATION=./uploadedFiles
REACT_APP_BASE_URL=http://localhost:3001/api
```

Then you need to run docker compose with following command:
```
docker-compose up --build
```
