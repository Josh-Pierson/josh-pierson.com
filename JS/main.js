// The initial order of your photographs
const photos = [];

for (let i = 1; i <= 75; i++) {
    photos.push(`photo-${String(i).padStart(2, "0")}.jpg`);
}


// The gallery on the page
const gallery = document.getElementById("gallery");


// Display a group of photos
function displayPhotos(photoList) {

    photoList.forEach(photo => {

        const image = document.createElement("img");

        image.src = "images/gallery/" + photo;

        // Skip lazy loading only on the very first photo added to the page,
        // since it's the one visible above the fold when the page loads.
        // Every other photo gets loading="lazy" so the browser waits to
        // download it until the user scrolls near it, speeding up initial load.
        if (gallery.childElementCount > 0) {
            image.loading = "lazy";
        }

        gallery.appendChild(image);

    });
}


// Randomize a copy of the photo list
function shufflePhotos() {

    const shuffled = [...photos];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    }

    return shuffled;
}


// FIRST PASS
// Always follows your Lightroom order
displayPhotos(photos);


// Create a marker at the bottom of the page
const bottomMarker = document.createElement("div");

bottomMarker.id = "bottom-marker";

gallery.appendChild(bottomMarker);


// Watch for the viewer reaching the bottom
const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

        const randomizedPhotos = shufflePhotos();

        displayPhotos(randomizedPhotos);

        gallery.appendChild(bottomMarker);

    }

}, {
    rootMargin: "1000px"
});


observer.observe(bottomMarker);


// Header
const header = document.getElementById("site-header");

let mobileHeaderTimer;

function showMobileHeader() {

    header.classList.add("visible");

    clearTimeout(mobileHeaderTimer);

    mobileHeaderTimer = setTimeout(() => {
        header.classList.remove("visible");
    }, 3000);

}


// DESKTOP HEADER
document.addEventListener("mousemove", (event) => {

    if (window.innerWidth > 768) {

        if (event.clientY < 50) {
            header.classList.add("visible");
        } else {
            header.classList.remove("visible");
        }

    }

});


// MOBILE HEADER
function handleMobileInteraction() {

    if (window.innerWidth <= 768) {
        showMobileHeader();
    }

}

document.addEventListener("touchstart", handleMobileInteraction);
document.addEventListener("touchmove", handleMobileInteraction);
document.addEventListener("scroll", handleMobileInteraction);