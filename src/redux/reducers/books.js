import { createAction, createReducer } from 'redux-act';
import sanitizeHtml from 'sanitize-html';
import { get } from 'lodash';

const getTitleFromBook = (book) => {
  const { title, subtitle } = get(book, 'volumeInfo', {});

  if (subtitle) {
    return `${title}: ${subtitle}`;
  }

  return title;
};

const getDescriptionFromBook = (book) => {
  const textSnippet = get(book, 'searchInfo.textSnippet');
  const description = get(book, 'volumeInfo.description');

  const desc = textSnippet || description;

  if (!desc) {
    return '';
  }

  return sanitizeHtml(desc, {
    allowedTags: ['b'],
  })
};

const getBookInfoFromBook = (book) => {
  const publishedDate = get(book, 'volumeInfo.publishedDate', '');
  const authors = get(book, 'volumeInfo.authors', []);

  const year = publishedDate && publishedDate.split('-')[0];

  console.log(publishedDate);
  console.log(year);

  return {
    authors,
    year,
  }
};

const getImageUrlFromBook = (book) => {
  const { smallThumbnail, thumbnail } = get(book, 'volumeInfo.imageLinks', {})

  return thumbnail || smallThumbnail;
};

const getLinksFromBook = (book) => {
  const previewLink = get(book, 'volumeInfo.previewLink', '');
  const firstIndustryIdentifier = get(book, 'volumeInfo.industryIdentifiers[0]', {});
  const embeddable = get(book, 'accessInfo.embeddable', false);

  const isbn = firstIndustryIdentifier.identifier;
  const id = get(book, 'id');
  const greenLink = isbn ? `https://books.google.com/books?isbn=${isbn}` : `https://books.google.com/books?id=${id}`;

  return {
    link: previewLink,
    previewLink: embeddable ? previewLink : '',
    greenLink,
  }
};

const transformBook = (book) => {
  /* title */
  const { id } = book;

  const title = getTitleFromBook(book);
  const description = getDescriptionFromBook(book);
  const imageUrl = getImageUrlFromBook(book);

  return {
    id,
    title,
    description,
    imageUrl,
    ...getBookInfoFromBook(book),
    ...getLinksFromBook(book),
  }
};

export const insertBooks = createAction('insert books', (books) => books.map(transformBook));

export default createReducer({
  [insertBooks]: (state, books) => books,
}, []);

export const selectBooks = (state) => state.books;
