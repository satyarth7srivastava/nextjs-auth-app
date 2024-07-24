import nodemailer from 'nodemailer';
import User from '@/model/userModel';
import bcryptjs from 'bcryptjs';
import { verify } from 'crypto';


export const sendMail = async ({ email, emailtype, userId }: any) => {
    console.log(email, emailtype, userId);
    try {
        const Token = await bcryptjs.hash(userId.toString(), 10);
        const Token2 = Token.split('/').join('');
        const Token3 = Token2.split('.').join('');
        const Token4 = Token3.split('\\').join('');
        const Token5 = Token4.split('$').join('');
        const Token6 = Token5.split('!').join('');
        const Token7 = Token6.split('#').join('');
        const Token8 = Token7.split('%').join('');
        const Token9 = Token8.split('^').join('');
        const Token10 = Token9.split('&').join('');
        const Token11 = Token10.split('*').join('');
        const Token12 = Token11.split('(').join('');
        const Token13 = Token12.split(')').join('');
        const hashedToken = Token13.split('=').join('');

        if (emailtype === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        } else if (emailtype === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: `${process.env.NODEMAIL_USER}`,
                pass: `${process.env.NODEMAIL_PASS}`
            }
        });

        const mailOptions = {
            from: 'satyarthsrivastava7@gmail.com',
            to : email,
            subject : emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailtype === "VERIFY" ? `<h1>Click on the link to verify your email</h1><a href="${process.env.DOMAIN}/verify?token=${hashedToken}">Verify</a>` : `<h1>Click on the link to reset your password</h1><a href="http://${process.env.DOMAIN}/reset/${hashedToken}">Reset</a>`

        }

        const mailres = await transporter.sendMail(mailOptions);
        return mailres;
    } catch (error: any) {
        throw new Error(error.message);
    }
}