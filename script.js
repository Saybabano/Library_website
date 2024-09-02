function fetchBooks(query) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query), true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var books = response.items; // Access the array of books
            displayBooks(books);
        } else if (xhr.readyState === 4) {
            console.error("Error fetching books:", xhr.statusText);
        }
    };

    xhr.send();
}

// Display books
function displayBooks(books) {
    var bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach(function(book) {
        var volumeInfo = book.volumeInfo;
        var bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <div class="book-image">
                <img src="${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No+Image'}" alt="${volumeInfo.title}">
            </div>
            <div class="book-details">
                <h3>${volumeInfo.title}</h3>
                <p>by ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p>Genre: ${volumeInfo.categories ? volumeInfo.categories.join(', ') : 'Unknown'}</p>
                <button id="button" onclick="viewAuthor('${volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown'}', '${volumeInfo.description ? volumeInfo.description.replace(/'/g, "\\'") : 'No description available.'}')">View Author</button>
            </div>
        `;
        bookList.appendChild(bookItem);
    });
}

// Search books
function searchBooks() {
    console.log("Search button clicked");
    var query = document.getElementById('search-input').value;
    fetchBooks(query);
}
// Add key event for the search input
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
});

// View author details
function viewAuthor(authorName, description) {
    console.log("View author button clicked for:", authorName);
    // Simulating author details for demonstration
    var author = {
        name: authorName,
        bio: description // Using the description passed from the book item
    };
    displayAuthorDetails(author);
}

// Display author details
function displayAuthorDetails(author) {
    var authorDetails = document.getElementById('author-details');
    authorDetails.innerHTML = `
        <h3>${author.name}</h3>
        <p>Description: ${author.bio}</p>
    `;
    authorDetails.style.display = 'block';
}
