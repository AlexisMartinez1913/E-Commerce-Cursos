//variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners() {
    //agregar curso presionando el btn "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);
    //eliminar cursos
    carrito.addEventListener("click", eliminarCurso);
    //vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () =>{
        //resetear el arreglo
        articulosCarrito = [];
        limpiarHTML(); //eliminar html

    })
}

//funciones
function agregarCurso(e) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
}

//eliminar un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //volver a iterar sobre el carrito
    }

}

//leer el contenido del html al que le dimos clic y extrae la info del curso
function leerDatosCurso(curso) {
    //crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    //revisa si elemento ya existe en el carrito
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if (existe) {
        //actualizar cantidad
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            }else{
                return curso; //retorna objeto no duplicado
            }
            articulosCarrito = [...cursos];
        });
    } else {
        //agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//mostrar el carrito de compras en el html
function carritoHTML() {
    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
           <td><img src= "${imagen}" width="100"></td>
           <td>${titulo}</td>
           <td>${precio}</td>
           
           <td>${cantidad}</td>
           <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
           
        `;
        //agregar el html al carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
