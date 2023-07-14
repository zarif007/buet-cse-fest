## Features

#### Chat

```http
  GET /chat
```

| Input      | Using                                       | Output           |
| :--------- | :------------------------------------------ | :--------------- |
| `text`     | `OpenAI GPT-3.5 turbo & AWS Polly`          | `text and voice` |
| `voice`    | `OpenAI GPT-3.5 turbo & AWS Polly & webkit` | `text and voice` |
| `image`    | `OpenAI GPT-3.5 turbo & AWS Rekognition`    | `text and voice` |
| `txt file` | `OpenAI GPT-3.5 turbo`                      | `text and voice` |

#### Conversation

![Logo](https://i.ibb.co/G3QxHL1/screencapture-aipdf-vercel-app-chat-2023-07-14-05-38-42.png)

#### AI generated PDF platform

```http
  GET /
```

![Logo](https://i.ibb.co/v3b1Tw8/screencapture-localhost-3000-2023-07-14-08-45-02.png)

## API Reference

#### Get PDFs

```http
  GET /api/v1/
```

| Parameter | Type  | Description          |
| :-------- | :---- | :------------------- |
|           | `PDF` | **Returns all PDFs** |

#### Req to Gen PDFs

#### Generate PDF

```http
  POST /api/v1/generatepdf
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `prompt`  | `string` | **Generate PDF based on Prompt** |

#### Sentiment detection from pdf

| Input         | Using            | Output                           |
| :------------ | :--------------- | :------------------------------- |
| `pdf content` | `AWS Comprehend` | `POSITIVE or NUTRAL or NEGATIVE` |
