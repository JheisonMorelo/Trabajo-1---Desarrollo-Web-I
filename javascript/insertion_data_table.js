const data = [
    {
        "Nombre": "Vmware",
        "Estado": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Parther": "CEM",
        "Empresa": "VMware Latinoamérica"
    },
    {
        "Nombre": "HPE",
        "Estado": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Parther": "CEM",
        "Empresa": "HPE Europa"
    },
    {
        "Nombre": "Vmware",
        "Estado": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Parther": "CEM",
        "Empresa": "Vmware"
    },
    {
        "Nombre": "HPE",
        "Estado": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Parther": "CEM",
        "Empresa": "HPE Europa"
    },
    {
        "Nombre": "HPE",
        "Estado": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Parther": "CEM",
        "Empresa": "HPE Europa"
    },
    {
        "Nombre": "Vmware",
        "Estado": "Activa",
        "FechaInicio": "2022-08-08 08:30",
        "FechaFin": "2022-08-08 09:00",
        "Parther": "CEM",
        "Empresa": "Vmware"
    }
];

let rows;
let numDatosAgregados = 0;
let promesa;

function insertDataTable(filas) {
    $("#table_data").html(filas);
}

function insertColumns() {
    rows = "";
    rows += "<tr>";
    rows += "<th><input type='checkbox' onclick='seleccionarTodos()'>Name</th>"
    rows += "<th>Nombre</th>";
    rows += "<th>Estado</th>";
    rows += "<th>Fecha Inicio</th>";
    rows += "<th>Fecha Fin</th>";
    rows += "<th>Parther</th>";
    rows += "<th>Empresa</th>";
    rows += "<th id='columnaEditar'>Editar</th>";
    rows += "</tr>";
}

function insertRows(cantRows) {
    for (let i = 0; i < cantRows; i++) {
        rows += "<tr>";
        rows += "<td> <input type ='checkbox' id = '" + i + "'></td>";
        rows += "<td>" + data[i].Nombre + "</td>";
        rows += "<td>" + data[i].Estado + "</td>";
        rows += "<td>" + data[i].FechaInicio + "</td>";
        rows += "<td>" + data[i].FechaFin + "</td>";
        rows += "<td>" + data[i].Parther + "</td>";
        rows += "<td>" + data[i].Empresa + "</td>";
        rows += "</tr>";
    }
}

function cambiarEstado(estado, filas) {
    for (let i = 1; i < filas.length; i++) {
        const element = filas[i].querySelector('input[type="checkbox"]')
        element.checked = estado;
    }
}

function seleccionarTodos() {
    const allRows = $('#table_data tr');
    if(allRows[0].querySelector('input').checked) {
        cambiarEstado(true, allRows);
    } else {
        cambiarEstado(false, allRows);
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
    licenciasActivasNoActivas();
}

function agregarDatoIndividual() {
    if (numDatosAgregados < data.length) {
        insertColumns();
        numDatosAgregados++;
        insertRows(numDatosAgregados);
        insertDataTable(rows);
    }   
    licenciasActivasNoActivas();
}

function eliminarDato() {
    const filas = $('#table_data tr');
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
    licenciasActivasNoActivas();
}

function editarFila() {
    // Obtiene todas las filas de la tabla
    const rowsAll = $('#table_data tr');
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
    $('#columnaEditar').css({"display":"block"});
    
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
    saveButton.style.margin = "6px";
    saveButton.style.borderRadius = "10px";
    saveButton.onclick = () => guardarCambios(filaSeleccionada, indiceArray);
    filaSeleccionada.appendChild(saveButton);
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
        $('#columnaEditar').css({"display":"none"});
    }
}

function licenciasActivasNoActivas() {
    let licenActivas = 0;
    let licenNoActivas = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].Estado == "Activa") {
            licenActivas++;
        } else {
            licenNoActivas++;
        }
    }
    $('#Activas').html('Licencias activas: ' + licenActivas);
    $('#No_Activas').html('Licencias vencidas: ' + licenNoActivas);
}
