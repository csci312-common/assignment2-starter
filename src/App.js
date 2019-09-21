import React, { useState, useEffect } from 'react';
import Immutable from 'immutable';
import data from './seed.json';

import IndexBar from './components/IndexBar';
import Article from './components/Article';
import './App.css';

/*
  Convert from a list of articles to an Immutable Map.

  The keys of the map are the sections names, with the section determined by the
  first letter of the article title. And the values are an Immutable List of
  the articles belonging to that section.

  https://immutable-js.github.io/immutable-js/docs/#/Map
  https://immutable-js.github.io/immutable-js/docs/#/List

*/
const mapFromArticleList = articles => {
  const collection = {};

  // collate our list of articles into sections
  articles.forEach(article => {
    const label = article.title[0].toUpperCase();
    if (collection[label]) {
      collection[label].push(article);
    } else {
      collection[label] = [article];
    }
  });

  // convert the article lists to immutable lists
  Object.keys(collection).forEach(section => {
    collection[section] = Immutable.List(collection[section]);
  });

  // convert the collection to an immutable map and return it
  return Immutable.Map(collection);
};

function App() {
  // state variable holding the current article collection
  const [collection, loadCollection] = useState(new Map());

  // create an effect hook that is only run once to load the collection into the component's state
  useEffect(() => {
    loadCollection(mapFromArticleList(data));
  }, []);

  // Utilize conditional rendering to only display the Article component when
  // there is a currentArticle
  return (
    <div>
      You need to do this bit...
    </div>
  );
}

export default App;
export { mapFromArticleList }; // To facilitate testing
