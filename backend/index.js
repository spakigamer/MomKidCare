require("dotenv").config();
const { authorizeWithAutoFlow } = require("./auth");
const { listUnreadEmails } = require("./processEmails");

async function main() {
  try {
    const auth = await authorizeWithAutoFlow();
    await listUnreadEmails(auth);
  } catch (err) {
    console.error("❌ Error during authorization or email processing:", err);
  }
}

main();
