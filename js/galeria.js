/**
 * GALERÍA DE PRODUCTOS
 *
 * Para agregar un producto, copia una línea de la lista "productos" y cambia
 * la imagen, el título, la categoría y la descripción. Las categorías deben
 * ser una de las claves de "categorias".
 */

const WHATSAPP = "593985926602";

const categorias = {
	figuras: "Figuras y coleccionables",
	hogar: "Hogar y decoración",
	piezas: "Piezas y modelos",
	filamentos: "Filamentos",
};

const productos = [
	{ img: "images/productos/img1.jpg", titulo: "Figuras de colección", categoria: "figuras", descripcion: "Figuras impresas en 3D con acabado detallado." },
	{ img: "images/productos/sonic.png", titulo: "Figura de personaje", categoria: "figuras", descripcion: "Figura de colección impresa en 3D." },
	{ img: "images/productos/gow.png", titulo: "Figura de videojuego", categoria: "figuras", descripcion: "Figura de colección impresa en 3D." },
	{ img: "images/productos/inso.png", titulo: "Figuras y piezas en PLA", categoria: "figuras", descripcion: "Figuras y piezas impresas en filamento PLA." },
	{ img: "images/productos/casa.png", titulo: "Casita decorativa", categoria: "hogar", descripcion: "Pieza decorativa impresa en 3D a varios colores." },
	{ img: "images/productos/upto.png", titulo: "Avión a escala", categoria: "piezas", descripcion: "Modelo a escala con base, impreso en PLA de alta velocidad." },
	{ img: "images/productos/abs.png", titulo: "ABS", categoria: "filamentos", descripcion: "Resistente al impacto y al calor, para piezas mecánicas y carcasas." },
	{ img: "images/productos/fucsiain.png", titulo: "Dual-Color Silk PLA", categoria: "filamentos", descripcion: "Acabado brillante tipo seda con dos colores en el mismo filamento." },
	{ img: "images/productos/redh.png", titulo: "High-Speed PLA", categoria: "filamentos", descripcion: "Para imprimir a mayor velocidad con buena calidad de superficie." },
	{ img: "images/productos/greenhi.png", titulo: "High-Speed PLA Pro", categoria: "filamentos", descripcion: "Mayor resistencia mecánica en impresiones rápidas." },
	{ img: "images/productos/mate.png", titulo: "Matte PLA", categoria: "filamentos", descripcion: "Acabado mate, ideal para figuras y piezas estéticas." },
	{ img: "images/productos/nylonp.png", titulo: "Nylon PA6 66", categoria: "filamentos", descripcion: "Muy resistente al desgaste y la fricción, para engranajes y piezas industriales." },
	{ img: "images/productos/petg1.png", titulo: "PETG Pro", categoria: "filamentos", descripcion: "Resistente, algo flexible y fácil de imprimir." },
	{ img: "images/productos/glowdk.png", titulo: "PLA Glow in the Dark", categoria: "filamentos", descripcion: "Brilla en la oscuridad después de cargarse con luz." },
	{ img: "images/productos/pmag.png", titulo: "PLA Pro", categoria: "filamentos", descripcion: "Más resistente y duradero que el PLA estándar." },
	{ img: "images/productos/tpu.png", titulo: "TPU 95A", categoria: "filamentos", descripcion: "Flexible tipo goma, para protectores, juntas y amortiguadores." },
	{ img: "images/productos/woodfill.png", titulo: "WoodFill", categoria: "filamentos", descripcion: "Con partículas de madera, para piezas con aspecto de madera." },
];

// Cuenta de TikTok (sin @)
const TIKTOK_USUARIO = "eg_impresiones3d";

// Videos que se muestran en "Míralo en acción". Pega aquí el enlace de cada
// video (en TikTok: Compartir → Copiar enlace), por ejemplo:
// "https://www.tiktok.com/@eg_impresiones3d/video/7412345678901234567"
// Si la lista está vacía, el botón abre el perfil de TikTok.
const TIKTOK_VIDEOS = [
	"https://www.tiktok.com/@eg_impresiones3d/video/7693253223339117845",
	"https://www.tiktok.com/@eg_impresiones3d/video/7695968650200665365",
	"https://www.tiktok.com/@eg_impresiones3d/video/7491485577070595333",
];

// Fotos que enlazan al perfil de Instagram
const INSTAGRAM = "https://www.instagram.com/eg_impresiones_3d/";
const fotosInstagram = [
	"images/productos/img1.jpg",
	"images/productos/casa.png",
	"images/productos/fucsiain.png",
	"images/productos/upto.png",
	"images/productos/woodfill.png",
	"images/productos/glowdk.png",
];

function enlaceWhatsApp(producto) {
	const texto = producto.categoria === "filamentos"
		? `Hola, quiero información sobre el filamento "${producto.titulo}".`
		: `Hola, vi "${producto.titulo}" en su galería y quiero cotizar uno similar.`;
	return `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}`;
}

function crear(tag, clase, texto) {
	const el = document.createElement(tag);
	if (clase) el.className = clase;
	if (texto) el.textContent = texto;
	return el;
}

// Filtros por categoría
const filtros = document.getElementById("galeria-filtros");
const grid = document.getElementById("galeria-grid");
let visibles = productos;

