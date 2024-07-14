const axios = require('axios');

async function fetchBookDetails(isbn) {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    
    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No books found with the given ISBN');
    }

    const bookData = response.data.items[0].volumeInfo;

    const bookDetails = {
      ISBN: isbn,
      title: bookData.title || 'Title not available',
      author: bookData.authors ? bookData.authors.join(', ') : 'Author not available',
      publisher: bookData.publisher || 'Publisher not available',
      year: bookData.publishedDate ? bookData.publishedDate.split('-')[0] : 'Year not available',
      genre: bookData.categories ? bookData.categories.join(', ') : 'Genre not available',
      quantity: 1 // Default quantity, can be updated later
    };

    return bookDetails;
  } catch (error) {
    console.error('Error fetching book details:', error.message);
    throw new Error('Failed to fetch book details');
  }
}

fetchBookDetails('9781787123427')
  .then(bookDetails => console.log(bookDetails))
  .catch(error => console.error(error));

module.exports = fetchBookDetails;
