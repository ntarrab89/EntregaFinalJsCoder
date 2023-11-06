// console.log('hola')
let gondola=[]
let carrito=[]

// console.log(gondola)
window.onload = function() {

fetch('../js/articulos.json')
.then(response=>response.json())
.then((data)=>{
     console.log(data)
    data.forEach((element)=>{
        gondola.push(element)
        // console.log(element)
        let padre=document.querySelector('#tabla');
    let tr=document.createElement('tr');
    tr.setAttribute("id", `tr${element.id}`)
    tr.innerHTML=
    `
    <td class='angosto'>${element.id}</td>
    <td class='ancho'>${element.nombre}</td>
    <td class='medio'>$ ${element.precio}</td>
    <td class='angosto'><button class='btn btn-success'id='btnaddchart-${element.id}' onclick="addChart(${element.id})">Agregar al carrito</button></td>
    <td class='angosto'><button class='btn btn-outline-danger' id='btn-${element.id}' onclick="eliminar(${element.id})">Quitar</button></td>
    `
    padre.append(tr);
    // console.log(padre);
    })
})
// console.log(gondola);
};

const formato = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    maximumFractionDigits: 0,
    groupingSeparator: ".",
  });

gondola.forEach(element=>{

});



function crearCarrito(){
    for(let i=0;i<10;i++){
    let index=i
    const lectura=localStorage.getItem(`chart${i}`)

}
}
function limpiarCarrito(){
    for(let i=0;i<10;i++){
    
         localStorage.setItem(`chart${i}`,'');

}
}
function crearCarrito(){
    for(let i=0;i<10;i++){
    let index=i
    const lectura=localStorage.getItem(`chart${i}`)

}
}

function cargarCarrito(){
    let arrayNuevo=[]
    for(i=0;i<9;i++){
        let value=localStorage.getItem(`chart${i}`)
        // console.log(`el valor nro i del carrito es ${value}`)
        if (value){
            const valorParsed=JSON.parse(localStorage.getItem(`chart${i}`))
            arrayNuevo.push(valorParsed)
        }else{
            // console.log('esta vacio')
        }
    }
    // console.log(arrayNuevo)
    carrito=arrayNuevo
    carrito.forEach((element)=>{
        frontaddCarrito(element)
    })
}
cargarCarrito()
crearCarrito();
indentificarUltimoDato();

function eliminar(id){
    // console.log(gondola)
    // console.log(`ID ${id}`)
    let index=gondola.findIndex(element=>element.id==id)
    // console.log(index)
    eraseFront(index)
    eraseGondola(index)
    
}
 function eraseFront(index){
    let id=gondola[index].id;

    let objeto2=`tr${id}`;
    //  console.log(objeto2);
     object2=document.getElementById(objeto2);
    // console.log(object2);
    object2.remove();

}
function eraseGondola(index){
    gondola.splice(index,1)
    // console.log(gondola)
}
function agregarProducto(){
    let longitud=gondola.length
    nuevoid=gondola[longitud-1].id+1
    // console.log(nuevoid)
    let name=prompt(`id: ${nuevoid}\n Especifique nombre`);
    let precio=prompt('precio');
    let productonuevo={id:nuevoid, precio:precio,nombre:name}
    addGondola(productonuevo)
    addFront(productonuevo)
}
function addGondola(newproduct){
    gondola.push(newproduct)
    // console.log(gondola);   
}
function addFront(element){

    let padre=document.querySelector('#tabla');
    let tr=document.createElement('tr');
    tr.setAttribute("id", `tr${element.id}`)
    tr.innerHTML=
    `
    <td class='angosto'>${element.id}</td>
    <td class='ancho'>${element.nombre}</td>
    <td class='medio'>$ ${element.precio}</td>
    <td class='angosto'><button class='btn btn-success'id='btnaddchart-${element.id}' onclick="addChart(${element.id})">Agregar al carrito</button></td>
    <td class='angosto'><button class='btn btn-outline-danger' id='btn-${element.id}' onclick="eliminar(${element.id})">Quitar</button></td>
    `
    padre.append(tr);
    // console.log(padre);
    //let prueba=document.getElementById('tr1');
    //console.log(prueba);

}
function addChart(id){
    // console.log(id);
    let cantidad=prompt('especifique la cantidad');
    let producto=gondola.findIndex(element=>element.id==id)
    // console.log(id);
    // console.log(producto)
    let nombre=gondola[producto].nombre;
    let precio=gondola[producto].precio;
    agregarAlCarrito(nombre, precio, cantidad)

}


