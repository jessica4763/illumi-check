import axios from 'axios'
import defaultImage from './default.png';
import React, {useCallback, useEffect, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import './Upload.css'


function Upload() {
  // Get and store a CSRF token. Callback function only runs once (when the component is mounted)  
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    axios.get("http://localhost:8000/analyze/get_csrf_token")
      .then(response => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch(error => {
        console.error("Error getting CSRF token:", error);
      });
  }, []);

  const [accepted, setAccepted] = useState(false);
  const [currentImage, setCurrentImage] = useState(defaultImage);

  const onDropAccepted = useCallback(acceptedImages => {
    setAccepted(true);

    const reader = new FileReader();
    reader.onabort = () => console.log('Image reading was aborted');
    reader.onerror = () => console.log('Image reading has failed');
    reader.onload = (event) => {
      setCurrentImage(event.target.result);

      predict(event.target.result);
    }

    reader.readAsDataURL(acceptedImages[0]);
  }, [csrfToken]);  // predict uses the context of the onDropAccepted callback function, so we have to add csrfToken to onDropAccepted for predict to have csrfToken

  const predict = async (imageDataURL) => {
    try {
      console.log('csrfToken:', csrfToken);
      const response = await axios.post("http://localhost:8000/analyze/upload", {
        image: imageDataURL
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        withCredentials: true // This allows cookies to be sent
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error running image through CNN:", error);
    }
  } 

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDropAccepted,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    multiple: false,
  });

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
