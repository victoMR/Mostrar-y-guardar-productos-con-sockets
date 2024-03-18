const socket = io();

var enviarData = document.getElementById("enviarData");
var mensajeHtml = document.getElementById("mensaje");
var mensajeHtmlDel = document.getElementById("mensaje2");
var datos = document.getElementById("datos");

// Mostrar datos de la base de datos en MongoDB
socket.on("ServidorEnviarProductos", (productos) => {
  var tr = "";
  productos.forEach((producto, idLocal) => {
    tr =
      tr +
      `
    <tr>
      <td>${(idLocal + 1) * 100}</td>
      <td>${producto.nombre}</td>
      <td>${producto.marca}</td>
      <td>${producto.cantidad}</td>
      <td>
        <a href="#" onclick="editarproducto('${producto._id}')">Editar</a>
        </td>
        <td>
        <a href="#" onclick="borrarproducto('${producto._id}')">Borrar</a>
        </td>
    </tr>
    `;
  });
  datos.innerHTML = tr;
});
// Guardar datos en la base de datos de MongoDB
enviarData.addEventListener("submit", (e) => {
  e.preventDefault();
  //   Recivir datos
  var producto = {
    nombre: document.getElementById("nombre").value,
    marca: document.getElementById("marca").value,
    cantidad: document.getElementById("cantidad").value,
  };
  socket.emit("clienteGuardarProducto", producto);
  socket.on("servidorProductoGuardado", (mensaje) => {
    mensajeHtml.innerHTML = mensaje;
    setTimeout(() => {
      mensajeHtml.innerHTML = "";
      location.reload();
    }, 2000);

    document.getElementById("nombre").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("nombre").focus();
    nombre.style.backgroundColor = "grey";
  });
});

// Modificar datos de un registro en la base de datos de MongoDB
function editarproducto(id) {
  window.location.href = 'editarProducto.html?id=' + id;
}
// Borrar datos de un registro en la base de datos de MongoDB

function borrarproducto(id) {
  socket.emit("clienteBorrarProducto", id);
  socket.on("servidorProductoBorrado", (mensaje) => {
    mensajeHtmlDel.innerHTML = mensaje;
    setTimeout(() => {
      mensajeHtml.innerHTML = "";
      location.reload();
    }, 1000);
  });
}
