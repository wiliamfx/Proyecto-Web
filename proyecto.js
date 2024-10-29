function handleLogin(event) {
    event.preventDefault(); 
    const usuario = document.getElementById('username').value;
    const contrasena = document.getElementById('password').value;
    const userType = document.querySelector('input[name="userType"]:checked'); 

    if (!userType) {
        alert("Por favor selecciona un tipo de usuario.");
        return; 
    }
    if (userType.value === 'cliente') {
        if (usuario === 'cliente1' && contrasena === 'cliente1') {
            window.location.href = 'pag.html'; 
        } else {
            errorMessage.textContent = 'Contraseña incorrecta'; 
            errorMessage.style.display = 'block'; 
        }
    } else if (userType.value === 'mozo') {
        if (usuario === 'mozo' && contrasena === 'mozo1') {
            window.location.href = 'Pedido.html'; 
        } else {
            errorMessage.textContent = 'Contraseña incorrecta';
            errorMessage.style.display = 'block'; 
        }
    }
}
function realizarPedido(nombrePlato, precio, cantidad) {
    // Verifica si la cantidad es un número válido
    cantidad = parseInt(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    const total = precio * cantidad;
    alert(`Has pedido ${cantidad} ${nombrePlato}(s). Total: $${total.toFixed(2)}`);

    // Crear el objeto del pedido
    const pedido = {
        nombre: nombrePlato,
        precio: precio,
        cantidad: cantidad,
        fecha: new Date().toLocaleString(), // Agregar la fecha del pedido
    };

    // Guardar el pedido en localStorage
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Mostrar los pedidos actualizados
    mostrarPedidos();
}

// Función para mostrar los pedidos almacenados
function mostrarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const listaPedidos = document.getElementById('lista-pedidos');
    listaPedidos.innerHTML = ''; // Limpiar la lista antes de mostrar

    if (pedidos.length > 0) {
        pedidos.forEach(pedido => {
            const pedidoDiv = document.createElement('div');
            pedidoDiv.classList.add('pedido');

            // Crear el contenido del pedido
            pedidoDiv.innerHTML = `
                <img src="imagenes/${pedido.nombre.toLowerCase().replace(/\s/g, '-')}.jpg" alt="${pedido.nombre}">
                <div>
                    <h3>${pedido.nombre}</h3>
                    <p>Cantidad: ${pedido.cantidad}</p>
                    <p>Fecha: ${pedido.fecha}</p>
                    <p>Precio Total: $${(pedido.precio * pedido.cantidad).toFixed(2)}</p>
                </div>
            `;

            // Agregar el pedido a la lista de pedidos
            listaPedidos.appendChild(pedidoDiv);
        });
    } else {
        listaPedidos.innerHTML = '<p>No hay pedidos realizados.</p>';
    }
}

// Mostrar los pedidos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPedidos);
