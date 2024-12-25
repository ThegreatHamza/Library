// is function is the constructor
function Book(title, author, NumberOfPages, read) {
  this.title = title;
  this.author = author;
  this.NumberOfPages = NumberOfPages;
  this.read = read;
}

// Initialize the library array
let library = [];

// This function adds a new book to the library and returns a new library
function addBookToLibrary() {
  const myBook = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false); // Changed 'not read' to boolean false
  library.push(myBook); // Add the new book to the library
  console.log(library); // Log the library after adding the book
  return library;
}

let sub = document.querySelector('#sub');
let form = document.querySelector('form');
let tit = document.querySelector('#Title');
let auth = document.querySelector('#Author');
let Numbe = document.querySelector('#NumberOfPages');
let rea = document.querySelector('#Read');

// Check if the content element exists before trying to use it
let content = document.querySelector('#shelf');

function displayLibrary() {
  // Clear the existing content of the shelf
  if (content) {
    content.innerHTML = ''; // Efficient way to clear children

    library.forEach((element, index) => { // Added index here
      let bookshelf = document.createElement('li');
      let removeButton = document.createElement('button');
      let readButton = document.createElement('button');

      if (rea.checked=true) {readButton.textContent = 'Read';}
      else if(rea.checked=false) {readButton.textContent = 'Unread';}
      readButton.classList.add('read-btn'); 
      readButton.dataset.bookIndex = index;

      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-btn'); // Add a class to the remove button
      removeButton.dataset.bookIndex = index; // Store the index

      bookshelf.textContent = `${element.title} by ${element.author}, ${element.NumberOfPages} pages, ${element.read ? 'read' : 'not read'}`;
      bookshelf.appendChild(removeButton);
      bookshelf.appendChild(readButton);
      
      content.appendChild(bookshelf);
    });

    // Add event listeners to the remove buttons after they are created
    attachRemoveListeners();

  } else {
    console.error("The element with the id 'shelf' was not found in the HTML.");
  }
}

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const bookIndexToRemove = parseInt(this.dataset.bookIndex);
      removeBookFromLibrary(bookIndexToRemove);
      displayLibrary(); // Refresh the display after removing
    });
  });
}

function removeBookFromLibrary(index) {
  library.splice(index, 1); // Remove 1 element at the specified index
}

sub.addEventListener("click", function(event) { // Add event argument here
  event.preventDefault();

  const formdata = new Book(tit.value, auth.value, parseInt(Numbe.value), rea.checked);

  library.push(formdata);

  // Clear the form fields after adding the book
  tit.value = '';
  auth.value = '';
  Numbe.value = '';
  rea.checked = false;

  displayLibrary();
});

// Call addBookToLibrary to add the initial sample book
addBookToLibrary();

// Display the initial library
displayLibrary();