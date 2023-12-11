import axios from 'axios';
import React, {useState} from 'react'
import {toast } from 'react-toastify';


const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [email, setEmail] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async() => {
        try {
            if(!image) {
                alert("Please select a file")
                return
            }

            if(!name || !tags || !email) {
                alert("Please fill all the details")
                return
            }

            const formData = new FormData();
            formData.append('file', image);
            formData.append('name', name);
            formData.append('tags', tags);
            formData.append('email', email);

            const response = await axios.post('http://localhost:4000/api/v1/upload/localfileupload', formData, {
                headers: {
                    'Content-type': 'multipart/form-date',
                }
            })

            setImage(null);
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
        <label htmlFor="image">Choose a Image:</label>
        <input type="file"  id="image" onChange={handleFileChange} />
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
      <button className='uploadbtn' onClick={handleUpload}>Upload Image</button>
    </div>
    </div>
  )
}

export default UploadImage