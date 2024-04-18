import "./PromptPage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import PreviewBox from "../../components/PreviewBox/PreviewBox";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [previewText, setPreviewText] = useState("Preview here");
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // placeholder to handle OpenAI request
  const handleGenerateButtonClick = () => {
    if (inputText) {
      setPreviewText(inputText);
    } else {
      alert("Please add input!");
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // placeholder to handle LinkedIn posting
  const handlePostButtonClick = () => {};

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
        onClickEdit={toggleEditing}
      />
    );
  };

  return (
    <div className="promptpage">
      <div className="promptpage__input-container">
        <InputBox
          value={inputText}
          onChange={handleInputChange}
          placeholder="Input here"
          className="promptpage__input-box"
        />
        <Button className="generate" onClick={handleGenerateButtonClick}>
          Generate
        </Button>
      </div>
      <div className="promptpage__preview-container">
        {previewContent()}
        <Button className="post" onClick={handlePostButtonClick}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default Home;
