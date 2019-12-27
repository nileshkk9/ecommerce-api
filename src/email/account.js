const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "APIKEY"
);

const sendmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "nileshkk9@gmail.com",
    subject: "Thanks for joining",
    text: `Welcome to the app, ${name}. Let us know if you have any query.`
  });
};

module.exports = {
  sendmail
};
