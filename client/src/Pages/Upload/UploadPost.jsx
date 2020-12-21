import { useState, useRef } from "react";
import Dropzone from "../../component/Dropzone";
import { addPost } from "../../configs/services";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../component/Header/Header";
import "./Upload.css";

function UploadPost() {
  const [files, setFiles] = useState([]);
  const title = useRef();
  const description = useRef();
  const router = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title", title.current.value);
    body.append("description", description.current.value);
    files.forEach((file) => {
      body.append("images", file);
    });
    addPost(body, () => router.push("/home"));
  };
  return (
    <>
      <Header />
      <div className="box-upload">
        <Dropzone files={files} setFiles={setFiles} />
      </div>
      <div className="w-2/5 px-10">
        <form className="title-upload">
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="title"
            ref={title}
          />
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            className="description"
            ref={description}
          />
          <div className="box-btn-upload">
            <Button className="cancel">Cancel</Button>
            <Button className="post" onClick={(e) => handleUpload(e)}>
              Upload
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadPost;
