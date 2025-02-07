// ✅ Carousel Functionality
let currentIndex = 0;

function moveSlide(step) {
    const slideContainer = document.querySelector('.carousel-slide');
    const slides = document.querySelectorAll('.carousel-slide img');
    if (slides.length === 0 || !slideContainer) return; // Avoid errors if no slides found
  
    const totalSlides = slides.length;
    currentIndex += step;

    if (currentIndex < 0) { 
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const slideWidth = slides[0].clientWidth;
    const newTransformValue = -currentIndex * slideWidth;

    slideContainer.style.transform = `translateX(${newTransformValue}px)`;
}

// ✅ Ensure Carousel Loads & Sets Correct Width
function setupCarousel() {
    const slideContainer = document.querySelector('.carousel-slide');
    const slides = document.querySelectorAll('.carousel-slide img');
    if (!slideContainer || slides.length === 0) return; // Avoid errors

    const slideWidth = slides[0].clientWidth;
    slideContainer.style.width = `${slideWidth * slides.length}px`;
}

// ✅ Weather API (Tokyo, Japan)
const WEATHER_API_KEY = "e9edabd5488c4734859134728250602"; // Replace with your actual API key
const CITY = "Tokyo";

async function fetchWeather() {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${CITY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weather-info").innerHTML = `<p>⚠️ Weather data unavailable.</p>`;
            return;
        }

        document.getElementById("weather-info").innerHTML = `
            <p><strong>${data.location.name}:</strong> ${data.current.temp_c}°C, ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="Weather Icon">
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather-info").innerHTML = `<p>❌ Failed to load weather data.</p>`;
    }
}

// ✅ OpenStreetMap (Leaflet) - Centered in Tokyo
function initLeafletMap() {
    const leafletContainer = document.getElementById("leaflet-map");
    if (!leafletContainer) return;

    const map = L.map('leaflet-map').setView([35.682839, 139.759455], 12); // Tokyo Coordinates

    // Tile Layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker for Tokyo
    L.marker([35.682839, 139.759455]).addTo(map)
        .bindPopup('Tokyo, Japan')
        .openPopup();
}

// ✅ Facebook Plugin Refresh
function refreshFacebookPlugin() {
    if (typeof FB !== "undefined") {
        FB.XFBML.parse(); 
    } else {
        console.error("Facebook SDK not loaded.");
    }
}

// ✅ Load Everything After DOM Loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        setupCarousel(); // Ensures carousel is properly initialized
        fetchWeather();
        initLeafletMap();
        refreshFacebookPlugin();
    }, 3000);
});







   

