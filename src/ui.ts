import { validarClave } from "./motor";
import { commonPasswords } from "./modelo";

const nombreUsuario = "coder";

const validas: string[] = [];
const invalidas: Array<{ clave: string; error: string }> = [];

for (const clave of commonPasswords) {
  const resultado = validarClave(nombreUsuario, clave, commonPasswords);
  if (resultado.esValida) {
    validas.push(clave);
  } else {
    invalidas.push({ clave, error: resultado.error ?? "Error desconocido" });
  }
}

console.log("=== ✅ CONTRASEÑAS VÁLIDAS ===");
validas.forEach(c => console.log(`✅ ${c}`));

console.log("\n=== ❌ CONTRASEÑAS INVÁLIDAS ===");
invalidas.forEach(i => console.log(`❌ ${i.clave} - ${i.error}`));

console.log(`\nResumen: ${validas.length} válidas, ${invalidas.length} inválidas`);