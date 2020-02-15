import React from 'react';
import { shallow, mount } from 'enzyme';

import IndexBar from './IndexBar';

const articles = [
  {
    title: 'Alpha Centauri',
    extract: 'An alien diplomat with an enormous egg shaped head',
    edited: '2017-05-08'
  },
  {
    title: 'Dominators',
    extract: 'Galactic bullies with funny robot pals.',
    edited: '2017-05-08'
  },
  {
    title: 'Cybermen',
    extract:
      'Once like us, they have now replaced all of their body parts with cybernetics',
    edited: '2017-05-08'
  },
  {
    title: 'Auton',
    extract: 'Platic baddies driven by the Nestine consciousness',
    edited: '2017-05-08'
  },
  {
    title: 'Dalek',
    extract: 'Evil little pepperpots of death',
    edited: '2017-05-08'
  }
];

describe('IndexBar initialization', () => {
  test('Handles empty array without error', () => {
    shallow(<IndexBar collection={[]} select={jest.fn} />);
  });
});

describe('IndexBar title bar', () => {
  // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
  // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
  let listBar;

  beforeEach(() => {
    listBar = mount(<IndexBar collection={articles} select={jest.fn} />);
  });

  test('Renders sorted section list', () => {
    expect(listBar).toContainExactlyOneMatchingElement('div#section-list');

    const sectionList = listBar.find('div#section-list li');
    expect(sectionList.map(li => li.text())).toEqual(['A', 'C', 'D']);
  });
});

describe('IndexBar actions', () => {
  let selectCallback;
  let listBar;

  beforeEach(() => {
    // Create a mock select callback function
    selectCallback = jest.fn();

    // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
    // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
    listBar = mount(<IndexBar collection={articles} select={selectCallback} />);
  });

  test('Changes section on click', () => {
    // Find the section link
    const section = listBar.find('li').filterWhere(n => n.text() === 'D');
    section.simulate('click');

    // Callback to clear article should have no arguments
    expect(selectCallback).toHaveBeenCalledWith();

    // Should be section labels list and section titles list
    const lists = listBar.find('ul');
    expect(lists).toHaveLength(2);

    // Grab titles list
    const titleList = lists.at(1);
    expect(titleList.children().map(li => li.text())).toEqual([
      'Dalek',
      'Dominators'
    ]);
  });

  test('Shows article on click', () => {
    const article = articles[0];
    const section = listBar
      .find('li')
      .filterWhere(n => n.text() === article.title[0].toUpperCase());
    section.simulate('click');

    // Click an article title
    const title = listBar
      .find('li')
      .filterWhere(n => n.text() === article.title);
    title.simulate('click');

    // We should have two callbacks, first with no argument on selecting C to clear
    // article and then selecting the specific article
    expect(selectCallback).toHaveBeenLastCalledWith(article);
  });

  test('Clears article when another section is clicked', () => {
    const section1 = listBar.find('li').filterWhere(n => n.text() === 'C');
    section1.simulate('click');

    // Click another section
    const section2 = listBar.find('li').filterWhere(n => n.text() === 'A');
    section2.simulate('click');

    // We should have callback with no arguments
    expect(selectCallback).toHaveBeenLastCalledWith();
  });
});
