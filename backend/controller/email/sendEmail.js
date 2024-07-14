import { createTransport } from 'nodemailer';

async function sendEmail(subject, message, recipientEmail) {
    try {
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'dhruvravalpricetracker@gmail.com',
                pass: 'ucev vaop oenb mdiu'
            }
        });

        const body = `Dear User,\n\n${message}\n\nThanks,\nDhruv Raval\nTeam of AssistFinder`;

        const emailOptions = {
            from: 'dhruvravalpricetracker@gmail.com',
            to: recipientEmail,
            subject: subject,
            text: body,
            html: `<p>Dear User,</p><p>${message}</p><p>Thanks,<br>Dhruv Raval<br>Team of LibrarySinc</p>`
        };

        const info = await transporter.sendMail(emailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export default sendEmail;
