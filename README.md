# email-spoofing-rest
Simple REST API to send spoofed emails.

## Postfix Relay
To use postfix relay on docker run the following command:
```shell
docker container run \
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
