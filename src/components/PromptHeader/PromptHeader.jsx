import "./PromptHeader.scss";

const PromptHeader = ({ headerText }) => {

  return (
    <div className="prompt-header">
      <h5>{headerText}</h5>
    </div>)
}

export default PromptHeader;