import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const handlePromptSubmit = async (prompt: string) => {
  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
    });
    console.log(result);
  } catch (e) {
    console.log("Something is going wrong, Please try again.");
  }
  //   setLoading(false);
};

export default handlePromptSubmit;
