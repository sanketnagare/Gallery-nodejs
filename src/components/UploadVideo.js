import axios from 'axios';
import React, {useState} from 'react'
import {toast } from 'react-toastify';

const UploadVideo = () => {
    const [video, setVideo] = useState(null);
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [email, setEmail] = useState('');

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleUpload = async() => {
        try {
            if(!video) {
                alert("Please select a file")
                return
            }

            if(!name || !tags || !email) {
                alert("Please fill all the details");
                return
            }


            const formData = new FormData();
            formData.append('videoFile', video);
            formData.append('name', name);
            formData.append('tags', tags);
            formData.append('email', email);

            const response = await axios.post('http://localhost:4000/api/v1/upload/videoUpload', formData, {
                headers: {
                    'Content-type': 'multipart/form-date',
                }
            })

            setVideo(null);
            setName('');
            setTags('');
            setEmail('');

            toast.success(response.data.message);

            console.log(response);

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

  return (
    <div className='uploadformbody'>
    <div className='uploadform'>
      <div className='inputdiv'>
        <label htmlFor="video">Choose a video:</label>
        <input type="file"  id="video" onChange={handleFileChange} />
      </div>
      <div className='inputdiv'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='inputdiv'>
        <label htmlFor="tags">Tags:</label>
        <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className='inputdiv'>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button className='uploadbtn' onClick={handleUpload}>Upload Video</button>
    </div>
    </div>
  )
}

export default UploadVideo