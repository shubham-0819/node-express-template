# Node express template

A simple backend application with Node.js, Express, and MongoDB.

## Table of Contents

- [Node Express Template](#node-express-template)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Swagger Doc](#swagger-doc)

## Features

- User authentication with JWT
- Secure HTTP headers with Helmet
- Data sanitization against XSS and NoSQL injection
- Gzip compression
- CORS support
- Rate limiting for authentication endpoints
- Comprehensive error handling
- API documentation with Swagger

## Requirements

* Upgrade to latest node version, I have tested it on node 20 - 22.
* Make sure yarn is installed `npm install -g yarn`

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/shubham-0819/node-express-template.git
   ```

2. Navigate to the project directory:

   ```sh
   cd node-express-template
   ```

3. Install dependenies

   ```sh
      yarn install
   ```

4. Set up environment variables:

   Copy the `.env.example` file to `.env` and update the values as needed.

   ```sh
   cp .env.example .env
   ```

## Configuration

The application can be configured using environment variables. The following variables are available:

>NOTE: `MONGODB_URL` is must.

- `PORT`: Port number (default: 3000)
- `MONGODB_URL`: MongoDB connection URL
- `NODE_ENV`: Environment (development, production, test)
- `JWT_SECRET`: Secret key for JWT
- `JWT_ACCESS_EXPIRATION_MINUTES`: Access token expiration time in minutes
- `JWT_REFRESH_EXPIRATION_DAYS`: Refresh token expiration time in days
- `JWT_RESET_PASSWORD_EXPIRATION_MINUTES`: Reset password token expiration time in minutes
- `JWT_VERIFY_EMAIL_EXPIRATION_MINUTES`: Verify email token expiration time in minutes
- `SMTP_HOST`: SMTP host for email service
- `SMTP_PORT`: SMTP port for email service
- `SMTP_USERNAME`: SMTP username for email service
- `SMTP_PASSWORD`: SMTP password for email service
- `EMAIL_FROM`: Email address for sending emails

## Usage

1. To start the application in development mode:

   ```sh
   yarn run dev
   ```

2. Run tests:
   ```sh
   yarn test
   ```
## Swagger Doc

* Access swagger UI after starting server - /v1/docs
