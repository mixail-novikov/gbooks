import { createAction, createReducer } from 'redux-act';
import sanitizeHtml from 'sanitize-html';

const getTitleFromBook = (book) => {
  const { volumeInfo={} } = book;
  const { title, subtitle } = volumeInfo;

  if (subtitle) {
    return `${title}: ${subtitle}`;
  }

  return title;
};

const getDescriptionFromBook = (book) => {
  const { volumeInfo={}, searchInfo={} } = book;
  const { textSnippet } = searchInfo;
  const { description } = volumeInfo;

  const desc = textSnippet || description;

  if (!desc) {
    return '';
  }

  return sanitizeHtml(desc, {
    allowedTags: ['b'],
  })
};

const getBookInfoFromBook = (book) => {
  const { volumeInfo={} } = book;
  const { authors=[], publishedDate='' } = volumeInfo;

  const year = publishedDate.split('-')[0];
  const authorsStr = authors.join(', ');

  return [authorsStr, year].filter(v => v).join(' - ');
};

const getImageUrlFromBook = (book) => {
  const { volumeInfo={} } = book;
  const { imageLinks={} } = volumeInfo;
  const { smallThumbnail, thumbnail } = imageLinks;

  return smallThumbnail || thumbnail;
};

const getLinksFromBook = (book) => {
  const { volumeInfo={}, accessInfo={} } = book;
  const { previewLink } = volumeInfo;
  const { embeddable } = accessInfo;

  return {
    link: previewLink,
    previewLink: embeddable ? previewLink : '',
  }
};

const transformBook = (book) => {
  /* title */
  const { id } = book;

  const title = getTitleFromBook(book);
  const description = getDescriptionFromBook(book);
  const info = getBookInfoFromBook(book);
  const imageUrl = getImageUrlFromBook(book);


  return {
    id,
    title,
    description,
    info,
    imageUrl,
    ...getLinksFromBook(book),
  }
};

export const insertBooks = createAction('insert books', (books) => books.map(transformBook));

export default createReducer({
  [insertBooks]: (state, books) => books,
}, []);

export const selectBooks = (state) => state.books;
