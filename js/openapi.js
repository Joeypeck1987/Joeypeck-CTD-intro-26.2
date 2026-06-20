// Buttons listen for a click.
// Each click runs a different fetch request.
// response.json() turns the response into JavaScript data.
// data.data is the array of artwork.
// The loop creates a card for each piece of artwork.
// catch() handles the errors.



// Selecting the two buttons from the page.
const paintingsButton = document.getElementById("paintingsButton");
const ancientButton = document.getElementById("ancientButton");

// Selecting the results area where the API data will be displayed.
const results = document.getElementById("results");

// This function clears the results area and s  ws a loading message.
function showLoadingMessage(message) {
  results.innerHTML = `<p>${message}</p>`;
}

// Error message.
function showErrorMessage() {
  results.innerHTML = "<p>Artwork data could not be loaded. Please try again later.</p>";
}

// Function for one artwork card.
function createArtworkCard(artwork) {
  const article = document.createElement("article");
  article.classList.add("art-card");

  if (artwork.image_id) {
    const image = document.createElement("img");
    image.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`;
    image.alt = artwork.title || "Artwork from the Art Institute of Chicago";
    article.appendChild(image);
  }

  const title = document.createElement("h3");
  title.innerText = artwork.title || "Untitled work";

  const artist = document.createElement("p");
  artist.innerText = artwork.artist_display || "Artist information unavailable.";

  const date = document.createElement("p");
  date.innerText = artwork.date_display || "Date unavailable.";

  article.appendChild(title);
  article.appendChild(artist);
  article.appendChild(date);

  return article;
}

// Display a list of artwork on the page.
function displayArtworks(headingText, artworks) {
  results.innerHTML = "";

  const heading = document.createElement("h3");
  heading.innerText = headingText;
  results.appendChild(heading);

  const galleryGrid = document.createElement("div");
  galleryGrid.classList.add("gallery-grid");

  for (let i = 0; i < artworks.length; i++) {
    const artworkCard = createArtworkCard(artworks[i]);
    galleryGrid.appendChild(artworkCard);
  }

  results.appendChild(galleryGrid);
}

// First GET request for paintings.
paintingsButton.addEventListener("click", function () {
  showLoadingMessage("Loading paintings...");

  fetch("https://api.artic.edu/api/v1/artworks/search?q=painting&limit=6&fields=id,title,artist_display,date_display,image_id")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Paintings could not be loaded.");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);

      displayArtworks("Paintings", data.data);
    })
    .catch((error) => {
      showErrorMessage();
      console.error("An error occurred:", error);
    });
});

// Second GET request for ancient art.
ancientButton.addEventListener("click", function () {
  showLoadingMessage("Loading ancient art...");

  fetch("https://api.artic.edu/api/v1/artworks/search?q=ancient&limit=6&fields=id,title,artist_display,date_display,image_id")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ancient art could not be loaded.");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);

      displayArtworks("Ancient Art", data.data);
    })
    .catch((error) => {
      showErrorMessage();
      console.error("An error occurred:", error);
    });
});