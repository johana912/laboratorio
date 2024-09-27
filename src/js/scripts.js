document.addEventListener('DOMContentLoaded', () => {
    const eventoForm = document.getElementById('evento-form');
    const listaEventos = document.getElementById('eventos');

    // Cargar eventos guardados
    let eventosGuardados = JSON.parse(localStorage.getItem('eventos')) || [];
    eventosGuardados.forEach(evento => agregarEvento(evento.titulo, evento.fecha));

    // Función para guardar eventos en Local Storage
    function guardarEventos() {
        localStorage.setItem('eventos', JSON.stringify(eventosGuardados));
    }

    function agregarEvento(titulo, fecha) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${titulo} - ${fecha}
            <button class="eliminar">Eliminar</button>
        `;
        
        listaEventos.appendChild(li);
    
        setTimeout(() => li.classList.add('show'), 10);
    
        li.querySelector('.eliminar').addEventListener('click', () => {
            li.classList.remove('show');
            setTimeout(() => {
                li.remove();
                eventosGuardados = eventosGuardados.filter(evento => evento.titulo !== titulo || evento.fecha !== fecha);
                guardarEventos();
            }, 300);
        });
    }
    


    // Manejador del formulario
    eventoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const fecha = document.getElementById('fecha').value;

        if (titulo && fecha) {
            eventosGuardados.push({ titulo, fecha });
            console.log(eventosGuardados);
            agregarEvento(titulo, fecha);
            guardarEventos();
            eventoForm.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});



document.getElementById('buscar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const eventos = document.querySelectorAll('#eventos li');
    
    eventos.forEach(evento => {
        const texto = evento.textContent.toLowerCase();
        evento.style.display = texto.includes(query) ? '' : 'none';
    });
});


