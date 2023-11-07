import React, { useState, useEffect, useCallback } from 'react';

function Image({ openModal }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const flickrAPIKey = process.env.REACT_APP_API_KEY;  // Replace with your actual Flickr API key



  //loading the images from the as many as possible 
  const loadMoreImages = useCallback(() => {
    setLoading(true);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${flickrAPIKey}&format=json&nojsoncallback=1&safe_search=1&page=${page}&accuracy=1`)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.photos.photo]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [flickrAPIKey, page]);

  //loading more images as we reached to the end if there is any images left to be load
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      !loading
    ) {
      loadMoreImages();
    }
  }, [loading, loadMoreImages]);

  useEffect(function () {
    loadMoreImages();
    
  }, []);

  //hadeling scroll
  useEffect(function () {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="gallery">
      {images.map(photo => (
        
        <img
          key={photo.id}
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={photo.title}
          onClick={() => openModal(photo)}
        />  
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Image;
