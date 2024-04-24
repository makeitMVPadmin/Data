import "./PromptHeader.scss";

const PromptHeader = ({ headerText }) => {

  return (
    <div className="prompt-header">
      <h4>{headerText}</h4>
    </div>)
}

export default PromptHeader;