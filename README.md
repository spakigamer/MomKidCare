# 📧 Mail Analysis with Gmail + Gemini AI

This project automatically fetches unread emails from your Gmail inbox and uses **Gemini AI** (Google’s GenAI model) to extract structured contact information like name, email, and phone number.

---

## 🔧 Features

- Google OAuth2 login to read Gmail inbox.
- Parses unread emails.
- Uses **Gemini API** to extract structured data.
- (Optional) Sends the extracted data via email.

---

## 📁 Project Structure

backend/
├── index.js # Entry point
├── auth.js # Google OAuth and token management
├── processEmails.js # Email reading & parsing logic
├── utils/
│ └── emailSender.js # (Optional) Nodemailer-based email sending
├── credentials.json # Google OAuth credentials (keep private)
├── token.json # Google saved OAuth tokens
├── .env # Secrets and environment variables
└── package.json

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mail-analysis.git
cd mail-analysis/backend
```
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set up Environment Variables
Create a .env file in the backend/ directory and add:

env
Copy
Edit
GEMINI_API_KEY=your_gemini_api_key_here
SENDER_EMAIL=your_email@gmail.com
APP_PASSWORD=your_google_app_password_here
🔑 Where to get these?
GEMINI_API_KEY:
Get it from https://makersuite.google.com/app/apikey
Click "Create API Key" → Copy and paste into .env.

SENDER_EMAIL:
Your Gmail address used to send emails (optional).

APP_PASSWORD (for sending emails using Gmail):

Go to https://myaccount.google.com/apppasswords

Enable 2-Step Verification if not already

Generate an app password for "Mail"

Use the 16-digit password shown as APP_PASSWORD

4. Set up Google OAuth2 for Gmail Access
Go to Google Cloud Console

Create a new project

Navigate to APIs & Services → Credentials

Click "Create Credentials" → OAuth Client ID

Choose Application Type: Desktop App

Download the OAuth file

Rename it to credentials.json

Place it inside the backend/ directory

🔐 Keep this file private and don’t commit it to GitHub

5. Run the Application
bash
Copy
Edit
node index.js
✅ On first run:

It will open a browser to authenticate with your Google account

After authorization, a token will be saved to token.json for reuse

📤 (Optional) Send Extracted Info via Email
To forward extracted contact data by email:

Make sure SENDER_EMAIL and APP_PASSWORD are set in .env

The project uses Gmail SMTP and nodemailer to send emails

🧠 How Gemini AI Works Here
Each email snippet is sent to the Gemini Pro model via the Google Generative Language API. The API responds with structured JSON like:

json
Copy
Edit
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "contact": "+1-1234567890"
}
API Endpoint used:

bash
Copy
Edit
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
Authorization header:

makefile
Copy
Edit
Authorization: Bearer GEMINI_API_KEY
⚠️ Things to Keep in Mind
This project reads email snippets only; for full body parsing, modify the Gmail API request.

Ensure token.json, .env, and credentials.json are ignored using .gitignore:

pgsql
Copy
Edit
.env
token.json
credentials.json
🛡️ Security Tips
Never hardcode secrets in your JS files.

Store sensitive keys and passwords in .env only.

Do not push .env, token.json, or credentials.json to your public repository.

📌 References
📬 Gmail API Docs

🔐 Google App Password

🤖 Gemini API Docs

🧪 Gemini MakerSuite API Key

