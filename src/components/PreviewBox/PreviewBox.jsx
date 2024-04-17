import Button from "../Button/Button";

const PreviewBox = ({ className, previewText, onClickEdit }) => {
  return (
    <div className={className}>
      <p>{previewText}</p>
      <Button className="edit" onClick={onClickEdit} buttonText="Edit" />
    </div>
  );
};

export default PreviewBox;
