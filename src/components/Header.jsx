
import React, { useState, useEffect } from 'react';


function Header({ saveQuery , update}) {
    //to store querries
    const [searchQuery, setSearchQuery] = useState('');
    //to store the result
    const [searchResults, setSearchResults] = useState([]);

    //apicall with search params
    const flickrAPIKey = process.env.REACT_APP_API_KEY; 
    useEffect(function () {
      if (searchQuery) {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAPIKey}&text=${searchQuery}&format=json&nojsoncallback=1&safe_search=1`)
          .then(response => response.json())
          .then(data => {
            setSearchResults(data.photos.photo);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }, [searchQuery, flickrAPIKey]);
  
    //on change of input trigering search
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      update(searchResults);
    };

    //to prevent default funtions of forms to reload the page
    function handleSave(e){
        if(searchQuery === ''){
            console.log('no');
        }
        else{
        e.preventDefault();
        saveQuery(searchQuery);
        setSearchQuery('');
        }
    }
    
    return (
            <nav class="navbar">
                <form className="form" >
                   <h2>Search Photos</h2>
                   <div className="searchBox">
                     <input className="inputFeild" type="text" onChange={handleSearch} value={searchQuery} placeholder="Search Photos..." />
                     <button type='submit' onClick={handleSave}
                      onSubmit={handleSave}>Search</button> 
                   </div> 
                </form>
            </nav>

    );
}

export default Header;