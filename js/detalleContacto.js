import {
  validarCantidadCaracteres,
  validarEmail,
  validarTelefono,
} from "./validaciones.js";
import { Contacto } from "./classContacto.js";

const parametroURL = new URLSearchParams(window.location.search);
const idContacto = parametroURL.get("id"),
  nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  email = document.getElementById("email"),
  telefono = document.getElementById("telefono"),
  form = document.querySelector("form"),
  boton = document.querySelector("button");
const agenda = JSON.parse(localStorage.getItem("agendaKey"));
const contactoBuscado = agenda[idContacto];
nombre.value = contactoBuscado.nombre;
apellido.value = contactoBuscado.apellido;
email.value = contactoBuscado.email;
telefono.value = contactoBuscado.telefono;

function guardarLocalStorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validarCantidadCaracteres(nombre.value, 3, 40) &&
    validarCantidadCaracteres(apellido.value, 3, 40) &&
    validarEmail(email.value) &&
    validarTelefono(telefono.value)
  ) {
    const nuevoContacto = new Contacto(
      contactoBuscado.id,
      nombre.value,
      apellido.value,
      email.value,
      telefono.value
    );
    agenda.splice(idContacto, 1, nuevoContacto);
    guardarLocalStorage();
    form.reset();
    alert("se ha realizado el cambio");
    window.location.href = "../index.html"
  } else {
    alert("Cargaste datos erroneos");
  }
});
