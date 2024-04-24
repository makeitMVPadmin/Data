import "./PromptPage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import PreviewBox from "../../components/PreviewBox/PreviewBox";
import { getResponseContent } from "../../utils/openAIcall";
import PromptHeader from '../../components/PromptHeader/PromptHeader';
import NavBar from "../../components/NavBar/NavBar";

const requestObj = {
  messages: [
    {
      role: "system",
      content:
        "You are a friendly assistant, that gives responses to a community organizer appropriate to LinkedIn in JSON format just post content between 200 and 2000 characters in length, no title. The key should be 'content'. Don't include any extra text outside of the post content itself, including hashtags. Don't say you will create the post, just give me the content",
    },
    {
      role: "user",
      content: "",
    },
  ],
  model: "gpt-3.5-turbo",
  temperature: 0.02,
};

const PromptPage = () => {
  const [inputText, setInputText] = useState("");
  const [previewText, setPreviewText] = useState("Preview here");
  const [isEditing, setIsEditing] = useState(false);

  const getOpenAIResponse = async () => {
    setPreviewText("Loading...");
    requestObj.messages[1].content = inputText;

    try {
      const responseContent = await getResponseContent(requestObj);

      // need to parse JSON to return an object we can work with
      const parsedContent = JSON.parse(responseContent.content);

      // // If responseContent has no content, setAiResponseContent to error message
      setPreviewText(
        parsedContent.content
          ? parsedContent.content
          : `Error: ${responseContent}`
      );
    } catch (error) {
      setPreviewText("An error occured. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateButtonClick = () => {
    if (inputText) {
      getOpenAIResponse();
    } else {
      alert("Please add input!");
    }
  };

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // placeholder to handle LinkedIn posting
  const handlePostButtonClick = () => { };

  // conditional rendering refactored out of main return statement
  const previewContent = () => {
    return isEditing ? (
      <InputBox
        value={previewText}
        onChange={(e) => setPreviewText(e.target.value)}
        className="promptpage__preview-box"
      />
    ) : (
      <PreviewBox
        previewText={previewText}
        className="promptpage__preview-box"
        onClickEdit={handleToggleEditing}
      />
    );
  };

  return (
    <div className="promptpage">
      <NavBar />
      <div className="promptpage__container">
        <PromptHeader headerText={"Content"} />
        <div className="promptpage__preview-container">
          {previewContent()}
        </div>
        <PromptHeader headerText={"Use CommitAI To Write Content"} />
        <div className="promptpage__input-container">
          <div className="promptpage__sub-label"><h5>Tone of voice</h5></div>
          <select>
            <option>Tone1</option>
            <option>Tone2</option>
            <option>Tone3</option>
          </select>
          <div className="promptpage__sub-label"><h5>What do you want to share?</h5></div>
          <InputBox
            value={inputText}
            onChange={handleInputChange}
            placeholder="Help me write a professional sounding post about my upcoming community event."
            className="promptpage__input-box"
          />
          <Button className="generate" onClick={handleGenerateButtonClick}>
            Generate
          </Button>
        </div>
      </div>
      <Button className="promptpage__post" onClick={handlePostButtonClick}>
        Post
      </Button>
    </div>
  );
};

export default PromptPage;
