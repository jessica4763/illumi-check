import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './Upload.css'

function Upload() {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()} className="upload-container">
        <input {...getInputProps()} />
        <div className="subheader">
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </div>
    )
  }

  export default Upload;
