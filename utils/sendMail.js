const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (email, companyName, tenderName) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Tender Assigned",
            html: ` <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Tender Assigned</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333333;
                }
                p {
                  color: #666666;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Congratulations</h1>
                <p>Hi ${companyName},</p>
                <p>Great news! Your bid for ${tenderName} has been chosen.</p>
                <br/>
                <p>We'll be in touch soon to finalize the contract.</p>
                <br/>
                <p>Best regards,<br>The Vi Exports Team</p>
              </div>
            </body>
            </html>`,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        throw error
    }
};
export { sendMail }