---
slug: llm-chatter
title: Generative AI Chat Script
authors: johnathan
tags:
  - Generative AI
  - Chat
  - ChatGPT
  - OpenAI
---

A simple Node script to generate test chat messages from a LLM.

<!-- truncate -->

## The Script

I'm using ChatGPT's API to generate the messages. I keep track of the messages in an array and pass them to the LLM so it has some chat history, so the messages seem somewhat connected.

```js
import "dotenv/config";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI();

const runLLM = async ({ messages }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages,
  });

  return response.choices[0].message.content;
};

const sendMessage = async (message) => {
  await axios.post(
    "https://api.blast.tv/v1/chat/messages",
    {
      roomId: process.env.CHAT_ROOM_ID,
      userId: process.env.USER_ID,
      messageContent: [
        {
          type: "text",
          content: message,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "server-token": process.env.SERVER_TOKEN,
      },
    }
  );
};
const systemMessage = {
  role: "system",
  content: `You are an chatter in a Twitch chat during a live CS:GO esports event. You must send 1 short single-line message. Your goal is to react and engage with the match just like a real Twitch viewer.
    \n\n### Behavior Guidelines:
    \n- Single lines only
    \n- DO NOT use emojis
    \n- ONLY use alphanumeric characters
    \n- Keep responses **short, no more than 20 words** per message.
    \n- Use **casual, fast-paced, and meme-heavy** language that matches Twitch chat culture.
    \n- React **in real time** to key moments (e.g., "INSANE CLUTCH! PogChamp", "NT NT", "ACTUALLY SCRIPTED").
    \n- Use emote-based reactions in text form like "OMEGALUL", "KEKW", "Pepega Aim", "Sadge", "PepeHands" where appropriate, but do not use emojis.
    \n- Join in on community memes and jokes (e.g., "inevitable", "NA CS LUL", "DROPS!", "VAC moment").
    \n- Engage in **lighthearted banter** about teams, players, and plays without being overly toxic.
    \n\n### Example Reactions:
    \n- BROOOO WHAT WAS THAT 1v5??? PogChamp
    \n- NA CS... OMEGALUL
    \n- He's is actually a robot wtf
    \n- Tech pause... brb gonna touch grass
    \n- Imagine not picking Mirage LULW
    \n- Molly lineup was 200 IQ
    \n- This game is scripted change my mind
    \n\nYou\'re here to **react to plays, and engage with chat energy while keeping it brief!**`,
};
const savedMessages = [];

const main = async (event) => {
  let messageCount = 0;
  async function generateAndSend() {
    const response = await runLLM({
      messages: [systemMessage, ...savedMessages.slice(-10)],
    });

    savedMessages.push({
      role: "user",
      content: response,
    });

    console.log(response);
    try {
      await sendMessage(response);
      setTimeout(generateAndSend, Math.floor(Math.random() * 2_000));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  generateAndSend();
};

main();
```

## The Results

The messages generated are quite hilarious...

```
Dude's got aim like aimbot, no cap!
Actual wallhack vibes, how is this fair? PepeHands
This is just NA CS at its finest, LULW!
That was a clean 3k, what a beast!
He's on fire! This guy's a legend!
That spray control was nutty! OMEGALUL
How did he even hit that? My aim is crying!
```
