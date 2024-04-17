import "./PromptPage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import PreviewBox from "../../components/PreviewBox/PreviewBox";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [previewText, setPreviewText] = useState("Preview here");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // placeholder to handle OpenAI request
  const handleGenerateButtonClick = () => {};

  // placeholder to handle LinkedIn request
  const handlePostButtonClick = () => {};

  return (
    <div className="promptpage">
      <div className="promptpage__input-container">
        <InputBox
          value={inputText}
          onChange={handleInputChange}
          placeholder="Input here"
          className="promptpage__input-box"
        />
        <Button
          buttonText="Generate"
          className="button"
          onClick={handleGenerateButtonClick}
        />
      </div>
      <div className="promptpage__preview-container">
        <PreviewBox
          previewText={previewText}
          className="promptpage__preview-box"
        />
        <Button
          buttonText="Post on LinkedIn"
          className="button"
          onClick={handlePostButtonClick}
        />
      </div>
    </div>
  );
};

export default Home;
