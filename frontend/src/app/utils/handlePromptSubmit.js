import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: "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",
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
