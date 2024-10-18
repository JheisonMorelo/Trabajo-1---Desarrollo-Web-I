const licencias = ["Software", "Hardware"];
const monitor = ["Gráficas"];
const administracion = ["Usuarios", "Permisos"];

function subm_licencias() {
    document.getElementById("nav").innerHTML = null;
    for (let i in licencias) {
        document.getElementById("nav").innerHTML += "<button>" + licencias[i] + "</button>";
    }
}

function subm_monitor() {
    document.getElementById("nav").innerHTML = null;
    for (let i in monitor) {
        document.getElementById("nav").innerHTML += "<button>" + monitor[i] + "</button>";
    }
}

function subm_administracion() {
    document.getElementById("nav").innerHTML = null;
    for (let i in administracion) {
        document.getElementById("nav").innerHTML += "<button>" + administracion[i] + "</button>";
    }
}