// PRODUCTOS
const productos = [
    {
        id: "ropa-01",
        titulo: "Remera Atx",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663026944/Imagenes/adidas3_a5pkfy.png",
        categoria: {
            nombre: "Hombres",
            id: "Remerahombre"
        },
        precio: 7300
    },
    {
        id: "ropa-02",
        titulo: "Remera blakall",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663026944/Imagenes/adidas2_dd2own.png",
        categoria: {
            nombre: "Hombres",
            id: "Remerahombre"
        },
        precio: 1130
    },
    {
        id: "ropa-3",
        titulo: "Remera fox",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663026944/Imagenes/adidas4_p0fb0k.png",
        categoria: {
            nombre: "Hombres",
            id: "Remerahombre"
        },
        precio: 2340
    },
    {
        id: "ropa-4",
        titulo: "Remera Traind",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663026944/Imagenes/adidas_pnbzls.png",
        categoria: {
            nombre: "Hombres",
            id: "Remerahombre"
        },
        precio: 2370
    },
    {
        id: "Remera mujer",
        titulo: "Remera timing",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663032670/Imagenes/mujer5_fcbikb.png",
        categoria: {
            nombre: "Mujer",
            id: "Remerahombre"
        },
        precio: 4860
    },
    
    {
        id: "Remera mujer",
        titulo: "Remera fullzos",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663032670/Imagenes/mujer2_rkj9c9.png",
        categoria: {
            nombre: "Mujeres",
            id: "remeramujer"
        },
        precio: 8500
    },
    {
        id: "Remera Mujer",
        titulo: "Remera funny",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663032670/Imagenes/mujer3_flnxj9.png",
        categoria: {
            nombre: "Mujeres",
            id: "remeramujer"
        },
        precio: 10000
    },
    {
        id: "Remera mujer",
        titulo: "Conjunto vease",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663032670/Imagenes/mujer4_pf5thv.png",
        categoria: {
            nombre: "Mujeres",
            id: "remeramujer"
        },
        precio: 7000
    },
    {
        id: "Remera niño",
        titulo: "Remera Circlu",
        imagen: "https://res.cloudinary.com/dm7zul5vt/image/upload/v1663142883/Imagenes/remeran5_sby2wc.png",
        categoria: {
            nombre: "niño",
            id: "remeraniño"
        },
        precio: 5300
    },
    
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            
            <div class="producto-detalles">
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    alertaAgregado()
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
