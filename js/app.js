import { Contacto } from "./classContacto.js";
import {
  validarCantidadCaracteres,
  validarEmail,
  validarTelefono,
} from "./validaciones.js";

const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [],
  formularioContacto = document.querySelector("form"),
  nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");

function crearContacto(e) {
  e.preventDefault();
  if (
    validarCantidadCaracteres(nombre.value, 3, 40) &&
    validarCantidadCaracteres(apellido.value, 3, 40) &&
    validarEmail(email.value) &&
    validarTelefono(telefono.value)
  ) {
    const nuevoContacto = new Contacto(
      crypto.randomUUID(),
      nombre.value,
      apellido.value,
      email.value,
      telefono.value
    );
    agenda.push(nuevoContacto);
    guardarLocalStorage();
    formularioContacto.reset();
    crearFila(nuevoContacto, agenda.length);
  } else {
    alert("Cargaste datos erroneos");
  }
}
const crearFila = (contacto, fila) => {
  const tablaContacto = document.querySelector("#tablaContacto");
  tablaContacto.innerHTML += `<tr>
      <th scope="row">${fila}</th>
      <td>${contacto.nombre}</td>
      <td>${contacto.apellido}</td>
      <td>${contacto.email}</td>
      <td>${contacto.telefono}</td>
      <td>
        <button class="btn btn-primary" onclick="detalleContacto('${contacto.id}')">Ver mas y editar</button>
        <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
      </td>
    </tr>`;
};
const cargaInicial = () => {
  if (agenda.length > 0) {
    agenda.map((contacto, posicion) => crearFila(contacto, posicion + 1));
  }
};
window.borrarContacto = (idContacto) => {
  Swal.fire({
    title: "¿Estas seguro de borrar el contacto?",
    text: "No puedes revertir este paso posteriormente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionContactoBuscado = agenda.findIndex(
        (contacto) => contacto.id === idContacto
      );
      agenda.splice(posicionContactoBuscado, 1);
      guardarLocalStorage();
      //borrar la fila de la tabla
      const tablaContacto = document.querySelector("tbody");
      console.log(tablaContacto.children[posicionContactoBuscado]);
      tablaContacto.removeChild(
        tablaContacto.children[posicionContactoBuscado]
      );
      setTimeout(function () {
        location.reload();
      }, 1500);
      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto seleccionado fue eliminado correctamente",
        icon: "success",
      });
    }
  });
};
function guardarLocalStorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}
window.detalleContacto = (idContacto) => {
  const posicionContacto = agenda.findIndex(
    (contacto) => contacto.id === idContacto
  );
  window.location.href =
    window.location.origin +
    "/pages/detalleContacto.html?id=" +
    posicionContacto;
};

formularioContacto.addEventListener("submit", crearContacto);
cargaInicial();
