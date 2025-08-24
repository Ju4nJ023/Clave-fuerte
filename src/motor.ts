import type { ValidacionClave } from "./modelo";

export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const mayus = /[A-Z]/.test(clave);
  const minus = /[a-z]/.test(clave);
  return mayus && minus
    ? { esValida: true }
    : { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
};

export const tieneNumeros = (clave: string): ValidacionClave => {
  return /\d/.test(clave)
    ? { esValida: true }
    : { esValida: false, error: "La clave debe de tener números" };
};

export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const especiales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return especiales.test(clave)
    ? { esValida: true }
    : { esValida: false, error: "La clave debe de tener caracteres especiales" };
};

export const tieneLongitudMinima = (clave: string): ValidacionClave => {
  return clave.length >= 8
    ? { esValida: true }
    : { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
};

export const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
  return clave.toLowerCase().includes(nombreUsuario.toLowerCase())
    ? { esValida: false, error: "La clave no debe tener el nombre del usuario" }
    : { esValida: true };
};

export const tienePalabrasComunes = (clave: string, comunes: string[]): ValidacionClave => {
  const set = new Set(comunes.map(c => c.toLowerCase()));
  return set.has(clave.toLowerCase())
    ? { esValida: false, error: "La clave no debe de contener palabras comunes" }
    : { esValida: true };
};

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  comunes: string[]
): ValidacionClave => {
  const tests = [
    tieneLongitudMinima(clave),
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, comunes),
  ];
  for (const r of tests) if (!r.esValida) return r;
  return { esValida: true };
};