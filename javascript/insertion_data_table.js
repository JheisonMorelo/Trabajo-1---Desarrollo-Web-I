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