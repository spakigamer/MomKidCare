const { extractDetailsFromEmail } = require("./utils/gemini");
const { forwardDetails } = require("./services/forwarder");
const { google } = require("googleapis");
const fs = require("fs");

async function listUnreadEmails(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.messages.list({
    userId: "me",
    q: "is:unread",
    maxResults: 5,
  });

  const messages = res.data.messages;
  if (!messages) {
    console.log("No unread messages found.");
    return;
  }

  for (let msg of messages) {
    const msgData = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
      format: "full",
    });

    const snippet = msgData.data.snippet;
    console.log("🔍 Email Snippet Sent to Gemini:\n", snippet);

    const extracted = await extractDetailsFromEmail(snippet);
    if (extracted) {
      await forwardDetails(extracted);
    } else {
      console.warn("⚠️ Failed to extract data from email.");
    }

    // Optionally mark as read
    await gmail.users.messages.modify({
      userId: "me",
      id: msg.id,
      requestBody: {
        removeLabelIds: ["UNREAD"],
      },
    });
  }
}

module.exports = { listUnreadEmails };
