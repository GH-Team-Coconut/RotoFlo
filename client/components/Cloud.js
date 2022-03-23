import Axios from 'axios';
import React, {useState} from 'react';
//import {Image, Video} from 'cloudinary-react';

function Cloud() {

  const [mediaSelected, setMediaSelected] = useState('');
  const [secureUrl, setSecureUrl] = useState(''); //this is what we will be putting in our db

  const uploadMedia = () =>  {
    const formData = new FormData();
    formData.append('file', mediaSelected);
    formData.append('upload_preset', 'jdjof0vs');
    Axios.post('https://api.cloudinary.com/v1_1/rotoflo/video/upload', formData).then((response)=>{
      setSecureUrl(response.data.secure_url)
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <input type='file' onChange={(event) =>{setMediaSelected(event.target.files[0])}} />
        <button onClick={uploadMedia}>Upload Media</button>
        {/* <Video cloudName='rotoflo' publicId={secureUrl} /> */}
        <video src={secureUrl} autoPlay />
      {console.log('SECUREURL', secureUrl)}
      </header>
    </div>
  );
}

export default Cloud;
