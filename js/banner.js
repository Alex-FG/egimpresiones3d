/**CARRUSEL banner IMAGENES MARCAS PARTNERS */
const slider = document.querySelector(".sliderc");
const btnLeft = document.getElementById("moveLeft");
const btnRight = document.getElementById("moveRight");

let movies = [
	{
		src: "images/marcas/White.png",
		href: "#",
	},
	{
		src: "images/marcas/Grey.png",
		href: "#",
	},

	{
		src: "images/marcas/black.png",
		href: "#",
	},
	{
		src: "images/marcas/fucsia.png",
		href: "#",
	},
	{
		src: "images/marcas/blue.png",
		href: "#",
	},
	{
		src: "images/marcas/red.png",
		href: "#",
	},
	{
		src: "images/marcas/orange.png",
		href: "#",
	},
	{
		src: "images/marcas/yellow2.png",
		href: "#",
	},
	{
		src: "images/marcas/wood.png",
		href: "#",
	},
	{
		src: "images/marcas/maple.png",
		href: "#",
	},
	{
		src: "images/marcas/brown.png",
		href: "#",
	},
	{
		src: "images/marcas/cyan.png",
		href: "#",
	},
	{
		src: "images/marcas/green.png",
		href: "#",
	},
	{
		src: "images/marcas/ovgreen.png",
		href: "#",
	},
	{
		src: "images/marcas/pink.png",
		href: "#",
	},
	{
		src: "images/marcas/pink2.png",
		href: "#",
	},
	{
		src: "images/marcas/nylon.png",
		href: "#",
	},
	
    {
		src: "images/marcas/skgr.jpg",
		href: "#",
	},

	{
		src: "images/marcas/beige.png",
		href: "#",
	},
	{
		src: "images/marcas/yellow.png",
		href: "#",
	},
	

];


// Llena el carrusel con dos copias de la lista. Al llegar al final de la
// primera copia se salta sin animación al mismo punto de la segunda, así el
// bucle parece infinito sin agregar más imágenes a la página.
const template = document.getElementById("movie0");
function populateSlider() {
	movies.forEach((image) => {
		const clone = template.cloneNode(true);
		clone.removeAttribute("id");
		clone.querySelector("img").src = image.src;
		clone.querySelector("a").href = image.href;
		slider.appendChild(clone);
	});
}

populateSlider();
populateSlider();
template.remove();

// Ancho de una copia completa de la lista
function setWidth() {
	const items = slider.querySelectorAll(".movie");
	return items[movies.length].offsetLeft - items[0].offsetLeft;
}

function movieWidth() {
	return slider.querySelector(".movie").getBoundingClientRect().width;
}

function jumpTo(left) {
	slider.scrollTo({ top: 0, left: left, behavior: "instant" });
}

function Derecha() {
	const loop = setWidth();
	if (slider.scrollLeft >= loop) jumpTo(slider.scrollLeft - loop);
	slider.scrollBy({ top: 0, left: movieWidth(), behavior: "smooth" });
}

function Izquierda() {
	const step = movieWidth();
	if (slider.scrollLeft - step < 0) jumpTo(slider.scrollLeft + setWidth());
	slider.scrollBy({ top: 0, left: -step, behavior: "smooth" });
}

btnLeft.addEventListener("click", Izquierda);
btnRight.addEventListener("click", Derecha);

// Avanza automáticamente cada 1,5 s
setInterval(Derecha, 1500);
