import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ImageInfoModal from './ImageInfoModal'

const Images = () => {

    const [mediaData, setMediaData] = useState([]);
    const [selectedImage, setSelectedImage] = useState();

    const [loading, setLoading] = useState(false);

    const [showInfoModal, setShowInfoModal] = useState(false);

    const showImageInfo = (image) => {
        setSelectedImage(image);
        setShowInfoModal(true);
    };

    const closeInfoModal = () => {
        setShowInfoModal(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/api/v1/upload/getallimages');
            // console.log(response)
            setMediaData(response.data.data || []);
        } catch (error) {
            console.error('Error fetching media data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const deleteImage = async (imageId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/upload/deleteimage/${imageId}`);
            // refresh data after deletion
            fetchData();
        } catch (error) {
            console.log("Error in deleting image"+error)

        }
    }

  return (
    <div className='container'>
        {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className='media-container'>
                        {mediaData.map((item) => (
                            <div className='media' key={item._id} onClick={() => setSelectedImage(item)}>
                                {item.imageUrl && <img src={`http://localhost:4000/files/${item.imageUrl}`} alt={item.name} />}
                            </div>
                        ))}
                    </div>

                    <div className='popup_media' style={{ display: selectedImage ? 'block' : 'none' }}>
                        <div className='icondiv'>

                            <span onClick={
                                (e) => {
                                    e.stopPropagation();
                                    showImageInfo(selectedImage);
                                }
                            }>
                                <FontAwesomeIcon icon={faInfoCircle} size="2xs" />
                            </span>

                            {/* delete icon */}
                            <span onClick={
                                (e) => {
                                e.stopPropagation();  
                                deleteImage(selectedImage._id);
                                setSelectedImage(null);
                            } 
                            }>
                                <FontAwesomeIcon icon={faTrash} size="2xs" />
                            </span>

                            {/* Cancle icon */}
                            <span onClick={() => {closeInfoModal(); setSelectedImage(null)}}>
                                <FontAwesomeIcon icon={faTimes} size="2xs" />
                            </span>
                        </div>

                        {/* Show image */}
                        {selectedImage && selectedImage.imageUrl && (
                            <img src={`http://localhost:4000/files/${selectedImage.imageUrl}`} alt={selectedImage.name} />
                        )}

                        {/* Image Info Modal */}
                        {showInfoModal && (
                            <ImageInfoModal image={selectedImage} onClose={closeInfoModal} />
                        )}
                    </div>
                </div>
            )}
    </div>
  )
}


export default Images