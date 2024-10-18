const data = [
    {
        "Nombre": "Vmware",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Empresa": "VMware Latinoamérica",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "HPE",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Empresa": "HPE Europa",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "Vmware",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Empresa": "Vmware",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "HPE",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Empresa": "HPE Europa",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "HPE",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Empresa": "HPE Europa",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "Vmware",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Empresa": "Vmware",
        "Responsable": "Ing. Esteban"
    }
];

let rows;
let numDatosAgregados = 0;
let promesa;

function insertDataTable(filas) {
    document.getElementById("table_data").innerHTML = filas;
}

function insertColumns() {
    rows = "";
    rows += "<tr>";
    rows += "<th id='select'></th>"
    rows += "<th>Nombre</th>";
    rows += "<th>Licencia</th>";
    rows += "<th>Fecha Inicio</th>";
    rows += "<th>Fecha Fin</th>";
    rows += "<th>Proveedor</th>";
    rows += "<th>Emppresa</th>";
    rows += "<th>Responsable</th>";
    rows += "<th id='columnaEditar'>Editar</th>";
    rows += "</tr>";
}

function insertRows(cantRows) {
    for (let i = 0; i < cantRows; i++) {
        rows += "<tr>";
        rows += "<td> <input type ='checkbox' id = '" + i + "'></td>";
        rows += "<td>" + data[i].Nombre + "</td>";
        rows += "<td>" + data[i].Licencia + "</td>";
        rows += "<td>" + data[i].FechaInicio + "</td>";
        rows += "<td>" + data[i].FechaFin + "</td>";
        rows += "<td>" + data[i].Proveedor + "</td>";
        rows += "<td>" + data[i].Empresa + "</td>";
        rows += "<td>" + data[i].Responsable + "</td>";
        rows += "</tr>";
    }
}

function agregarDatosMasivamente() {
    promesa = new Promise(function (resolve, error) {
        insertColumns();
        insertRows(data.length);
        resolve(rows);
    })
    promesa.then(
        function (value) { insertDataTable(value); },
        function (error) { insertDataTable(error); }
    );
    numDatosAgregados = data.length;
}

function agregarDatoIndividual() {
    if (numDatosAgregados < data.length) {
        insertColumns();
        numDatosAgregados++;
        insertRows(numDatosAgregados);
        insertDataTable(rows);
    } else {
        alert("Máximo de datos alcanzados!");
    }
}

function eliminarDato() {
    const filas = document.querySelectorAll('#table_data tr')
    for (let i = filas.length - 1; i > 0; i--) {
        const checkbox = filas[i].querySelector('input[type="checkbox"]')
        if (checkbox.checked) {
            data.splice(checkbox.getAttribute("id"), 1);
            numDatosAgregados--;
        }
    }
    insertColumns();
    insertRows(numDatosAgregados);
    insertDataTable(rows);
}

function editarFila() {
    // Obtiene todas las filas de la tabla
    const rowsAll = document.querySelectorAll('#table_data tr');
    let filaSeleccionada = null;
    let indiceArray = null;

    // Busca la fila seleccionada
    for (let i = 1; i < rowsAll.length; i++) { // Comienza desde 1 para evitar el encabezado
        const checkbox = rowsAll[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            filaSeleccionada = rowsAll[i];
            indiceArray = checkbox.getAttribute("id");
            break;
        }
    }

    // Verifica si se ha seleccionado una fila
    if (!filaSeleccionada) {
        alert("Por favor, seleccione una fila para editar.");
        return;
    }

    // Obtiene las celdas de la fila
    const cells = filaSeleccionada.getElementsByTagName("td");

    // Convierte cada celda en un input editable
    for (let j = 1; j < cells.length; j++) { // Comienza desde 1 para evitar el checkbox
        const cellValue = cells[j].innerText;
        cells[j].innerHTML = "<input type='text' value='" + cellValue + "' />";
    }

    // Agregar un botón para guardar cambios
    const saveButton = document.createElement("button");
    saveButton.innerText = "Guardar Cambios";
    saveButton.onclick = () => guardarCambios(filaSeleccionada, indiceArray);
    filaSeleccionada.appendChild(saveButton);
    document.getElementById("columnaEditar").style.display = "block";
}

function guardarCambios(filaSeleccionada, indice) {
    // Obtiene las celdas de la fila
    const cells = filaSeleccionada.getElementsByTagName("td");
    let obj = new Array();
    // Actualiza la fila y el array con los nuevos valores
    for (let j = 1; j < cells.length; j++) { // Comienza desde 1 para evitar el checkbox
        const input = cells[j].querySelector("input");
        if (input) {
            cells[j].innerText = input.value;
            obj[j - 1] = input.value;
        }
    }

    data[indice].Nombre = obj[0];
    data[indice].Licencia = obj[1];
    data[indice].FechaInicio = obj[2];
    data[indice].FechaFin = obj[3];
    data[indice].Proveedor = obj[4];
    data[indice].Empresa = obj[5];
    data[indice].Responsable = obj[6];

    // Remueve el botón de guardar
    const saveButton = filaSeleccionada.querySelector("button");
    if (saveButton) {
        saveButton.remove();
        document.getElementById("columnaEditar").style.display = "none";
    }
}