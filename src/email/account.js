const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
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
