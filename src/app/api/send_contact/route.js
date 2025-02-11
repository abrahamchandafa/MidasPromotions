import { Storage } from "@google-cloud/storage";
import path from "path";
import { format } from "date-fns";
import nodemailer from "nodemailer";

const storage = new Storage({
    keyFilename: path.join(process.cwd(), "creds.json"),
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const fileName = process.env.CONTACT_FORM_NAME;

async function appendToJson(newData) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    try {
        console.log("Checking if file exists in GCS...");
        const [exists] = await file.exists();
        let jsonData = [];

        if (exists) {
            console.log("File exists. Downloading contents...");
            const [contents] = await file.download();
            jsonData = JSON.parse(contents.toString());
        } else {
            console.log("File does not exist. Creating a new one...");
        }

        jsonData.push(newData);
        console.log("Updating JSON file with new data:", newData);

        await file.save(JSON.stringify(jsonData, null, 2), {
            contentType: "application/json",
        });
        console.log("JSON file successfully updated in GCS.");
    } catch (error) {
        console.error("Error updating JSON file in GCS:", error);
        throw new Error("Failed to update GCS JSON file");
    }
}

async function sendEmail(name, email, subject, message) {
    try {
        console.log("Preparing to send email...");
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "notifications.midasgroup@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: "notifications.midasgroup@gmail.com",
            to: ["info@midaspromotions.com", "jamesmsasi67@gmail.com"],
            subject: "Customer Inquiry",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #4CAF50;">Customer Inquiry</h2>
                    <p style="font-size: 16px;">You have received a new message from a customer:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <tr><th>Name</th><td>${name}</td></tr>
                        <tr><th>Email</th><td>${email}</td></tr>
                        <tr><th>Subject</th><td>${subject}</td></tr>
                        <tr><th>Message</th><td>${message}</td></tr>
                    </table>
                </div>
            `,
        });

        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

export async function POST(req) {
    try {
        console.log("Received POST request...");
        const body = await req.json();
        console.log("Request body:", body);

        const { name, email, subject, message } = body;
        const submittedAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

        const newEntry = { name, email, subject, message, submittedAt };
        console.log("New entry to be saved:", newEntry);

        await appendToJson(newEntry);
        await sendEmail(name, email, subject, message);

        console.log("Request processed successfully.");
        return new Response(JSON.stringify({ success: true, message: "Data saved and email sent" }), { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
