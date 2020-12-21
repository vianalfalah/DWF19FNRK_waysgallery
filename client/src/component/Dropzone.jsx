import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CLOUD from "../assets/icons/cloud.png";
import Preview from "./Preview";
import "./Dropzone.css";

function Dropzone({
  files = null,
  setFiles,
  preview = true,
  text1= "Drag & drop",
  text2= "or click to select images",
  onChange = null,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      files !== null && uploadFileField(acceptedFiles);
      onChange !== null && onChange(acceptedFiles);
    },
    // eslint-disable-next-line
    [files]
  );
  const uploadFileField = (acceptedFiles) => {
    if (files.length < 4 && acceptedFiles.length + files.length < 5) {
      setFiles((prev) => {
        const fileNew = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        return [...prev, ...fileNew];
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const onRemove = (index) => {
    setFiles((prev) => {
      return prev.filter((element, i) => {
        return element !== undefined && i !== index;
      });
    });
  };

  return (
    <>
      <div className="dropzone">
        <div {...getRootProps()} className={`dropzone2 ${isDragActive && ""}`}>
          <div className="dropzone3">
            <img src={CLOUD} alt="cloud-upload" style={{ marginTop: 70 }} />
          </div>
          <input {...getInputProps()} />
          {isDragActive ? (
            <h5>Drop the images here ...</h5>
          ) : (
            <div>
              <h5>
                <strong style={{ color: "#2fc4b2" }}>{text1}</strong> {text2}
              </h5>
            </div>
          )}
        </div>
      </div>

      {preview && (
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <Preview file={files[0]} remove={() => onRemove(0)} />
          <Preview file={files[1]} remove={() => onRemove(1)} />
          <Preview file={files[2]} remove={() => onRemove(2)} />
          <Preview file={files[3]} remove={() => onRemove(3)} />
        </div>
      )}
    </>
  );
}
export default Dropzone;
