import Axios from 'axios';

  export const uploadMedia = (blob) =>  {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'jdjof0vs');
    Axios.post('https://api.cloudinary.com/v1_1/rotoflo/video/upload', formData)
  }
