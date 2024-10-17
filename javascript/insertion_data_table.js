const data = [
    {
        "Nombre": "Vmware",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Emppresa": "VMware Latinoamérica",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "HPE",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Emppresa": "HPE Europa",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "Vmware",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Emppresa": "Vmware",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "HPE",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Emppresa": "HPE Europa",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "HPE",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Emppresa": "HPE Europa",
        "Responsable": "Ing. Esteban"
    },
    {
        "Nombre": "Vmware",
        "Licencia": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Proveedor": "CEM",
        "Emppresa": "Vmware",
        "Responsable": "Ing. Esteban"
    }
];

let rows;
let numDatosAgregados = 0;
let promesa;

function cambiarEstado(i) {
    if (document.getElementById(i).ariaChecked == "true") {
        document.getElementById(i).ariaChecked = "false";
    } else {
        document.getElementById(i).ariaChecked = "true";
    }
}

function insertDataTable(filas) {
    document.getElementById("table_data").innerHTML = filas;
}

function insertColumns() {
    rows = "";
    rows += "<tr>";
    rows += "<th>Nombre</th>";
    rows += "<th>Licencia</th>";
    rows += "<th>Fecha Inicio</th>";
    rows += "<th>Fecha Fin</th>";
    rows += "<th>Proveedor</th>";
    rows += "<th>Emppresa</th>";
    rows += "<th>Responsable</th>";
    rows += "</tr>";
}

function insertRows(cantRows) {
    for (let i = 0; i < cantRows; i++) {
        rows += "<tr id='obj" + i + "'>";
        rows += "<td> <input type ='checkbox' onclick = 'cambiarEstado(" + i + ")' id = '" + i + "'>" + data[i].Nombre + "</td>";
        rows += "<td>" + data[i].Licencia + "</td>";
        rows += "<td>" + data[i].FechaInicio + "</td>";
        rows += "<td>" + data[i].FechaFin + "</td>";
        rows += "<td>" + data[i].Proveedor + "</td>";
        rows += "<td>" + data[i].Emppresa + "</td>";
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
    for (let i = data.length - 1; i >= 0; i--) {
        if (document.getElementById(i) != null && document.getElementById(i).ariaChecked == "true") {
            data.splice(i, 1);
            numDatosAgregados--;
        }
    }
    insertColumns();
    insertRows(numDatosAgregados);
    insertDataTable(rows);
}

function editarFila() {
    // Obtiene todas las filas de la tabla
    const rows = document.querySelectorAll('#table_data tr');
    let filaSeleccionada = null;

    // Busca la fila seleccionada
    for (let i = 1; i < rows.length; i++) { // Comienza desde 1 para evitar el encabezado
        const checkbox = rows[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            filaSeleccionada = rows[i];
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
        cells[j].innerHTML = "<input type='text' value='" +cellValue + "' />";
    }

    // Agregar un botón para guardar cambios
    const saveButton = document.createElement("button");
    saveButton.innerText = "Guardar Cambios";
    saveButton.onclick = () => guardarCambios(filaSeleccionada);
    filaSeleccionada.appendChild(saveButton);
}

function guardarCambios(filaSeleccionada) {
    // Obtiene las celdas de la fila
    const cells = filaSeleccionada.getElementsByTagName("td");

    // Actualiza la fila con los nuevos valores
    for (let j = 1; j < cells.length; j++) { // Comienza desde 1 para evitar el checkbox
        const input = cells[j].querySelector("input");
        if (input) {
            cells[j].innerText = input.value; // Guarda el nuevo valor
        }
    }

    // Remueve el botón de guardar
    const saveButton = filaSeleccionada.querySelector("button");
    if (saveButton) {
        saveButton.remove();
    }
}