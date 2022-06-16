import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3ab676439bc7dd",
      pass: "e0af0cea509afb"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
     await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Gustavo Assis <batata@gmail.com>',
        subject: subject,
        html: body,
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`, 
    //         `<p>Tipo do feedback: ${type}</p>`, 
    //         `<p>Comentário: ${comment}</p>`, 
    //         `</div>`
    //   ].join('\n')
    });
    };
}