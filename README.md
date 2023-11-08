# Kakapo

Introducing Kakapo, an evolving blog application that is gradually transitioning into a thriving social network. This project primarily serves as a platform for experimenting with Nest.js and Postgres. My current focus revolves around the following tasks:
- Identifying a suitable hosting provider to deploy the application effectively.
- Implementing a feature-rich text editor to enable detailed and sophisticated post editing.
- Exploring the potential of Framer Motion to introduce captivating animations that enhance the overall user experience on the site.

### Setup

First of all you need to setup dot environment
Create ``.env`` file and fill following variables

```
MODE=dev
API_PORT=3001
API_HOST=http://localhost:
TYPEORM_CONNECTION=postgres
TYPEORM_USERNAME=admin
TYPEORM_PASSWORD=
TYPEORM_DATABASE=blog-db
TYPEORM_PORT=5432
TYPEORM_HOST=localhost
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
JWT_SECRET=
JWT_EXPIRATION_TIME=
```

Then you need to run docker compose with following command:
```
docker-compose up --build
```
