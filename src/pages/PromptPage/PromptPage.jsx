import "./PromptPage.scss";
import { useState } from "react";
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import PreviewBox from "../../components/PreviewBox/PreviewBox";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [previewText, setPreviewText] = useState("Preview here");
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // placeholder to handle OpenAI request
  const handleGenerateButtonClick = () => {
    if (inputText) {
      setPreviewText(inputText);
      setEditing(!editing);
    } else {
      alert("Please add input!");
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  // placeholder to handle LinkedIn posting
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
          className="generate"
          onClick={handleGenerateButtonClick}
        />
      </div>
      <div className="promptpage__preview-container">
        {editing ? (
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
        )}
        <Button
          buttonText="Post on LinkedIn"
          className="post"
          onClick={handlePostButtonClick}
        />
      </div>
    </div>
  );
};

export default Home;
