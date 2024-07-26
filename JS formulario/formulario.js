window.onload = function() {
    const form = document.getElementById('form');
    form.elements.name.value = "Por favor, introduzca su nombre";

    form.addEventListener('submit', function(event) {
        if (!emailValidation(form)) {
            event.preventDefault();
        } else if (!confirmSubmit(form)) {
            event.preventDefault();
        }
    });
};

function confirmSubmit(form) {
    const name = form.elements.name.value;
    if (!confirm(`${name}, seguro que quieres enviarlo?`)) {
        alert("Se ha cancelado");
        return false;
        //Si se cancela, debo evitar que el formulario se envíe
    } else {
        alert("Se ha enviado correctamente");
        return true;
        /*Si el usuario hace clic en "Cancelar" (y confirm devuelve false), 
        el operador ! invierte el valor y la condición es true, por lo que se ejecuta el código dentro del bloque if.
        Si el usuario hace clic en "Aceptar" (y confirm devuelve true), 
        el operador ! invierte el valor y la condición es false, por lo que no se ejecuta el código dentro del bloque if*/
    }
}

function emailValidation(form) {
    if (form.email.value !== form.email_confirm.value) {
        const element = document.createElement("p");
        const message = document.createTextNode("Correo electrónico no coincide");
        const emailConfirmInput = form.email_confirm;

        element.appendChild(message);
        form.appendChild(element);
        element.classList.add("alert");
        emailConfirmInput.style.backgroundColor = "rgba(230,169,171,.5)";

        setTimeout(function() {
            element.remove();  // Elimina el mensaje después de 3 segundos
            emailConfirmInput.style.backgroundColor = "";
        }, 3000);
        
        return false;
    }
    return true;
}


