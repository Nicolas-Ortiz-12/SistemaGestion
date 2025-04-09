function mostrarAgregar() {
    document.getElementById("formularioAgregar").style.display = "block";
}

function mostrarRegistrarBanco() {
    if (document.getElementById("bancoSelect").value === "añadirBanco") {
        document.getElementById("formularioRegistrarBanco").style.display = "block";
    }
}

function cerrarRegistroBanco(form) {
    document.getElementById("bancoSelect").value = "0";
    document.getElementById(form).reset();
    document.getElementById(form).style.display = "none";
}   

function guardarRegistroBanco(form) { /*Falta completar*/
    document.getElementById(form).style.display = "none";
}
