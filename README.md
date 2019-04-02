# Compute Dashboard Backend

The dashboard backend is a REST API which provides functionality to interact
with EC2 instances.

## Usage

**Install dependencies (do this before each of the following):**

```sh
npm install
```

**Run tests:**

```sh
npm run test
```

**Run server:**

```sh
npm start
# PORT=8081 npm start
```

**Build a docker container:**

```sh
docker build . -t compute-dashboard-backend
# npm run build-docker
```

**Run your built container:**

```sh
docker run --rm -d -p 8081:80 compute-dashboard-backend
# npm run docker
```

Now you can send requests to `http://localhost:8081`.

## Design

The server is an Express app.
