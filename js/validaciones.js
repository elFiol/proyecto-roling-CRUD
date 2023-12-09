export const validarCantidadCaracteres = (texto, min, max) => {
  return (texto.length >= min && texto.length <= max) || texto !== "";
};
export function validarEmail(email) {
  const regexEmail =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return regexEmail.test(email.trim());
}
export function validarTelefono(telefono) {
  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let tieneNumeros = true;
  for (let i = 0; i < telefono.length; i++) {
    let telefonoLetra = telefono.charAt(i);
    if (letras.includes(telefonoLetra)) {
      tieneNumeros = false;
      break;
    }
  }
  return tieneNumeros && telefono !== "";
}
