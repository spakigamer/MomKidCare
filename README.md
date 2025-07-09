# 📧 Mail Analysis with Gmail + Gemini AI

This project automatically fetches unread emails from your Gmail inbox and uses **Gemini AI** (Google’s GenAI model) to extract structured contact information like name, email, and phone number.

---

## 🔧 Features

- 🔐 Google OAuth2 login to read Gmail inbox.
- 📥 Parses unread emails.
- 🤖 Uses Gemini API to extract structured data.
- 📤 (Optional) Sends the extracted data via email using Nodemailer.

---

## 📁 Project Structure

```
backend/
├── index.js             # Entry point
├── auth.js              # Google OAuth and token handling
├── processEmails.js     # Gmail fetching + Gemini parsing
├── services/
│   └── forwarder.js     # (Optional) Email forwarder
├── utils/
│   └── gemini.js        # Gemini API interaction
├── credentials.json     # Google OAuth credentials (private)
├── token.json           # Saved access token (private)
├── .env                 # Environment variables
├── .gitignore
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` folder with this structure:

```
YOUR_GMAIL=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_digit_app_password
FORWARD_TO_EMAIL=recipient@example.com
GEMINI_API_KEY=your_gemini_api_key_here
```

### 🔐 Where to Get These?

#### `YOUR_GMAIL`
Your own Gmail address. This will be used to send the forwarded email.

#### `GMAIL_APP_PASSWORD`
1. Visit: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)  
2. Enable 2-Step Verification if not already.
3. Select **"Mail"** as the app and **"Other"** as the device.
4. Copy the **16-digit password** shown.

#### `FORWARD_TO_EMAIL`
The email address where you want the structured data forwarded (optional).

#### `GEMINI_API_KEY`
1. Visit: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)  
2. Click **“Create API Key”**
3. Copy the key and paste it into `.env`

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mail-analysis.git
cd mail-analysis/backend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project.
3. Enable the **Gmail API**.
4. Go to **APIs & Services > Credentials**
5. Click **"Create Credentials" → OAuth Client ID**
6. Choose **"Desktop App"** as the application type
7. Download the credentials JSON
8. Rename it to:

```
credentials.json
```

Place it inside the `backend/` directory.

> ⚠️ Keep this file private and do **not** upload it to GitHub.

---

### 4️⃣ Start the Application

```bash
node index.js
```

✅ On first run:
- It will open a browser to authenticate your Gmail account.
- A `token.json` file will be created for future logins.

---

## 📤 Optional: Send Extracted Data via Email

If `FORWARD_TO_EMAIL`, `YOUR_GMAIL`, and `GMAIL_APP_PASSWORD` are set:
- Extracted name, email, and contact info will be forwarded using **Nodemailer** via Gmail SMTP.

---

## 🤖 Gemini AI Usage

Each email snippet is sent to the **Gemini Pro** model using the **Google Generative Language API**.

### Example Output:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "contact": "+91-9876543210"
}
```

### API Endpoint:

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

### Authorization Header:

```
Authorization: Bearer GEMINI_API_KEY
```

---

## 📄 .gitignore

Make sure your `.gitignore` includes:

```
.env
token.json
credentials.json
node_modules/
```

---

## 🛡️ Security Tips

- Do **not** commit `.env`, `token.json`, or `credentials.json` to Git.
- Always store secrets and API keys in `.env`.
- Use `.gitignore` to avoid accidental exposure.

---

## 📚 References

- 📬 Gmail API Docs: [https://developers.google.com/gmail/api](https://developers.google.com/gmail/api)
- 🔐 Google App Password Setup: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- 🤖 Gemini API Docs: [https://ai.google.dev/docs/gemini_api_overview](https://ai.google.dev/docs/gemini_api_overview)
- 🧪 MakerSuite API Key: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---
