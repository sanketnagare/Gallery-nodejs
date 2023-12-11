import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faReply } from '@fortawesome/free-solid-svg-icons';

const VideoDetails = ({selectedVideo}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReplyComment, setNewReplyComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [user1, setUser1] = useState('Sanket')
    const [user2, setUser2] = useState('Swapnil')
  
    const fetchComments = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/v1/upload/getcomments/${selectedVideo._id}`);
          setComments(response.data.data || []);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

    useEffect(() => {
      if (selectedVideo) {
        fetchComments();
      }
    }, [selectedVideo]);




  
    const addComment = async () => {
      try {
        console.log(selectedVideo._id, newComment)
        const response = await axios.post(`http://localhost:4000/api/v1/upload/comment`, { 
            videoId: selectedVideo._id,
            text: newComment,
            user: user1
        });

        const updatedVideo = response.data.data;

        console.log(updatedVideo);

        // Refresh comments after adding
        setNewComment('');
        fetchComments();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  
    const addReply = async (commentId, replyText) => {
      try {
        await axios.post(`http://localhost:4000/api/v1/upload/reply`, { 
            videoId: selectedVideo._id,
            commentId: commentId,
            text: replyText,
            user: user1
        });
        // Refresh comments after adding reply
        setReplyTo(null);
        fetchComments();
      } catch (error) {
        console.error('Error adding reply:', error);
      }
    };
  
    return (
      <div className="video-details">
        <h3>Comments Section</h3>

        <div className="comments-container">
          {comments.map((comment) => (

            <div key={comment._id} className="comment">
                <div className='userinfo'>
                    <FontAwesomeIcon icon={faUser} size='l' style={{color: "#ffffff",}} />
                    <p>{user1}</p>
                </div>
                <div className='commenttext'>
                    <p className=''>{comment.text}</p>
                    <FontAwesomeIcon icon={faReply} style={{color: "#ffffff",}} onClick={() => setReplyTo(comment._id)}/>
                </div>
                
              {/* <button onClick={() => setReplyTo(comment._id)}>Reply</button> */}
              
              {comment.replies && (
                <div className="replies-container">
                    <div className='replies'>
                        
                        {comment.replies.map((reply) => (
                                <div key={reply._id} className="reply">
                                    <div className='userinfo'>
                                        <FontAwesomeIcon icon={faUser} size='l' style={{color: "#ffffff",}} />
                                        <p className='username'>{user2} Replied: </p>
                                        <p>{reply.text}</p>
                                    </div>
                                </div>
                        ))}
                  </div>
                </div>
              )}

              {replyTo === comment._id && (
                <div className="reply-input">
                  <input
                    type="text"
                    value={newReplyComment}
                    onChange={(e) => setNewReplyComment(e.target.value)}
                    placeholder="Reply to this comment"
                  />
                  <button onClick={() => addReply(comment._id, newReplyComment)}>Reply</button>
                </div>
              )}
            </div>
          ))}
        </div>




        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={addComment}>Comment</button>
        </div>
      </div>
    );
}

export default VideoDetails