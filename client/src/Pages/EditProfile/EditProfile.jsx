import { useState, useRef } from "react";
import Dropzone from "../../component/Dropzone";
import { addArt, editProfile } from "../../configs/services";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../component/Header/Header";
import CIRCLE from "../../assets/icons/circle.png"
import "./EditProfile.css";

function EditProfile() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null)
  const [nameFile, setNameFile] = useState("Avatar");
  const [formData, setFormData] = useState({});
  const fullName = useRef();
  const greeting = useRef();
  const avatar = useRef();
  const router = useHistory();

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
        setFile(e.target.files[0])
    }

  const handleUpload = (e) => {
    e.preventDefault();
    const body = new FormData();
    files.forEach((file) => {
      body.append("images", file);
    });
    addArt(body, () => router.push("/my-profile"));
  };
  const handleFilesChange = (files) => {
    const fileNew = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(fileNew);
   
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
        <Dropzone preview={false} onChange={handleFilesChange} text1=" Upload.. " text2=" Best Your Art" />
      </div>
      <div className="w-2/5 px-10">
        <form className="edit-profile">
          <label htmlFor="file" className="cursor-pointer self-center">
              <div style={{justifyContent: "center", display: "flex"}}>
                <img  src={file? URL.createObjectURL(file) : CIRCLE } alt={file? file.name : null}/> 
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
              fileHandler(e)
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
