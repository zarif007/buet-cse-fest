import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const handlePromptSubmit = async (prompt) => {
  // const prompt = "how to learn coding";
  const openai = new OpenAIApi(config);
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 100,
  });
  return res.data.choices[0].message.content;
};

export default handlePromptSubmit;
