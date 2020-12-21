import { useState, useRef } from "react";
import Dropzone from "../../component/Dropzone";
import { addProject } from "../../configs/services";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../component/Header/Header";
import "./Upload.css";

function SendProject() {
  const [files, setFiles] = useState([]);

  const description = useRef();
  const router = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("description", description.current.value);
    files.forEach((file) => {
      body.append("fileName", file);
    });
    addProject(body, () => router.push("/home"));
  };
  return (
    <>
      <Header />
      <div className="box-upload">
        <Dropzone files={files} setFiles={setFiles} />
      </div>
      <div className="w-2/5 px-10">
        <form className="title-upload">
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            className="description"
            ref={description}
          />
          <div className="box-btn-upload">
            <Button className="send-project" onClick={(e) => handleUpload(e)}>
              Send Project
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SendProject;
