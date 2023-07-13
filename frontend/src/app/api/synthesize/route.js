import AWS from "aws-sdk";

export default async function handler(req, res) {
  const { text } = req.body;

  console.log(text);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1", // Replace with your desired AWS region
  });

  const polly = new AWS.Polly();
  const params = {
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Joanna", // Replace with the desired voice
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    if (data.AudioStream instanceof Buffer) {
      res.setHeader("Content-Type", "audio/mpeg");
      res.send(data.AudioStream);
    } else {
      res.status(500).json({ error: "Error synthesizing speech" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error synthesizing speech" });
  }
}

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});
