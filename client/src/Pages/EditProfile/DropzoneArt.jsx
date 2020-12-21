import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropzoneArt.css"


function DropzoneArt({
  files = null,
  setFiles,
  preview = true,

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
      <div className="dropzone-art">
        <div {...getRootProps()} className={`dropzone2 ${isDragActive && ""}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <div>
              <h5>
                <strong style={{ color: "#2fc4b2" }}>Upload. </strong> Best
                Your Art
              </h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default DropzoneArt;
