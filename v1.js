import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './Upload.css'


function Upload() {
  const [imageAccepted, setImageAccepted] = useState(false);

  const onDropAccepted = useCallback(acceptedImages => {
    const img = acceptedImages[0];

    setImageAccepted(true);

    const reader = new FileReader();
    reader.onabort = () => console.log('Image reading was aborted');
    reader.onerror = () => console.log('Image reading has failed');
    reader.onload = (event) => {
      const img = document.querySelector('#user-image');
      img.src = event.target.result;
      img.width = '600';
      img.height = '337.5';

      const upload_container = document.querySelector('.upload-container');
      upload_container.style.border = '0px dashed #757575';
    }
    reader.readAsDataURL(img);
  }, []);

  const onDragOver = useCallback(() => {
    // If another image is currently being dragged to the drop zone, 
    // don't render the current image
    if (isDragActive) {
      setImageAccepted(false);
    }
  });

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDropAccepted,
    onDragOver,
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
    if (isDragActive) { 
      return <p>Drop the image here</p>
    } else {
      if (imageAccepted) {
        return <img id="user-image"/>
      } else {
        return (
          <div>
            <p>Upload or drag and drop an image</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
        )
      }
    }
  }

  return (
    <div {...getRootProps()} className="upload-container">
      <input {...getInputProps()} />
      <div className="upload-container-text">
        {
          <RenderedText/>
        }
      </div>
    </div>
  )
}


export default Upload;
