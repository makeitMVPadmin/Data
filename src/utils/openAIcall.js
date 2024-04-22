import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export async function getResponseContent({ messages, model, temperature }) {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: model,
      temperature: temperature,
    });
    return completion.choices[0].message;
  } catch (err) {
    return err.message;
  }
}
