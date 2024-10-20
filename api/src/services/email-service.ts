import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { mailConfig } from '../config/mail';

function renderTemplate(templateName: string, variables: Record<string, string>) {
    const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
    let templateContent = fs.readFileSync(templatePath, 'utf-8');

    Object.keys(variables).forEach(key => {
        const placeholder = `{{${key}}}`;
        templateContent = templateContent.replace(new RegExp(placeholder, 'g'), variables[key]);
    });

    return templateContent;
}

export async function sendMail(to: string, subject: string, templateName: string, variables: Record<string, string>) {
    try {
        const transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            auth: mailConfig.auth,
        });

        const htmlContent = renderTemplate(templateName, variables);

        const mailOptions = {
            from: mailConfig.from,
            to,
            subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
