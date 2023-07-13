import AWS from "aws-sdk";
AWS.config.update({
  region: "us-east-1", // Replace with your AWS region, e.g., 'us-west-2'
  credentials: new AWS.Credentials({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }),
});

const comprehend = new AWS.Comprehend();

const DetectSentiment = async (text) => {
  const params = {
    LanguageCode: "en", // Replace with the desired language code
    Text: text,
  };

  try {
    const response = await comprehend.detectSentiment(params).promise();
    return response.Sentiment;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
  }
};

export default DetectSentiment;
