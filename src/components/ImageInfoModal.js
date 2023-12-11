const ImageInfoModal = ({ image, onClose }) => {

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
      
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
      
        const i = Math.floor(Math.log(bytes) / Math.log(k));
      
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
      };

    return (
      <div className="image-info-modal">
        <p>Name: {image.name}</p>
        <p>Email: {image.email}</p>
        <p>Tags: {image.tags}</p>
        <p>Size: {formatBytes(image.size)}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };


export default ImageInfoModal;