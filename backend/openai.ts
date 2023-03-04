import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.GPT_SECRET,
});
const api = new OpenAIApi(config);

export async function promptResponse(
  promptText: string,
  model: string,
  maxTokens: number
) {
  try {
    const completion = await api.createCompletion({
      model: model,
      prompt: `${promptText}`,
      max_tokens: maxTokens,
      n: 10,
      temperature: 0.8
    });
    console.log(completion.data.choices);
    return completion.data.choices[0].text;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

export async function promptResponseMultiple(
  promptText: string,
  model: string,
  maxTokens: number,
) {
  try {
    const completion = await api.createCompletion({
      model: model,
      prompt: `${promptText}`,
      max_tokens: maxTokens,
      n: 10
    });
    const text: string[] = [];
    completion.data.choices.forEach((choice: any) => {
      text.push(choice.text);
    });
    return text.join("");
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

}

// export async function promptResponseStream(
//   prompt: string,
//   prefixChoice: number,
//   model: string,
//   maxTokens: number
// ) {
//   try {
//     console.log(promptPrepend[prefixChoice].prepend);
//     const res = await api.createCompletion(
//       {
//         model: model,
//         prompt: `${promptPrepend[prefixChoice].prepend} ${prompt}`,
//         max_tokens: maxTokens,
//         temperature: 0,
//         stream: true,
//       },
//       { responseType: "stream" }
//     );

//     const result = res.data.on("data", (data: Buffer) =>
//       console.log(parseStreamData(extractLines(data)))
//     );
//     return result;
//   } catch (error: any) {
//     if (error.response?.status) {
//       error.response.data.on("data", (data: Buffer) => {
//         const message = data.toString();
//         try {
//           const parsed = JSON.parse(message);
//           console.error("An error occurred during OpenAI request: ", parsed);
//         } catch (error) {
//           console.error("An error occurred during OpenAI request: ", message);
//         }
//       });
//     } else {
//       console.error("An error occurred during OpenAI request", error);
//     }
//     throw error;
//   }
// }

export async function promptResponseFile(
  file: any,
  prefixChoice: number,
  model: string,
  maxTokens: number
) {
  try {
    // Implement file upload
  } catch (error) {
    // catch errors
    throw error;
  }
}
