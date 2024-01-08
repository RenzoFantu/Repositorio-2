// Para menu hamburguesa

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");


abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// Se ejecuta la función showData cuando la ventana ha cargado completamente.
window.onload = showData;

// Función para validar el formulario
function validateForm() {
    // Obtener valores de los campos
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let phone = document.getElementById("inputPhone").value;

    // Validar el campo de correo electrónico
    if (email === "") {
        alert("El Campo de email es requerido");
        return false;
    } else if (!email.includes("@")) {
        alert("El correo no es válido");
        return false;
    }

    // Validar el campo de nombre
    if (name.trim() === "") {
        alert("El Campo Nombre es requerido");
        return false;
    }

    // Validar el campo de teléfono
    if (phone.trim() === "") {
        alert("El Campo Teléfono es requerido");
        return false;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
}

// Función para agregar datos
function AddData() {
    // Verificar si el formulario es válido
    if (validateForm()) {
        // Obtener valores de los campos
        let email = document.getElementById("inputEmail").value;
        let name = document.getElementById("inputName").value;
        let phone = document.getElementById("inputPhone").value;

        let listPeople;

        // Verificar si 'listPeople' existe en el localStorage
        if (localStorage.getItem("listPeople") === null) {
            // Si no existe, crear una nueva lista
            listPeople = [];
        } else {
            // Si existe, recuperar la lista existente
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }

        // Agregar nuevos datos a la lista
        listPeople.push({
            email: email,
            name: name,
            phone: phone,
        });

        // Actualizar 'listPeople' en el localStorage
        localStorage.setItem("listPeople", JSON.stringify(listPeople));

        // Mostrar los datos actualizados en la tabla
        showData();

        // Limpiar los campos de entrada después de agregar datos
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputName").value = "";
        document.getElementById("inputPhone").value = "";
    }
}

// Función para mostrar datos en la tabla
function showData() {
    let listPeople;

    // Verificar si 'listPeople' existe en el localStorage
    if (localStorage.getItem("listPeople") === null) {
        // Si no existe, crear una nueva lista
        listPeople = [];
    } else {
        // Si existe, recuperar la lista existente
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    let html = "";
    listPeople.forEach(function (element, index) {
        // Construir filas de la tabla con datos de 'listPeople'
        html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.phone + "</td>";
        // Agregado un ID al botón de borrar
        html += '<td><button onclick="updateData(' + index + ')" class="btn btn-warning">Editar Dato</button> <button onclick="deleteData(' + index + ')" class="btn btn-danger" id="btnDelete">Borrar Dato</button></td>';
        html += "</tr>";
    });

    // Insertar HTML generado en el cuerpo de la tabla
    document.querySelector('#tableData tbody').innerHTML = html;
}

// Función para eliminar datos
function deleteData(index) {
    let listPeople;

    // Verificar si 'listPeople' existe en el localStorage
    if (localStorage.getItem("listPeople") === null) {
        // Si no existe, crear una nueva lista
        listPeople = [];
    } else {
        // Si existe, recuperar la lista existente
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    // Eliminar elemento en la posición 'index'
    listPeople.splice(index, 1);

    // Actualizar 'listPeople' en el localStorage
    localStorage.setItem("listPeople", JSON.stringify(listPeople));

    // Mostrar los datos actualizados en la tabla
    showData();
}

// Función para actualizar datos
function updateData(index) {
    // Cambiar visibilidad de botones
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnDelete").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
    
    let listPeople;

    // Verificar si 'listPeople' existe en el localStorage
    if (localStorage.getItem("listPeople") === null) {
        // Si no existe, crear una nueva lista
        listPeople = [];
    } else {
        // Si existe, recuperar la lista existente
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    // Rellenar formulario para editar con datos actuales
    document.getElementById("inputEmail").value = listPeople[index].email;
    document.getElementById("inputName").value = listPeople[index].name;
    document.getElementById("inputPhone").value = listPeople[index].phone;

    // Asignar evento de clic al botón de actualizar
    document.getElementById("btnUpdate").onclick = function () {
        if (validateForm()) {
            // Actualizar datos en la lista
            listPeople[index].email = document.getElementById("inputEmail").value;
            listPeople[index].name = document.getElementById("inputName").value;
            listPeople[index].phone = document.getElementById("inputPhone").value;

            // Actualizar 'listPeople' en el localStorage
            localStorage.setItem("listPeople", JSON.stringify(listPeople));

            // Mostrar los datos actualizados en la tabla
            showData();

            // Limpiar campos de entrada
            document.getElementById("inputEmail").value = "";
            document.getElementById("inputName").value = "";
            document.getElementById("inputPhone").value = "";

            // Restaurar visibilidad de botones
            document.getElementById("btnAdd").style.display = "block";
            document.getElementById("btnDelete").style.display = "block";
            document.getElementById("btnUpdate").style.display = "none";
            
        }
    };
}

//Se agregó para botones en general
function Alerta(){
    alert ("Estamos trabajando para ti mono feo, te invito a revisar mi CRUD")
}


