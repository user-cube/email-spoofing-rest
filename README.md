# email-spoofing-rest
Simple REST API to send spoofed emails.

## Install
The application uses NodeJS (NestJS Framework) so we need to clone the repo and install the necessary node modules:
```shell
$ git clone https://github.com/user-cube/email-spoofing-rest
$ cd email-spoofing-rest
$ npm i
```

## Environment Variables
The application needs only 3 envrionment variables, here a possible `.env` file:

```dotenv
SMTP_HOST = localhost
SMTP_PORT = 25
PORT = 3000
```

## Postfix Relay
To use postfix relay on docker run the following command:
```shell
$ docker container run \
    -e MAIL_RELAY_HOST='SMTP_HOST' \
    -e MAIL_RELAY_PORT='25' \
    -e MAIL_RELAY_USER='SMTP_USER' \
    -e MAIL_RELAY_PASS='SMTP_PASSWORD' \
    tecnativa/postfix-relay
```

## Disclaimer
Only use this tool for education, research, or in the course of approved social engineering assessments. While email spoofing is a powerful tool in the social engineer's arsenal, it is also trivial to identify the server that sent any email. Furthermore, this tool makes no claims to bypass any products such as Barracuda or ForcePoint email protections suites. Please use responsibly.

## Author
* [Rui Coelho](https://ruicoelho.pt/)
