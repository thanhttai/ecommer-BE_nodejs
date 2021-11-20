const nodemailer = require('nodemailer');
const { replaceOne } = require('../models/EmailTemplate');
const Template = require('../models/EmailTemplate');

const emailHelper = {};

emailHelper.sendTestEmail = async () => {
    try {
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            }
        });

        let info = await transport.sendMail({
            from: '"Coderschool" ngothanhtainegu@gmail.com',
            to: "ngothanhtaiit@gmail.com",
            subject: "Good morning",
            text: "Plan body no style",
            html: "<p>This have style</p>"
        });
        console.log("sent", info.messageId);
    } catch (error) {
        console.log("Error");
    }
};

emailHelper.createTemplatesIfNotExists = async () => {
    try {
        let found = await Template.findOne({ template_key: "verify email" });
        if (!found) {
            const newTemplate = {
                name: "Verify Email Template",
                template_key: "verify_email",
                description: "This template is used when user register a new email",
                from: '"Coderschool" ngothanhtainegu@gmail.com',
                subject: `Hi %name%, welcome to CoderSchool!`,
                html: `Hi <strong>%name%</strong> ,
                    <br /> <br />
                    Thank you for your registration.
                    <br /> <br /> 
                    Please confirm your email address by clicking on the link below.
                    <br /> <br />
                    %link%
                    <br /> <br />
                    If you face any difficulty during the sign-up, do get in
                    touch with our Support team: apply@coderschool.vn
                    <br /> <br /> Always be learning!
                    <br /> CoderSchool Team
                    `,
                variables:["name", "link"]
            }
            found = await Template.create(newTemplate);
        }
    } catch (error) {
        console.log("error", error.message);
    }
};

emailHelper.createResetPasswordTemplate = async () => {
    try {
        let found = await Template.findOne({ template_key: "reset_password" });
        if (!found) {
            const newTemplate = {
                name: "Reset Password Template",
                template_key: "reset_password",
                description: "This template is used to reset password",
                from: '"Coderschool" ngothanhtainegu@gmail.com',
                subject: `Hi %name%, let's reset password`,
                html: `Hi <strong>%name%</strong> ,
                <br /> <br />
                Your new password is %newPassword%.
                <br /> <br />
                <br /> Tai.`,
                variables:["name", "newPassword"]
            }
            found = await Template.create(newTemplate);
        }
    } catch (error) {
        console.log("error", error.message);
    }
}

emailHelper.createSingleEmailFromTemplate = async (template_key, variablesObject, toEmail) => {
    try {
        const template = await Template.findOne({ template_key });
        if (!template) throw new Error("Invalid template key");
        const data = {
            from: template.name,
            to: toEmail,
            subject: template.subject,
            html: template.html,
        };
        template.variables.forEach((key) => {
            if (!variablesObject[key]) throw new Error("missing value of key");
            let regPattern = new RegExp(`%${key}%`, "g");
            data.subject = data.subject.replace(regPattern, variablesObject[key]);
            data.html = data.html.replace(regPattern, variablesObject[key]);
        });
        return data;
    } catch (error) {
        console.log("Error at eh.cseft l60", error)
    }
};

// emailHelper.createSingleEmailFromTemplate = async (
//     template_key,
//     variablesObj,
//     toEmail,
//   ) => {
//     try {
//     const template = await Template.findOne({ template_key });
//     if (!template) {
//       return { error: "Invalid Template Key" };
//     }
//     const data = {
//       from: template.from,
//       to: toEmail,
//       subject: template.subject,
//       html: template.html,
//     };
//     for (let index = 0; index < template.variables.length; index++) {
//       let key = template.variables[index];
//       if (!variablesObj[key]) {
//         return {
//           error: `Invalid variable key: Missing ${template.variables[index]}`,
//         };
//       }
//       let re = new RegExp(`%${key}%`, "g");
//       data.subject = data.subject.replace(re, variablesObj[key]);
//       data.html = data.html.replace(re, variablesObj[key]);
//     }
//     return data;
//     } catch (err) {        
//         console.log(err.message);
//     }
//   };

emailHelper.send = async (data) => {
    try {
        if (!data) throw new Error("Need email content");
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            }
        });
        let info = await transporter.sendMail(data);
        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.log(err)
    }
};

module.exports = emailHelper;