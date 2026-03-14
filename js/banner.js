/**CARRUSEL banner IMAGENES MARCAS PARTNERS */
const slider = document.querySelector(".sliderc");
const btnLeft = document.getElementById("moveLeft");
const btnRight = document.getElementById("moveRight");
const indicators = document.querySelectorAll(".indicator");

let baseSliderWidth = slider.offsetWidth;
let activeIndex = 0; // the current page on the slider


let movies = [
	{
		src: "images/marcas/ieg1.png",
		href: "#",
	},
	{
		src: "images/marcas/ieg2.png",
		href: "#",
	},

	{
		src: "images/marcas/ieg3.png",
		href: "#",
	},
    {
		src: "images/marcas/ieg4.png",
		href: "#",
	},

	{
		src: "images/marcas/ieg5.png",
		href: "#",
	},
	{
		src: "images/marcas/ieg6.png",
		href: "#",
	},
	

];




// Fill the slider with all the movies in the "movies" array
function populateSlider() {

	movies.forEach((image) => {
		// Clone the initial movie thats included in the html, then replace the image with a different one
		const newMovie = document.getElementById("movie0");
		let clone = newMovie.cloneNode(true);
		let img = clone.querySelector("img");
		let a = clone.querySelector("a");
		img.src = image.src;
		a.href = image.href;
		slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1]);
	});
}

populateSlider();
populateSlider();

// delete the initial movie in the html
const initialMovie = document.getElementById("movie0");
initialMovie.remove();

// Update the indicators that show which page we're currently on
function updateIndicators(index) {
	indicators.forEach((indicator) => {
		indicator.classList.remove("active");
	});
	let newActiveIndicator = indicators[index];
	newActiveIndicator.classList.add("active");
}

// Scroll Left button
btnLeft.addEventListener("click", (e) => {
	let movieWidth = document.querySelector(".movie").getBoundingClientRect()
		.width;
	let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

	slider.scrollBy({
		top: 0,
		left: -scrollDistance,
		behavior: "smooth",
	});
	activeIndex = (activeIndex - 1) % 3;
	console.log(activeIndex);
	updateIndicators(activeIndex);
});

function Derecha() {
	let movieWidth = document.querySelector(".movie").getBoundingClientRect()
		.width;
	let scrollDistance = movieWidth * 1; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

	// if we're on the last page
	if (activeIndex == 2) {
		// duplicate all the items in the slider (this is how we make 'looping' slider)
		populateSlider();
		slider.scrollBy({
			top: 0,
			left: +scrollDistance,
			behavior: "smooth",
		});
		activeIndex = 0;
		updateIndicators(activeIndex);
	} else {
		slider.scrollBy({
			top: 0,
			left: +scrollDistance,
			behavior: "smooth",
		});
		activeIndex = (activeIndex + 1) % 3;
		console.log(activeIndex);
		updateIndicators(activeIndex);
	}
}

// Scroll Right button

btnRight.addEventListener("click", (e) => {
	Derecha()
});


//funcion para ejecutar auntomaticamente la funcion Derecha cada 4 seg
setInterval(function () {
	Derecha();
}, 4000);

