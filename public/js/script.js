const socket = io();

var enviarData = document.getElementById("enviarData");
var mensajeHtml = document.getElementById("mensaje");
var mensajeHtmlDel = document.getElementById("mensaje2");
var datos = document.getElementById("datos");

// Mostrar datos de la base de datos en MongoDB
socket.on("ServidorEnviarUsuarios", (usuarios) => {
  var tr = "";
  usuarios.forEach((usuario,idLocal) => {
    tr =
      tr +
      `
    <tr>
      <td>${(idLocal+1)*100}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.usuario}</td>
      <td>${usuario.pass}</td>
      <td>
        <a href="#" onclick="editarUsuario('${usuario._id}')">Editar</a>
        </td>
        <td>
        <a href="#" onclick="borrarUsuario('${usuario._id}')">Borrar</a>
        </td>
    </tr>
    `;
  });
  datos.innerHTML=tr;
});
// Guardar datos en la base de datos de MongoDB
enviarData.addEventListener("submit", (e) => {
  e.preventDefault();
  //   Recivir datos
  var usuario = {
    nombre: document.getElementById("nombre").value,
    usuario: document.getElementById("usuario").value,
    pass: document.getElementById("password").value,
  };

  socket.emit("clienteGuardarUsuario", usuario);
  socket.on("servidorUsuarioGuardado", (mensaje) => {
    mensajeHtml.innerHTML = mensaje;
    setTimeout(() => {
      mensajeHtml.innerHTML = "";
      location.reload();
    }, 2000);

    document.getElementById("nombre").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("nombre").focus();
    nombre.style.backgroundColor = "grey";
    
  });
});

// Modificar datos de un registro en la base de datos de MongoDB
function editarUsuario(id){
  window.location.href = 'editarUsuario.html?id=' + id;
  
}
// Eliminar datos de la base de datos de MongoDB
function borrarUsuario(id){
  socket.emit("clienteBorrarUsuario", id);
  socket.on("servidorUsuarioBorrado", (mensaje) => {
    mensajeHtmlDel.innerHTML = mensaje;
    setTimeout(() => {
      mensajeHtml.innerHTML = "";
      location.reload();
    }, 1000);
  });
}