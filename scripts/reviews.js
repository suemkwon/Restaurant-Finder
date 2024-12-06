/*
    File: reviews.js
    Project: University Blvd Foodie Finds
    Course: ISTA 329
    Term: Fall 2024

    Author: Behruz Bahriddinov
    Date: 12/6/2024
    Description:
        This file manages the functionality for the Reviews Page. 
        Features include dynamically displaying reviews, toggling review visibility, 
        and handling new review submissions.
*/

// Placeholder reviews data and ratings
const reviewsData = {
  "no-anchovies": {
    reviews: [
      { name: "John Doe", rating: 5, review: "Amazing pizza and atmosphere!" },
      { name: "Jane Smith", rating: 4, review: "Good food, but a bit noisy." },
    ],
    rating: 4.2,
    count: 2,
  },
  "illegal-petes": {
    reviews: [
      { name: "Mike Ross", rating: 4, review: "Great burritos!" },
      {
        name: "Rachel Zane",
        rating: 5,
        review: "Loved the tacos and margaritas.",
      },
    ],
    rating: 4.2,
    count: 2,
  },
  "frog-firkin": {
    reviews: [
      { name: "Alex", rating: 5, review: "Fantastic craft beers and food!" },
      { name: "Sam", rating: 3, review: "The pub vibe is great." },
    ],
    rating: 4.0,
    count: 2,
  },
  "agave-house": {
    reviews: [
      {
        name: "Carmen",
        rating: 4,
        review: "Upscale dining with great service.",
      },
      { name: "Luis", rating: 3, review: "The tequila selection is amazing!" },
    ],
    rating: 3.5,
    count: 2,
  },
  "bacio-italiano": {
    reviews: [
      {
        name: "Isabella",
        rating: 5,
        review: "Authentic Italian food at its best!",
      },
      { name: "Lorenzo", rating: 2, review: "Cozy ambiance, great food." },
    ],
    rating: 3.5,
    count: 2,
  },
  "gentle-bens": {
    reviews: [
      { name: "Brooke", rating: 5, review: "The rooftop seating is lovely." },
      { name: "Chris", rating: 5, review: "Best microbrewery in town!" },
    ],
    rating: 5.0,
    count: 2,
  },
};

let currentRestaurantElement = null; // Tracks currently selected restaurant's element

// Toggle reviews visibility
function toggleReviews(restaurantId, restaurantElement) {
  // If the same restaurant is clicked, hide the reviews section
  if (currentRestaurantElement === restaurantElement) {
    const placeholder = restaurantElement.nextElementSibling;
    placeholder.innerHTML = ""; // Clear the reviews section
    currentRestaurantElement = null;
    return;
  }

  // Hide reviews for the previous restaurant (if any)
  if (currentRestaurantElement) {
    const previousPlaceholder = currentRestaurantElement.nextElementSibling;
    previousPlaceholder.innerHTML = "";
  }

  // Show reviews for the new restaurant
  currentRestaurantElement = restaurantElement;
  showReviews(restaurantId, restaurantElement);
}

// Show reviews for a specific restaurant
function showReviews(restaurantId, restaurantElement) {
  const restaurant = reviewsData[restaurantId];
  const placeholder = restaurantElement.nextElementSibling;

  // Generate reviews content
  let reviewsHtml = `
        <div class="restaurant-reviews">
            <h2>Reviews for ${restaurantId.replace("-", " ").toUpperCase()}</h2>
            <div id="reviews-container">
                ${restaurant.reviews
                  .map(
                    (r) => `
                    <div class="review">
                        <p><strong>${r.name}</strong> - ${"★".repeat(
                      r.rating
                    )}${"☆".repeat(5 - r.rating)}</p>
                        <p>${r.review}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div id="review-form-container">
                <form id="review-form" onsubmit="submitReview(event)">
                    <h3>Leave a Review</h3>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your name" />
                    
                    <label for="rating">Rating:</label>
                    <select id="rating" name="rating">
                        <option value="5">★★★★★</option>
                        <option value="4">★★★★☆</option>
                        <option value="3">★★★☆☆</option>
                        <option value="2">★★☆☆☆</option>
                        <option value="1">★☆☆☆☆</option>
                    </select>
                    
                    <label for="review">Review:</label>
                    <textarea id="review" name="review" rows="5" placeholder="Write your review..."></textarea>
                    
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    `;

  // Insert reviews content into the placeholder
  placeholder.innerHTML = reviewsHtml;

  // Attach the restaurant ID to the form
  document.getElementById("review-form").dataset.restaurantId = restaurantId;
}

// Submit a new review
function submitReview(event) {
  event.preventDefault();
  const restaurantId = event.target.dataset.restaurantId;
  const restaurant = reviewsData[restaurantId];

  const name = document.getElementById("name").value || "Anonymous";
  const rating = parseInt(document.getElementById("rating").value);
  const review = document.getElementById("review").value;

  if (!restaurant) return;

  // Add the new review to the data
  restaurant.reviews.push({ name, rating, review });

  // Update overall rating and review count
  const totalRating = restaurant.reviews.reduce((sum, r) => sum + r.rating, 0);
  restaurant.rating = (totalRating / restaurant.reviews.length).toFixed(1);
  restaurant.count = restaurant.reviews.length;

  // Update the display in the restaurant list
  document.getElementById(`rating-${restaurantId}`).textContent =
    restaurant.rating;
  document.getElementById(`reviews-count-${restaurantId}`).textContent =
    restaurant.count;

  // Re-render the reviews section
  const restaurantElement = currentRestaurantElement;
  showReviews(restaurantId, restaurantElement);

  // Clear the form
  event.target.reset();
}
