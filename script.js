const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Unsplash API
import 'core-js';
import 'regenerator-runtime';

const count = 10;
const apiKey = '8fta8Y2gKXX5dxWCAdbcM0wfU6RjZOAJ10WivOmbJfk';
const apiUrl = `https://api.unsplash.com/photos//random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
   imagesLoaded++;
   if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
   }
}

function displayPhotos() {
   imagesLoaded = 0;
   totalImages = photosArray.length;
   photosArray.forEach((photo) => {
      //Create <a> to link to Unplash
      const item = document.createElement('a');
      item.setAttribute('href', photo.links.html);
      item.setAttribute('target', '_blank');
      //Create <img> for photo
      const img = document.createElement('img');
      img.setAttribute('src', photo.urls.regular);
      img.setAttribute('alt', photo.alt_description);
      img.setAttribute('title', photo.alt_description);

      //Check if the image has loaded
      img.addEventListener('load', imageLoaded);

      item.appendChild(img);
      imageContainer.appendChild(item);
   });
}

// Get images from the API
async function getImages() {
   try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
   } catch (error) {
      console.log(error);
   }
}

// Check for scroll to load more photos
window.addEventListener('scroll', () => {
   if (
      window.innerHeight + window.scrollY >=
         document.body.offsetHeight - 1000 &&
      ready
   ) {
      ready = false;
      getImages();
   }
});

getImages();
