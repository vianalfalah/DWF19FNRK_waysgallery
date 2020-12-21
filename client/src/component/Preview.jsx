import PLUS from "../assets/icons/plus.png";
import "./Dropzone.css";
const Preview = ({ file, remove = null, canRemove = true }) => {
  return (
    <>
      {file ? (
        <div className="">
          {canRemove && (
            <button style={{ color: "red" }} onClick={remove}>
              <h6>x</h6>
            </button>
          )}
          <img
            src={file.preview}
            alt={file.name}
            key={new Date() + file.size}
            style={{ width: 145, height: 110 }}
          />
        </div>
      ) : (
        <div className="icon-plus">
          <img src={PLUS} style={{ width: 50, height: 50, marginTop: 20 }} />
        </div>
      )}
    </>
  );
};
export default Preview;
