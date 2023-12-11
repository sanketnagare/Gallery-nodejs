import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import VideoDetails from './VideoDetails';


const Videos = () => {
  
    const [mediaData, setMediaData] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState();

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/api/v1/upload/getallvideos');
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

    const deleteVideo = async (videoId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/upload/deletevideo/${videoId}`);
            // refresh data after deletion
            fetchData();
        } catch (error) {
            console.log("Error in deleting video"+error)

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
                            <div className='media' key={item._id} onClick={() => setSelectedVideo(item)}>
                                {item.videoUrl && <video src={`http://localhost:4000/files/${item.videoUrl}`} alt={item.name} muted preload='metadata'/>}
                            </div>
                        ))}
                    </div>
                                                
                <div className='popup_media' style={{ display: selectedVideo ? 'block' : 'none' }}>
                        <div className='icondiv'>

                            {/* delete icon */}
                            <span onClick={
                                (e) => {
                                e.stopPropagation();  
                                deleteVideo(selectedVideo._id);
                                setSelectedVideo(null);
                            } 
                            }>
                                <FontAwesomeIcon icon={faTrash} size="2xs" />
                            </span>

                            {/* Cancle icon */}
                            <span onClick={() => setSelectedVideo(null)}>
                                <FontAwesomeIcon icon={faTimes} size="2xs" />
                            </span>
                        </div>

                        {/* Show image */}
                        {selectedVideo && selectedVideo.videoUrl && (
                            <video src={`http://localhost:4000/files/${selectedVideo.videoUrl}`} alt={selectedVideo.name} muted autoPlay controls/>
                        )
                        }

                        {selectedVideo && selectedVideo.videoUrl &&( 
                            <div className='videofooter'>
                                <h2>Video name : {selectedVideo.name}</h2>
                                <h2>Video tags : {selectedVideo.tags}</h2>
                            </div>
                            )
                        }

                            {/* show all comments and add comment and reply option for all comments*/}
                        <VideoDetails selectedVideo={selectedVideo} />
                    </div>



                </div>
                
            )}
    </div>
  )
}

export default Videos