const restaurants = [
  {
    name: "No anchovies",
    menuPdf: "../assets/iframes/NO+CHOVES+MENU+PDF.pdf",
    photos: [
      "../assets/images/anchov-pic1.jpeg",
      "../assets/images/anchov-pic2.jpeg",
      "../assets/images/anchov-pic3.jpeg",
      "../assets/images/anchov-pic4.jpeg",
    ],
  },
  {
    name: "Illegal Petes",
    menuPdf: "https://www.illegalpetes.com/menu",
    photos: [
      "../assets/images/pete-pic1.png",
      "../assets/images/pete-pic2.png",
      "../assets/images/pete-pic3.png",
      "../assets/images/pete-pic4.png",
    ],
  },
  {
    name: "Frog & Firken",
    menuPdf: "../assets/iframes/Frog & Firkin - Food Menu.pdf",
    photos: [
      "../assets/images/frog-pic1.jpg",
      "../assets/images/frog-pic2.jpg",
      "../assets/images/frog-pic3.jpg",
      "../assets/images/frog-pic4.jpg",
    ],
  },
  {
    name: "Agave House",
    menuPdf: "../assets/iframes/agave-house-menu.pdf",
    photos: [
      "../assets/images/agave-pic1.png",
      "../assets/images/agave-pic2.png",
      "../assets/images/agave-pic3.png",
      "../assets/images/agave-pic4.png",
    ],
  },
  {
    name: "Bacio Italiano",
    menuPdf: "../assets/iframes/bacio-menu.pdf",
    photos: [
      "../assets/images/bacio-pic1.png",
      "../assets/images/bacio-pic2.png",
      "../assets/images/bacio-pic3.png",
      "../assets/images/bacio-pic4.png",
    ],
  },
  {
    name: "Gentle Ben's",
    menuPdf: "../assets/iframes/gentle-bens-menu.pdf",
    photos: [
      "../assets/images/ben-pic1.png",
      "../assets/images/ben-pic2.png",
      "../assets/images/ben-pic3.png",
      "../assets/images/ben-pic4.png",
    ],
  },
];

let current = 0;

function updateGallery() {
  document.getElementById("restaurantName").textContent =
    restaurants[current].name;
  document.getElementById("menuFrame").src = restaurants[current].menuPdf;

  document.getElementById("photo1").src = restaurants[current].photos[0];
  document.getElementById("photo2").src = restaurants[current].photos[1];
  document.getElementById("photo3").src = restaurants[current].photos[2];
  document.getElementById("photo4").src = restaurants[current].photos[3];
}

function nextRestaurant() {
  current = (current + 1) % restaurants.length;
  updateGallery();
}

function prevRestaurant() {
  current = (current - 1 + restaurants.length) % restaurants.length;
  updateGallery();
}

window.onload = updateGallery;
