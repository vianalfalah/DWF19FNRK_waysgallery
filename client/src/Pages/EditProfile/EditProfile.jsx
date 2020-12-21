import { useState, useRef } from "react";
import Dropzone from "../../component/Dropzone";
import { addArt, editProfile } from "../../configs/services";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../component/Header/Header";
import CIRCLE from "../../assets/icons/circle.png";
import CAMERA from "../../assets/icons/camera.png";

import "./EditProfile.css";

const Default = () => {
  return (
    <div style={{ position: "relative" }}>
      <img src={CIRCLE} />
      <img src={CAMERA} style={{ position: "absolute", top: 50, left: 50 }} />
    </div>
  );
};
function EditProfile() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [nameFile, setNameFile] = useState("Avatar");
  const [formData, setFormData] = useState({});
  const fullName = useRef();
  const greeting = useRef();
  const avatar = useRef();
  const router = useHistory();
  let history = useHistory();
  const onUpload = (e) => {
    setNameFile(e.target.files[0].name);
  };
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const body = new FormData();
    files.forEach((file) => {
      body.append("images", file);
    });
    addArt(body, () => router.push("/my-profile"));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("greeting", greeting.current.value);
    body.append("fullName", fullName.current.value);
    body.append("avatar", avatar.current.files[0]);
    editProfile(body, () => router.push("/my-profile"));
  };

  return (
    <>
      <Header />
      <div className="drop ">
        <Dropzone
          files={files}
          setFiles={setFiles}
          text1=" Upload.. "
          text2=" Best Your Art"
          style={{ width: 200, height: 200 }}
        />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            className="post"
            style={{ marginBottom: 20 }}
            onClick={(e) => handleUpload(e)}
          >
            Upload
          </Button>
        </div>
      </div>
      <div className="w-2/5 px-10">
        <form className="edit-profile">
          <label
            htmlFor="file"
            className="cursor-pointer self-center"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                marginBottom: 20,
              }}
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file ? file.name : null}
                />
              ) : (
                <Default />
              )}
            </div>
            <input
              type="file"
              className="hidden"
              id="file"
              name="avatar"
              ref={avatar}
              onChange={(e) => {
                handleChange(e);
                onUpload(e);
                fileHandler(e);
              }}
            />
          </label>
          <input
            type="text"
            placeholder="Greeting"
            name="greeting"
            className="greeting"
            ref={greeting}
          />
          <input
            type="text"
            placeholder="FullName"
            name="fullName"
            className="fullname"
            ref={fullName}
          />
          <div className="box-btn-upload">
            <Button className="cancel" onClick={() => history.goBack()}>
              Cancel
            </Button>
            <Button className="post" onClick={(e) => handleEdit(e)}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
