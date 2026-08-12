document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const audio = document.getElementById('audio-rock');

  // Integrantes en SVG
  const freddie = document.getElementById('freddie');
  const hetfield = document.getElementById('hetfield');
  const axl = document.getElementById('axl');
  const till = document.getElementById('till');
  const mensajeFinal = document.getElementById('mensaje-final');

  btnIniciar.addEventListener('click', () => {
    pantallaInicio.style.display = 'none';

    audio.play().catch(error => console.log("Error al reproducir audio:", error));

    // 1. Entra Baterista (Till - Rammstein) a los 2 segundos
    setTimeout(() => {
      till.classList.remove('oculto');
      till.classList.add('visible');
    }, 2000);

    // 2. Entra Guitarrista Rítmico (James Hetfield - Metallica) a los 6 segundos
    setTimeout(() => {
      hetfield.classList.remove('oculto');
      hetfield.classList.add('visible');
    }, 6000);

    // 3. Entra Guitarrista Solista (Slash / Axl - Guns N' Roses) a los 10 segundos
    setTimeout(() => {
      axl.classList.remove('oculto');
      axl.classList.add('visible');
    }, 10000);

    // 4. Entra Cantante (Freddie Mercury) en el centro a los 14 segundos
    setTimeout(() => {
      freddie.classList.remove('oculto');
      freddie.classList.add('visible');
    }, 14000);

    // 5. Mensaje en Alemán en el clímax (18 segundos)
    setTimeout(() => {
      mensajeFinal.classList.remove('oculto');
      mensajeFinal.classList.add('visible');
    }, 18000);
  });
});
