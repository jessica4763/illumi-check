import React, {useCallback, useEffect, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import './Upload.css'

import defaultImage from './default.png';


function Upload() {
  const [accepted, setAccepted] = useState(false);
  const [currentImage, setCurrentImage] = useState(defaultImage);

  const onDropAccepted = useCallback(acceptedImages => {
    setAccepted(true);

    const reader = new FileReader();
    reader.onabort = () => console.log('Image reading was aborted');
    reader.onerror = () => console.log('Image reading has failed');
    reader.onload = (event) => {
      setCurrentImage(event.target.result);

      // document.querySelector('.upload-container').style.border = '0px dashed #757575';
    }

    reader.readAsDataURL(acceptedImages[0]);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDropAccepted,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    multiple: false,
  })  

  useEffect(() => {
    console.log('isDragActive:', isDragActive);
  }, [isDragActive]);

  function RenderedText() {
    return (
      <div className='default' style={{ backgroundImage: {currentImage} }}>
        {
        isDragActive 
        ? <p>Drop the image here</p> 
        : <div>
            <p>Upload or drag and drop an image</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
        }
      </div>
    )
  }

  function RenderedContent() {
    if (accepted && !isDragActive) {
      return <img src={currentImage} width='600' height='337.5' />
    } else {
      return <RenderedText />
    }
  }

  return (
    <div {...getRootProps()} className="upload-container">
      <input {...getInputProps()} />
      <RenderedContent />
    </div>
  )
}


export default Upload;
