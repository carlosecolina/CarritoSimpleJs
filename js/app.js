//variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEvenListeners();

function cargarEvenListeners() {
    //Cuando agregas un curso precionando agregar 
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso )

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();


    })
}


//funciones 
function agregarCurso(e) {

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){ // validamos si el lungar en donde preciono el usuario contiene la clase agregar carrito 
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }
}
//Elimina elementos del carrito 

function eliminarCurso(e) {

    e.preventDefault(); 

   
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        const existe = articulosCarrito.some( curso => curso.id === cursoId && curso.cantidad > 1 );
        
        if(existe){

            const cursos = articulosCarrito.map( curso => {
                
                if(curso.id === cursoId){
                    
                    curso.cantidad--;
                    return curso; // retorna el objeto actualizado 
                }else {
                    return curso; // retorna los objetos que no son duplicados 
                }
                
            });
            articulosCarrito = [...cursos]

        }else {
            //elimina del arreglo de articulosCarrito por el data id 
            articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        }

        
        
        carritoHTML(); //volvemos a iterar sobre el carrito y mostrar su html 
    }
    
}


// lee el contenido del html al que le hacemos el click y extrae la informacion del curso 

function leerDatosCurso(curso) {
    //console.log(curso);
    
    //Crar un objeto con el contenido del curso actual 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1 
    }

    //revisa si un elemento ya existe en el carro 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if (existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado 
            }else {
                return curso; // retorna los objetos que no son duplicados 
            }
            
        });
        articulosCarrito = [...cursos]

    }else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    //agregar elementos al arreglo del carrito 
    

    

    carritoHTML();
}

//muestra el carrito de compra en el html 
function carritoHTML() {
    //limpiar el html 
    limpiarHTML();
    //Recorre el carrito y genera el html 
    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso ; 

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${imagen}" width = 100>
            </td>
            <td>${titulo}</td> 
            
            <td> ${precio} </td> 
            
            <td>  ${cantidad}   </td> 

            <td>  
                <a href="#" class= "borrar-curso" data-id = ${id} > X </a>
            </td> 

        `;

        //Agrega el HTML del carrito en el tbody 
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //forma lenta 
    /* contenedorCarrito.innerHTML=''; */

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}