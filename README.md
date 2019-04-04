# Compute Dashboard Backend

The dashboard backend is a REST API which provides functionality to interact
with EC2 instances.

## Quickstart

Copy-paste to your terminal:

```sh
npm install && \            # install dependencies
npm run docker-build && \   # build docker container
npm run docker-network && \ # set up bridge network to connect with frontend
AWS_ACCESS_KEY_ID=XYZ \     # set AWS access key ID
AWS_SECRET_ACCESS_KEY=XYZ \ # set AWS secret access key
AWS_REGION=XYZ \            # set AWS region
npm run docker              # run server
```

## Usage

Install dependencies (do this before each of the following):

```sh
npm install
```

**All of the commands below assume the proper environment variables are set
(see below).**

Run tests:

```sh
npm run test
```

Run server:

```sh
npm start
# Or specify port with:
# PORT=8081 npm start
```

### Using Docker

Both the frontend and the backend are designed to run in Docker containers.
They are built independently, but in order for them to communicate from within
their containers, some networking mechanics needs to be done (see more in the
Design section below).

Build a docker image:

```sh
docker build . -t compute-dashboard-backend
# npm run docker-build
```

Set up a network bridge:

```sh
docker network create --driver bridge compute-dashboard
# npm run docker-network
```

Run your built image:

```sh
docker run --rm -d \
  -p 8081:80 \                    # route port 8081 on host to port 80
  --network compute-dashboard \   # connect to the compute-dashboard network
  -e AWS_ACCESS_KEY_ID=XYZ \      # Set AWS access key ID
  -e AWS_SECRET_ACCESS_KEY=XYZ \  # Set AWS secret access key
  -e AWS_REGION=XYZ \             # Set AWS region
  --name compute-dashboard-backend compute-dashboard-backend
# npm run docker
```

Now you can send requests to `http://localhost:8081`.

### Environment variables

- `AWS_ACCESS_KEY_ID` - AWS Access key ID
- `AWS_SECRET_ACCESS_KEY` - AWS Secret access key
- `AWS_REGION` - AWS region

## Design

### API

The server is an Express app which, for the sake of this exercise, provides
only two endpoints:

#### `POST /login`

Request body:

```json
{
  "username": "<username>",
  "password": "<password>"
}
```

Response:

- `204`: Success. JWT provided in `x-auth-jwt` header, and must be used for
  all subsequent requests (see below).
- `401`: Unauthorised. Login failed.

#### `GET /ec2-instances?range=[i,j]&sort=[field,order]`

Request query params:

- `range=[i,j]`: Pagination. Controls which instances are returned.
- `sort=[field,order]`. Results are sorted by `field`. `order` can be
  `DESC` or `ASC`.

Request headers:

- `x-auth-jwt`: The JWT obtained from `/login`

Response:

- `200`: Success. Payload is a JSON array of objects; each representing an EC2
  instance. Object fields are: `name`, `id`, `type`, `state`, `az`, `public_ip`,
  `private_ip`.
- `401`: Unauthorised. User is not logged in.

### Docker

See `Design` section of [frontend project](https://github.com/EyalAr/compute-dashboard-backend).

### BYOU (Bring your own users)

Users are stored as a JSON array in `./conf/users.json`.

When running as a Docker container, you can provide your own list of users
by mounting an external volume into `/home/node/app/conf/users.json` inside
the container.

As an example, if you have a file on your host `./my-users.json`, mount it by
adding to your `docker run` command:

```sh
--mount type=bind,src=$(pwd)/my-users.json,dst=/home/node/app/conf/users.json,readonly
```
