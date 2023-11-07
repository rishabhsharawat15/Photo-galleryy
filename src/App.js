
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Image from './components/Image';

import Modal from './components/Modal';
import Suggestions from './components/Suggestions';

function App() {
  const [savedQueries, setSavedQueries] = useState([]);
  const [simages, setImages] = useState([]);
  const [search, setsearch] = useState(false);
  
  // Load quesries that are saved in the browser
  useEffect(function () {
    const storedQueries = JSON.parse(localStorage.getItem('savedQueries')) || [];
    setSavedQueries(storedQueries);
  }, []);

  // Save newly typed query to local storage of the system
  function saveQuery(query) {
    // Check if the query already exists in savedQueries
    if (!savedQueries.includes(query)) {
      const updatedQueries = [...savedQueries, query];
      setSavedQueries(updatedQueries);
      localStorage.setItem('savedQueries', JSON.stringify(updatedQueries));
    }
  }

  // update whether photo is clicked or not
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function openModal(photo) {
    setSelectedPhoto(photo);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedPhoto(null);
    setShowModal(false);
  }

  function upd(newlist){
    setsearch(true);
    setImages(newlist);
  }
  

  return (
    <div className="App">
      <Header saveQuery={saveQuery} update ={upd} />
      <Suggestions savedQueries={savedQueries} />

      {/* //implement search on top of the page */}
      {search && simages.map(photo => (
        <img
        
          key={photo.id}
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={photo.title}
          onClick={() => openModal(photo)}
        />
      ))
      }
      <Image openModal={openModal} />
      <Modal showModal={showModal} closeModal={closeModal} photo={selectedPhoto} />
    </div>
  );
}

export default App;


