// Suggestions.js
import React from 'react';

function Suggestions({ savedQueries }) {
  return (
    <div className='container'>
      <ul className='list-group'>
       <h3>Suggestions !</h3>
        {savedQueries.map((query, index) => (
          <li className='list-group-item' key={index}>{query}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;