function agregarAlCarrito(nombre,precio,cantidad){
    productoAAgregarAlCarrito={nombre:nombre, precio:precio, cantidad:cantidad}
    if(carrito.findIndex(element=>element.nombre==productoAAgregarAlCarrito.nombre)<0){
    carrito.push(productoAAgregarAlCarrito);
    // console.log(carrito);
    frontaddCarrito(productoAAgregarAlCarrito)
    pushLocal(productoAAgregarAlCarrito)
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    printLocal()

    }else{

        Swal.fire({
            title: "Producto ya agregado al carrito",
            text: "Modifique desde el carrito",
            icon: "warning"
          });
    }
}
function frontaddCarrito(element){

    
    let padre=document.querySelector('#trcarrito')
    let tr=document.createElement('tr');
    tr.setAttribute('id',`tr${element.nombre}`)
    tr.innerHTML=
    `
    <td class='puntero'>►</td>
    <td class='angosto'>${element.nombre}</td>
    <td class='angosto'>$ ${element.precio}</td>
    <td class='angosto'><span id='cant-${element.nombre}'>${element.cantidad}</span> u</td>
    <td class='angosto'><button class='btn btn-sm btn-secondary' onclick='cambiarCantidad("${element.nombre}")'>Cambiar cantidad</button></td>
    <td class='mitadangosto'><button class='btn btn-sm btn-danger' id='btnchart-${element.nombre}' onclick='eliminarCarrito("${element.nombre}")'>Quitar</button></td>
    `
    padre.appendChild(tr)
    calcularTotal()
}

function eliminarCarrito(nombre){
    let IndexproductToErase= carrito.findIndex(element=>element.nombre==nombre)
    // console.log(` voy a borrar a ${IndexproductToErase}`);
    eraseFrontChart(IndexproductToErase)
    eraseChartProduct(IndexproductToErase)
    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #eb2c2c)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    refreshLocal();
}
function eraseChartProduct(index){
    carrito.splice(index,1);
    console.log(carrito);
    calcularTotal()
}
function eraseFrontChart(index){
    let nombre=carrito[index].nombre;
    let padre=document.getElementById('tabla');
    let objeto2=`tr${nombre}`;
    object2=document.getElementById(objeto2);
    object2.remove();
}
function calcularTotal(){
    let total=0
    carrito.forEach((element)=>{
        // console.log(`${element.nombre} - ${element.precio} - ${element.cantidad}`)
        total+=element.precio * parseInt(element.cantidad)
        // console.log(total)
    })
    const frontTotal=document.getElementById('totalCompra')
    const numeroFormateado3 = formato.format(total);
    //  frontTotal.innerText=`Total de la compra: $ ${total}`
    frontTotal.innerText=`Total de la compra: $ ${numeroFormateado3}`
}
function cambiarCantidad(nombre){
    let nuevacantidad=prompt('especifique nueva cantidad')
    let indexchangeq= carrito.findIndex(element=>element.nombre==nombre)
    changeChartProduct(indexchangeq, nuevacantidad)
    changeFrontChart(indexchangeq,nuevacantidad,nombre)
    refreshLocal()
}
function changeChartProduct(indexchangeq,nuevacantidad){
    let cantidad=nuevacantidad;
    carrito[indexchangeq].cantidad=nuevacantidad;
    // console.log(carrito)
}
function changeFrontChart(indexchangeq,nuevacant,name){

    let objeto2=`cant-${name}`;
    object2=document.getElementById(objeto2);
    object2.innerHTML=nuevacant;
    calcularTotal();
    Toastify({
        text: "Cantidad cambiada con éxito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #444444, #888787",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

  
  function pushLocal(element){
    const ultimodato=indentificarUltimoDato();
    const enJS=JSON.stringify(element);
    localStorage.setItem(`chart${ultimodato}`,enJS);
    // console.log(enJS)
    //console.log(getItem)
  }
  
  function printLocal(){
    indentificarUltimoDato();
    let carritolocal=[];
    // console.log(localStorage.length)
    const fin=localStorage.length;
    // console.log (`entra al bucle y el fin es ${fin}`)
        for(let i=0; i<fin;i++){
            //console.log('entra')
            let index= i;
           // console.log(index)
            const jselement=JSON.parse(localStorage.getItem(`carrito${(index)}`));
            // console.log(`el elemeento js es ${jselement}`);
            carritolocal.push(jselement);
        }
    // console.log(carritolocal);
    return carritolocal; 
}

  function refreshLocal(){
    // console.log(`aca esta el carrito
    // ${carrito}`)
    limpiarCarrito();
    index=0
    carrito.forEach((element)=>{
        elemento=JSON.stringify(element)
        localStorage.setItem(`chart${index}`,elemento)
        index++
    }
    )
}

  function indentificarUltimoDato(){
    let item='chart0'
    const valor=localStorage.getItem('chart10');
    valor === '' && console.log("El carrito está vacío!")
    
    let indexwrote=0;
    for(let i=0;i<localStorage.length;i++){
       // console.log('entroo')
        const value=localStorage.getItem(`chart${i}`);
        //console.log(`el valor de index ${i} es ${value}`)
        if (value===""){
            
        }
        else{
            indexwrote=i+1
        }
    }
    return indexwrote 
    console.log(`el ulitmo valor cargado es ${indexwrote}`)
}
function acomodarChart(indexremoved){
    let i=indexremoved
    let fin=localStorage.length-1
    // console.log(`voy a eliminar del index ${i} al nro ${fin}`)
    for(i;i<fin;i++){
        // console.log(`el chart+1 es ${i+1}`)
        let nextValue=localStorage.getItem(`chart${i+1}`)
        // console.log(`el proximo valor es ${nextValue}`)
        //const enJS=(`chart${i}`,nextValue)
        localStorage.setItem(`chart${indexremoved}`,nextValue)
    }
}
