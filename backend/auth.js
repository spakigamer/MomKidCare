require("dotenv").config();
const fs = require("fs");
const http = require("http");
const open = require("open").default; // ✅ <-- Add this line
const { google } = require("googleapis");

const TOKEN_PATH = "token.json";
const CREDENTIALS_PATH = "credentials.json";
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];

function loadCredentials() {
  return new Promise((resolve, reject) => {
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
      if (err) return reject("❌ Error loading credentials: " + err);
      resolve(JSON.parse(content).installed);
    });
  });
}

function getSavedToken() {
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return resolve(null);
      resolve(JSON.parse(token));
    });
  });
}

async function authorizeWithAutoFlow() {
  const { client_id, client_secret, redirect_uris } = await loadCredentials();
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const savedToken = await getSavedToken();
  if (savedToken) {
    oAuth2Client.setCredentials(savedToken);
    return oAuth2Client;
  }

  // No saved token: start interactive auth flow
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return new Promise((resolve, reject) => {
    const server = http
      .createServer(async (req, res) => {
        const url = new URL(req.url, "http://localhost:3000");
        const code = url.searchParams.get("code");

        if (!code) {
          res.end("❌ No authorization code received.");
          return;
        }

        res.end("✅ Authorization successful! You may close this tab.");
        server.close();

        try {
          const { tokens } = await oAuth2Client.getToken(code);
          oAuth2Client.setCredentials(tokens);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
          console.log("✅ Token saved to", TOKEN_PATH);
          resolve(oAuth2Client);
        } catch (err) {
          reject("❌ Token exchange failed: " + err);
        }
      })
      .listen(3000, () => {
        console.log("🌐 Waiting for Google auth callback at http://localhost:3000");
        open(authUrl);
      });
  });
}

module.exports = { authorizeWithAutoFlow };
