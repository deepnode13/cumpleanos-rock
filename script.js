document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const audio = document.getElementById('audio-rock');

  // Elementos del HTML
  const freddie = document.getElementById('freddie');
  const hetfield = document.getElementById('hetfield');
  const axl = document.getElementById('axl');
  const till = document.getElementById('till');
  const mensajeFinal = document.getElementById('mensaje-final');

  btnIniciar.addEventListener('click', () => {
    // Ocultar pantalla inicial e iniciar música
    pantallaInicio.style.display = 'none';
    audio.play().catch(error => console.log("Error al reproducir audio:", error));

    // 1. Sale Freddie Mercury (a los 2 segundos)
    setTimeout(() => {
      freddie.classList.remove('oculto');
      freddie.classList.add('visible');
    }, 2000);

    // 2. Sale James Hetfield (a los 6 segundos)
    setTimeout(() => {
      hetfield.classList.remove('oculto');
      hetfield.classList.add('visible');
    }, 6000);

    // 3. Sale Axl Rose (a los 10 segundos)
    setTimeout(() => {
      axl.classList.remove('oculto');
      axl.classList.add('visible');
    }, 10000);

    // 4. Sale Till Lindemann (a los 14 segundos)
    setTimeout(() => {
      till.classList.remove('oculto');
      till.classList.add('visible');
    }, 14000);

    // 5. Cartel "Feliz Cumpleaños" en Alemán (a los 18 segundos)
    setTimeout(() => {
      mensajeFinal.classList.remove('oculto');
      mensajeFinal.classList.add('visible');
    }, 18000);
  });
});
