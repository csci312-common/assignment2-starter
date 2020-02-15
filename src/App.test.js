import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import IndexBar from './components/IndexBar';
import Article from './components/Article';
import data from './seed.json';

describe('App shallow rendering tests', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  describe('App component initial content', () => {
    test('Has title', () => {
      // toContainMatchingElement doesn't seem to work with JSX
      expect(app.containsMatchingElement(<h1 id="title">Simplepedia</h1>)).toBe(
        true
      );
    });

    test('Contains an IndexBar component', () => {
      expect(app).toContainExactlyOneMatchingElement(IndexBar);
    });

    test('Does not display Article at startup', () => {
      expect(app).not.toContainMatchingElement(Article);
    });
  });
});

describe('App full rendering tests', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  describe('IndexBar tests', () => {
    test('IndexBar receives collection and callback as prop', () => {
      expect(app.find(IndexBar)).toHaveProp('collection', data);
      expect(app.find(IndexBar)).toHaveProp('select'); // Should be a function
    });
  });

  // We use full rendering so that we can test Article rendering when a title is clicked
  describe('Article tests', () => {
    beforeEach(() => {
      // Click on section header and then title of an article (from seed.json)
      const section = app.find('li').filterWhere(n => n.text() === 'I');
      section.simulate('click');
      const title = app.find('li').filterWhere(n => n.text() === 'Ikoga');
      title.simulate('click');
    });

    test('Article should be visible', () => {
      expect(app).toContainExactlyOneMatchingElement(Article);
    });

    test('Article should have article as its prop', () => {
      const article = data.find(val => val.title === 'Ikoga');
      expect(app.find(Article)).toHaveProp('article', article);
    });

    test('Selecting another section should clear the article', () => {
      expect(app).toContainExactlyOneMatchingElement(Article);
      const section = app.find('li').filterWhere(n => n.text() === 'A');
      section.simulate('click');
      expect(app).not.toContainExactlyOneMatchingElement(Article);
    });
  });
});
