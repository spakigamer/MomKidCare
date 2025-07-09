const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractDetailsFromEmail(emailSnippet) {
  try {
    // --- THIS IS THE CRUCIAL CHANGE ---
    // Change 'gemini-pro' to a model name that was listed as available
    // and supports 'generateContent' from your `listAvailableModels` output.
    // Also, ensure the API version is explicitly set to 'v1' for these models.

    // Recommended options based on your previous 'listAvailableModels' output:
    // For powerful general text: "gemini-2.5-pro" or "gemini-1.5-pro"
    // For faster, more cost-effective: "gemini-2.5-flash" or "gemini-1.5-flash"

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro" // <--- CHOOSE YOUR DESIRED MODEL HERE
    }, {
      apiVersion: "v1" // <--- ADD THIS TO SPECIFY THE V1 API
    });

    const prompt = `
You are an assistant that extracts structured data from plain email text.
Extract the following from the content:
- Full Name
- Email Address
- Contact Number

Email Content:
"${emailSnippet}"

Respond strictly in JSON format like this:
{
  "name": "...",
  "email": "...",
  "contact": "..."
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Raw Response (for debugging):", text); // Add this to see what Gemini returns

    try {
      // It's good practice to ensure the response starts and ends with JSON curly braces
      // as sometimes models might add conversational text around the JSON.
      const jsonStartIndex = text.indexOf('{');
      const jsonEndIndex = text.lastIndexOf('}');
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
          const jsonString = text.substring(jsonStartIndex, jsonEndIndex + 1);
          return JSON.parse(jsonString);
      } else {
          console.error("⚠️ Gemini response did not contain a valid JSON object:", text);
          return null;
      }
    } catch (e) {
      console.error("⚠️ Gemini response was not valid JSON:", text, "Error:", e.message);
      return null;
    }

  } catch (err) {
    // Log the full error object to get more details if it fails again
    console.error("❌ Gemini extraction failed:", err);
    return null;
  }
}

module.exports = { extractDetailsFromEmail };