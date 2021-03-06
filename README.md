# email-spoofing-rest
Simple REST API to send spoofed emails.

## Install
The application uses NodeJS (NestJS Framework), so we need to clone the repo and install the necessary node modules:
```shell
$ git clone https://github.com/user-cube/email-spoofing-rest
$ cd email-spoofing-rest
$ npm install
```

### Environment Variables
The application needs only 3 environment variables, here a possible `.env` file:

```dotenv
SMTP_HOST = localhost
SMTP_PORT = 25
PORT = 3000
```

### Postfix Relay
To use postfix relay on docker run the following command:
```shell
$ docker container run \
    -e MAIL_RELAY_HOST='SMTP_HOST' \
    -e MAIL_RELAY_PORT='25' \
    -e MAIL_RELAY_USER='SMTP_USER' \
    -e MAIL_RELAY_PASS='SMTP_PASSWORD' \
    tecnativa/postfix-relay
```

## Running the app
There are 3 available options to the run the app:
```shell
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage
There are 2 different options to send email, with or without html tags.

### HTML Email
```shell
curl --location --request POST 'http://localhost:3000/email' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to":"RECEIVER_EMAIL",
    "from":"SENDER_EMAIL",
    "name": "SENDER_NAME",
    "subject":"EMAIL_SUBJECT",
    "message":"<h1>HTML MESSAGE</h1>",
    "isHtml": true
}'
```

### Plain Text
```shell
curl --location --request POST 'http://localhost:3000/email' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to":"RECEIVER_EMAIL",
    "from":"SENDER_EMAIL",
    "name": "SENDER_NAME",
    "subject":"EMAIL_SUBJECT",
    "message":"PLAIN TEXT",
    "isHtml": false
}'
```

### With file
```shell
curl --location --request POST 'http://localhost:3000/email/file' \
--form 'to="RECEIVER_EMAIL"' \
--form 'from="SENDER_EMAIL"' \
--form 'name="SENDER_NAME"' \
--form 'subject="EMAIL_SUBJECT"' \
--form 'message="<h1>Message</h1>"' \
--form 'isHtml="true"' \
--form 'file=@"/path/to/file"'
```

## Run on docker
```shell
$ docker pull ruicoelho43/email-spoofing:latest
$ docker run -d -p 3000:3000 -e PORT=3000 -e SMTP_HOST=localhost -e SMTP_PORT=25 ruicoelho43/email-spoofing:latest
```
More information about docker images available on [Dockerhub](https://hub.docker.com/r/ruicoelho43/email-spoofing)

## Swagger
Swagger is available on endpoint `http://<host>:<port>/swagger-ui/#/`.

![Swagger](./docs/swagger/swagger.png)

## Disclaimer
Only use this tool for education, research, or in the course of approved social engineering assessments. While email spoofing is a powerful tool in the social engineer's arsenal, it is also trivial to identify the server that sent any email. Furthermore, this tool makes no claims to bypass any products such as Barracuda or ForcePoint email protections suites. Please use responsibly.
## Author
* [Rui Coelho](https://ruicoelho.pt/)
