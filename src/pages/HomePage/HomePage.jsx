import "./HomePage.scss";
import { useEffect, useState } from 'react';
import { getResponseContent } from '../../utils/openAIcall';

const Home = () => {

  const [aiResponseContent, setAiResponseContent] = useState("");

  useEffect(() => {
    const fetchResponse = async () => {

      // awaits result of getResponseContent from utils, which makes the API call, before setting the state to that result
      const responseContent = await getResponseContent([
        { role: "system", content: "You are a friendly assistant, that gives responses to a community organizer in JSON format." },
        { role: "user", content: "Help me write a professional sounding post about my upcoming community event, suitable for posting on LinkedIn." },
        { role: "assistant", content: "What kind of event do you want to promote?" },
        { role: "user", content: "I want to tell everyone about a livestream I'm hosting with a guest speaker." },
        { role: "assistant", content: "Who is the speaker and what are they speaking about?" },
        { role: "user", content: "The guest speaker is Mickey Mouse and he is speaking about how AI-generated animation could threaten his job." }
      ],
      "gpt-3.5-turbo",
      1.0
      );
      setAiResponseContent(responseContent.content)
    }
    fetchResponse();
  }, [])


  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
      <p>{aiResponseContent}</p>
    </div>
  );
};

export default Home;
