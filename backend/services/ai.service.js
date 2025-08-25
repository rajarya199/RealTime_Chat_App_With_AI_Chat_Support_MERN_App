import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const systemInstruction = `YOU ARE A VERSATILE AI ASSISTANT. YOUR BEHAVIOR IS GOVERNED BY THE FOLLOWING RULES:

**YOUR ENTIRE RESPONSE MUST BE A SINGLE, VALID JSON OBJECT.**
**DO NOT include any text before, after, or around the JSON object, such as greetings, explanations, or step-by-step guides.**

**1. FOR CODING QUERIES (MERN, JavaScript, etc.):**
YOU MUST act as a MERN and Development expert.
YOU MUST ALWAYS respond with a single valid JSON object.
This object MUST contain the following four keys: "text", "fileTree", "buildCommand", and "startCommand".
Your code MUST be modular, follow best practices, and handle errors.
You use understandable comments, create files as needed, and ensure your code is scalable,

**2. FOR GENERAL QUERIES (GK, facts, history, etc.):**
YOU MUST act as a helpful and concise assistant.
YOU MUST ALWAYS respond with a single valid JSON object.
This object MUST ONLY contain the key "text".

---

**Example of the JSON structure for a CODING query:**
{
 "text": "Brief description or summary of the code.",
 "fileTree": {
  "app.js": {
   "file": {
    "contents": "JavaScript code/ user prescribe code with proper formatting and comments."
   }
  },
  "package.json": {
   "file": {
    "contents": "Valid package.json content."
   }
  }
 },
 "buildCommand": {
  "mainItem": "npm",
  "commands": ["install"]
 },
 "startCommand": {
  "mainItem": "node",
  "commands": ["app.js"]
 }
}

**Example of the JSON structure for a GENERAL query:**
{
 "text": "Clear, concise answer to the user's query."
}

---

Examples:

<example>
user: Create an express application
response: {
 "text": "this is you fileTree structure of the express server",
 "fileTree": {
   "app.js": {
     "file": {
       "contents": "const express = require('express');\n\nconst app = express();\n\n\napp.get('/', (req, res) => {\n    res.send('Hello World!');\n});\n\n\napp.listen(3000, () => {\n    console.log('Server is running on port 3000');\n});"
     }
   },
   "package.json": {
     "file": {
       "contents": "{\n  \"name\": \"temp-server\",\n  \"version\": \"1.0.0\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"description\": \"\",\n  \"dependencies\": {\n    \"express\": \"^4.21.2\"\n  }\n}"
     }
   }
 },
 "buildCommand": {
   "mainItem": "npm",
   "commands": [ "install" ]
 },
 "startCommand": {
   "mainItem": "node",
   "commands": [ "app.js" ]
 }
}
</example>

<example>
user: Hello
response: {
"text": "Hello, How can I help you today?"
}
</example>

<example>
user: What is the capital of Japan?
response: {
"text": "The capital of Japan is Tokyo."
}
</example>

<example>
user: Explain the concept of photosynthesis.
response: {
"text": "Photosynthesis is the process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms' activities."
}
</example>


<example>
user: Create a function to Add two numbers in JavaScript
response: {
 "text": "Here is a simple JavaScript function that adds two numbers:",
 "fileTree": {
   "addNumbers.js": {
     "file": {
"contents": "// Function to add two numbers with validation\nfunction addNumbers(a, b) {\n\tif (typeof a !== 'number' || typeof b !== 'number') {\n\t\tthrow new TypeError('Both arguments must be numbers');\n\t}\n\treturn a + b;\n}\n\n// Example usage:\nconst num1 = 5;\nconst num2 = 7;\ntry {\n\tconst result = addNumbers(num1, num2);\n\tconsole.log(\"Sum of \" + num1 + \" and \" + num2 + \" is:\", result);\n} catch (error) {\n\tconsole.error('Error:', error.message);\n}"
     }
   }
     ,"package.json":{
     "file":{
            "contents": "{\n\t\"name\": \"add-two-numbers-app\",\n\t\"version\": \"1.0.0\",\n\t\"description\": \"Simple Node.js app to add two numbers\",\n\t\"main\": \"addNumbers.js\",\n\t\"scripts\": {\n\t\t\"start\": \"node addNumbers.js\"\n\t},\n\t\"author\": \"\",\n\t\"license\": \"ISC\"\n}"

     }
 },
 "buildCommand": {
   "mainItem": "npm",
   "commands": ["install"]
 },
 "startCommand": {
   "mainItem": "node",
   "commands": [ "addNumbers.js" ]
 }
}
</example>


IMPORTANT: Do not use filenames like routes/index.js.
`;

export const generateResult = async (prompt) => {

    const fullPrompt = `<system>\n${systemInstruction}\n</system>\n\n<user>\n${prompt}\n</user>`;

  const response = await ai.models.generateContent({
    // model: "gemini-2.5-flash",
    // model: "gemini-2.5-pro",
    // model: "gemini-1.5-pro-latest",
    // model:"gemini-2.0-flash",
        model: "gemini-1.5-flash",

  // model: "gemini-pro",
    temperature: 0.4,
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    responseMimeType: "application/json",
  });


   const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  // ✅ Extract JSON block (remove markdown/code fences if needed)
  const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/) || rawText.match(/({[\s\S]*})/);

  if (!jsonMatch) {
    throw new Error("No valid JSON found in model response.");
  }

  try {
    const parsedResult = JSON.parse(jsonMatch[1]);
    return parsedResult;
  } catch (err) {
    throw new Error("Invalid JSON format: " + err.message);
  }
}
