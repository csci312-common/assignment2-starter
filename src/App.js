import React, { useState } from 'react';
// Load an array of article objects to seed Simplepedia
import data from './seed.json';

import IndexBar from './components/IndexBar';
import Article from './components/Article';
import './App.css';

function App() {
  // State variable holding the current article collection
  const [collection] = useState(data); // We won't change articles so don't need setter

  // Utilize conditional rendering to only display the Article component when
  // there is a currentArticle
  return <div>You need to do this bit...</div>;
}

export default App;
