import React from 'react';
import { shallow } from 'enzyme';

import Article from './Article';

const article = {
  title: 'Alpha Centauri',
  extract: 'An alien diplomat with an enormous egg shaped head',
  edited: '2017-05-08',
};
const articleEditedDate = new Date(article.edited);

describe('Article tests', () => {
  describe('Article content tests', () => {
    let comp;
    beforeEach(() => {
      comp = shallow(<Article article={article} />);
    });

    test('Has title', () => {
      expect(comp.findWhere(n => n.type() && n.text() === 'Alpha Centauri')).toHaveLength(1);
    });

    test('Has extract', () => {
      expect(comp.findWhere(n => n.type() && n.text() === 'An alien diplomat with an enormous egg shaped head')).toHaveLength(1);
    });

    test('Has date', () => {
      expect(comp.findWhere(n => n.type() && n.text() === articleEditedDate.toLocaleString())).toHaveLength(1);
    });
  });

  describe('Article type, id and content tests', () => {
    let comp;
    beforeEach(() => {
      comp = shallow(<Article article={article} />);
    });

    test('Has div#article', () => {
      expect(comp).toContainExactlyOneMatchingElement('div#article');
    });

    test('Has #article-title', () => {
      expect(comp).toContainExactlyOneMatchingElement('#article-title');
      expect(comp.find('#article-title')).toHaveText('Alpha Centauri');
    });

    test('Has #article-text', () => {
      expect(comp).toContainExactlyOneMatchingElement('#article-text');
      expect(comp.find('#article-text')).toHaveText('An alien diplomat with an enormous egg shaped head');
    });

    test('Has #article-timestamp', () => {
      expect(comp).toContainExactlyOneMatchingElement('#article-timestamp');
      expect(comp.find('#article-timestamp')).toHaveText(articleEditedDate.toLocaleString());
    });
  });
});
