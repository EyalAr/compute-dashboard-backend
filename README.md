# Compute Dashboard Backend

The dashboard backend is a REST API which provides functionality to interact
with EC2 instances.

## Quickstart

```sh
# Copy-paste this to your terminal:
# (Make sure to set your AWS credentials and region to real values)
npm install && \
npm run build-docker && \
AWS_ACCESS_KEY_ID=XYZ \
AWS_SECRET_ACCESS_KEY=XYZ \
AWS_REGION=XYZ \
npm run docker
```

## Usage

Install dependencies (do this before each of the following):

```sh
npm install
```

Build a docker container:

```sh
docker build . -t compute-dashboard-backend
# npm run build-docker
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

Run your built container:

```sh
docker run --rm -d -p 8081:80 -e AWS_ACCESS_KEY_ID=XYZ -e AWS_SECRET_ACCESS_KEY=XYZ -e AWS_REGION=XYZ compute-dashboard-backend
# AWS_ACCESS_KEY_ID=XYZ AWS_SECRET_ACCESS_KEY=XYZ AWS_REGION=XYZ npm run docker
# Make sure to set your AWS credentials and region to real values
```

Now you can send requests to `http://localhost:8081`.

### Environment variables

- `PORT` - Server listening port
- `AWS_ACCESS_KEY_ID` - AWS Access key ID
- `AWS_SECRET_ACCESS_KEY` - AWS Secret access key
- `AWS_REGION` - AWS region

## Design

The server is an Express app.
