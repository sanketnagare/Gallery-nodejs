import React, {useState} from 'react'
import Images from './Images';
import Videos from './Videos';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';



const Navbar = () => {
    const [selectedOption, setSelectedOption] = useState('images');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className='nav-container'>

            <h1>Gallery</h1>
            <nav>
                <button onClick={() => handleOptionClick('images')}>Images</button>
                <button onClick={() => handleOptionClick('uploadimages')}>Upload Image</button>
                <button onClick={() => handleOptionClick('videos')}>Videos</button>
                <button onClick={() => handleOptionClick('uploadvideos')}>Upload Video</button>
            </nav>



        
            {selectedOption === 'images' && <Images />}
            {selectedOption === 'uploadimages' && <UploadImage />}
            {selectedOption === 'videos' && <Videos />}
            {selectedOption === 'uploadvideos' && <UploadVideo />}
        </div>
    );
}

export default Navbar