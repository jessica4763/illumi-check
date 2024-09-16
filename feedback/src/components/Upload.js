import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './Upload.css'


function Upload() {
  const onDrop = useCallback(acceptedImage => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="upload-container">
      <input {...getInputProps()} />
      <div className="upload-container-text">
        {
          isDragActive ?
            <p>drop the image here</p> :
            <p>upload or drag and drop an image</p>
        }
      </div>
    </div>
  )
}


export default Upload;