function pintarFiltros(activa) {
	filtros.innerHTML = "";
	const opciones = [["todos", "Todos"]].concat(Object.entries(categorias));
	opciones.forEach(([clave, nombre]) => {
		const boton = crear("button", "galeria-filtro", nombre);
		boton.type = "button";
		boton.setAttribute("aria-pressed", clave === activa);
		boton.addEventListener("click", () => {
			pintarFiltros(clave);
			pintarGrid(clave);
		});
		filtros.appendChild(boton);
	});
}

// Tarjetas de productos
function pintarGrid(categoria) {
	visibles = categoria === "todos" ? productos : productos.filter((p) => p.categoria === categoria);
	grid.innerHTML = "";
	visibles.forEach((producto, i) => {
		const tarjeta = crear("button", "galeria-item");
		tarjeta.type = "button";
		tarjeta.setAttribute("aria-label", `Ver ${producto.titulo}`);
		const img = crear("img");
		img.src = producto.img;
		img.alt = producto.titulo;
		img.loading = "lazy";
		const info = crear("span", "galeria-item-info");
		info.appendChild(crear("span", "galeria-item-cat", categorias[producto.categoria]));
		info.appendChild(crear("span", "galeria-item-titulo", producto.titulo));
		tarjeta.append(img, info);
		tarjeta.addEventListener("click", () => abrirLightbox(i));
		grid.appendChild(tarjeta);
	});
}

// Visor ampliado
const lightbox = document.getElementById("galeria-lightbox");
let actual = 0;

function abrirLightbox(i) {
	actual = (i + visibles.length) % visibles.length;
	const producto = visibles[actual];
	lightbox.querySelector(".lightbox-img").src = producto.img;
	lightbox.querySelector(".lightbox-img").alt = producto.titulo;
	lightbox.querySelector(".lightbox-cat").textContent = categorias[producto.categoria];
	lightbox.querySelector(".lightbox-titulo").textContent = producto.titulo;
	lightbox.querySelector(".lightbox-desc").textContent = producto.descripcion;
	const boton = lightbox.querySelector(".lightbox-whatsapp");
	boton.href = enlaceWhatsApp(producto);
	boton.lastChild.textContent = producto.categoria === "filamentos" ? " Consultar este filamento" : " Pedir uno similar";
	if (!lightbox.open) lightbox.showModal();
}

lightbox.querySelector(".lightbox-cerrar").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-anterior").addEventListener("click", () => abrirLightbox(actual - 1));
lightbox.querySelector(".lightbox-siguiente").addEventListener("click", () => abrirLightbox(actual + 1));
lightbox.addEventListener("click", (e) => {
	if (e.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") abrirLightbox(actual - 1);
	if (e.key === "ArrowRight") abrirLightbox(actual + 1);
});

// Videos de TikTok: los reproductores oficiales se cargan solo al hacer clic,
// así TikTok no carga código ni cookies hasta que el visitante lo pide.
// (El widget de perfil completo de TikTok falla con frecuencia por un bloqueo
// de su servidor, por eso se insertan videos individuales.)
const botonTikTok = document.getElementById("tiktok-cargar");
const videosValidos = TIKTOK_VIDEOS
	.map((url) => ({ url, id: (url.match(/\/video\/(\d+)/) || [])[1] }))
	.filter((video) => video.id);

if (!videosValidos.length) {
	botonTikTok.textContent = "Ver nuestros videos en TikTok";
	document.querySelector(".tiktok-facade .big").textContent = "Mira nuestros procesos de impresión y novedades en TikTok.";
	document.querySelector(".tiktok-aviso").hidden = true;
}

botonTikTok.addEventListener("click", () => {
	if (!videosValidos.length) {
		window.open(`https://www.tiktok.com/@${TIKTOK_USUARIO}`, "_blank", "noopener");
		return;
	}

	const contenedor = document.getElementById("tiktok-embed");
	contenedor.innerHTML = "";
	contenedor.classList.add("tiktok-videos");
	videosValidos.forEach((video) => {
		const blockquote = crear("blockquote", "tiktok-embed");
		blockquote.cite = video.url;
		blockquote.dataset.videoId = video.id;
		const section = crear("section");
		const enlace = crear("a", null, "Ver en TikTok");
		enlace.href = video.url;
		enlace.target = "_blank";
		section.appendChild(enlace);
		blockquote.appendChild(section);
		contenedor.appendChild(blockquote);
	});

	const script = document.createElement("script");
	script.src = "https://www.tiktok.com/embed.js";
	script.async = true;
	document.body.appendChild(script);
});

// Fotos de Instagram
const instaGrid = document.getElementById("insta-grid");
fotosInstagram.forEach((src) => {
	const a = crear("a", "insta-foto");
	a.href = INSTAGRAM;
	a.target = "_blank";
	a.rel = "noopener";
	a.setAttribute("aria-label", "Ver en Instagram");
	const img = crear("img");
	img.src = src;
	img.alt = "";
	img.loading = "lazy";
	a.append(img, crear("span", "insta-icono fa-instagram"));
	instaGrid.appendChild(a);
});

pintarFiltros("todos");
pintarGrid("todos");
