const email = document.getElementById("email")
const pass = document.getElementById("password")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e => {

    e.preventDefault()

    let warnings = ""


    if (email.value != "admin") {
        warnings += `Email no valido <br>`
        entrar = true
    } else {
        if (pass.value != "admin") {
            warnings += `Contraseña incorrecta`
            entrar = true
        }else{
            if (email.value == "admin" && pass.value == "admin"){
                window.location = "../html/sistema.html"
            }
        }
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    }
})