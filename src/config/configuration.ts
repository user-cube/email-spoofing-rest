export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  smtp: {
    host: `${process.env.SMTP_HOST}` || '127.0.0.1',
    port: parseInt(process.env.SMTP_PORT, 10) || 25,
  },
});
