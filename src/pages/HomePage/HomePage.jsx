import "./HomePage.scss";
import { useEffect, useState } from 'react';
import { getResponseContent } from '../../utils/openAIcall';

const Home = () => {

  const [aiResponseContent, setAiResponseContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let requestObj = {
      messages: [
        { role: "system", content: "You are a friendly assistant, that gives responses to a community organizer appropriate to LinkedIn in JSON format just post content between 200 and 2000 characters in length, no title. Don't include any extra text outside of the post content itself." },
        { role: "user", content: "Help me write a professional sounding post about my upcoming community event, suitable for posting on LinkedIn." },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.02
    }
    const getOpenAIResponse = async () => {

        // awaits result of getResponseContent from utils, which makes the API call, before setting the state to that result
        const responseContent = await getResponseContent(requestObj);
        // I will rename these
        setAiResponseContent(responseContent.content ? responseContent.content : responseContent)
        setLoading(false)
    }
    getOpenAIResponse();
  }, [])


  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
      <p>{loading ? "Loading..." : aiResponseContent}</p>
    </div>
  );
};

export default Home;
