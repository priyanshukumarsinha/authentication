import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendMail = async({email, emailType, userId}:any) => {
    try{

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === 'VERIFY'){
            // Generate a verification token and save it to the user
            await User.findByIdAndUpdate(userId,
              {
                $set: {
                  verifyToken: hashedToken,
                  verifyTokenExpiry : new Date(Date.now() + 3600000)
                }
              }
            );
        }
        else if(emailType === 'RESET'){
            // Generate a reset token and save it to the user
            await User.findByIdAndUpdate(
              userId,
              {
                $set: {
                  forgotPasswordToken: hashedToken,
                  forgotPasswordExpiry: Date.now() + 3600000
                }
              }
            )
        }

        let transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "bdbafd459a4041",
            pass: "c86630ac75df9c"
          }
        });

          const mailOptions = {
            from: 'pk@pk.ai', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY'? "Verify Your Email" : "Reset Your Password", // Subject line
            // text: "Hello world?", // plain text body
            html: `
              <p>
                Click <a href= "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> Here </a> to ${emailType === 'VERIFY'? 'verify your email' : 'reset your password'}
                or copy and paste the link in your browser. <br>   
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}           
              </p>
            `, // html body
          };

          const mailResponse = await transporter.sendMail(mailOptions);

          return mailResponse;
    }
    catch (err:any){
        throw new Error("Error while sending mail ::", err);
    }
}