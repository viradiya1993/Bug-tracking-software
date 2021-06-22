const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendMail = async(to, subject, body) => {
    try {
        const msg = {
            to: to,
            from: process.env.EMAIL_FROM,
            subject: subject,
            html: body
        }
        await sgMail.send(msg);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Email could not be send.');
    }
}

module.exports = sendMail;