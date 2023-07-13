import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: "us-east-1", // Replace with your desired AWS region
});

const rekognition = new AWS.Rekognition();

const handleDetectTextFromImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const imageBytes = new Uint8Array(reader.result);

      const params = {
        Image: {
          Bytes: imageBytes,
        },
      };

      try {
        const response = await rekognition.detectText(params).promise();
        const detectedText = response.TextDetections.map(
          (text) => text.DetectedText
        ).join(" ");
        resolve(detectedText);
      } catch (error) {
        console.error("Error detecting text:", error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading image file:", error);
      reject(error);
    };

    reader.readAsArrayBuffer(imageFile);
  });
};

export default handleDetectTextFromImage;
