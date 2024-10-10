let allBooks = []; // Store all books globally

async function fetchBooks() {
    try {
        const response = await fetch('http://localhost:3000/api/books');
        allBooks = await response.json(); // Store the fetched books
        displayBooks(allBooks); // Display all books initially
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayBooks(books) {
    const tableBody = document.querySelector('#books-table tbody');
    tableBody.innerHTML = ''; // Clear previous entries

    books.forEach(book => {
        const bookElement = document.createElement('tr');
        bookElement.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.description}</td>
            
        `;
        tableBody.appendChild(bookElement);
    });
}

async function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const query = document.getElementById('search-input').value.toLowerCase();
    
    // Filter books based on the search query
    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );

    displayBooks(filteredBooks); // Display filtered books
}

// function issueBook(title) {
//     // Find the book by title and mark it as unavailable
//     const bookIndex = allBooks.findIndex(book => book.title === title);
//     if (bookIndex !== -1 && allBooks[bookIndex].available) {
//         allBooks[bookIndex].available = false; // Set book to unavailable
//         alert(`You have issued "${title}".`); // Notify the user
//     } else {
//         alert(`"${title}" is already issued or not available.`);
//     }

//     // Refresh the displayed book list
//     displayBooks(allBooks);
// }

// Call fetchBooks on page load to populate the table
fetchBooks();


function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  }