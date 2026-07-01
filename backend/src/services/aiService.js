const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateProjectComponents = async (
  projectName
) => {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
A student wants to build this electronics project:

${projectName}

Generate the required electronic components.

For each component return:

- displayName (human readable)
- searchKeywords (3-5 alternative names used by electronics sellers)
- purpose
- required

Example:

{
  "displayName":"Arduino Uno R3",
  "searchKeywords":[
    "Arduino Uno",
    "Arduino",
    "UNO R3"
  ],
  "category": "Microcontroller",
  "purpose":"Main microcontroller",
  "required":true
}
`,

      config: {
        responseMimeType: "application/json",

      responseSchema: {
  type: "object",

  properties: {
    project: {
      type: "string",
    },

    difficulty: {
      type: "string",
    },

    estimatedCost: {
      type: "number",
    },

    estimatedBuildTime: {
      type: "string",
    },

    description: {
      type: "string",
    },

    components: {
      type: "array",

      items: {
        type: "object",

        properties: {
          displayName: {
            type: "string",
          },

          searchKeywords: {
            type: "array",
            items: {
              type: "string",
            },
          },

          purpose: {
            type: "string",
          },

          required: {
            type: "boolean",
          },
        },

        required: [
          "displayName",
          "searchKeywords",
          "purpose",
          "required",
        ],
      },
    },
  },

  required: [
    "project",
    "difficulty",
    "estimatedCost",
    "estimatedBuildTime",
    "description",
    "components",
  ],
},
      },
    });

  return JSON.parse(response.text);
};

module.exports = {
  generateProjectComponents,
};