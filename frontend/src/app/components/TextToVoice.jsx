import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1', // Replace with your desired AWS region
});

const polly = new AWS.Polly();
const voiceId = 'Joanna'; // Replace with the desired voice

const TextToSpeech = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    handleSynthesizeSpeech()
  }, [text])

  const handleSynthesizeSpeech = async () => {


    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: voiceId,
    };

    try {
      const data = await polly.synthesizeSpeech(params).promise();
      const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.log('Error synthesizing speech:', error);
    }
  };

  return (
    <div>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <style jsx>{`
        .audio-container {
          display: inline-block;
          position: relative;
        }

        .audio-container audio {
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .audio-container audio::-webkit-media-controls-start-playback-button {
          display: flex;
          width: 100%;
          height: 100%;
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TextToSpeech;
