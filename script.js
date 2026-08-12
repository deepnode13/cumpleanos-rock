document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const audio = document.getElementById('audio-rock');

  // Elementos de la banda
  const freddie = document.getElementById('freddie');
  const james = document.getElementById('james');
  const axel = document.getElementById('axel');
  const till = document.getElementById('till');
  const mensajeFinal = document.getElementById('mensaje-final');

  btnIniciar.addEventListener('click', () => {
    // 1. Ocultar la pantalla de inicio
    pantallaInicio.style.display = 'none';

    // 2. Reproducir el audio de Las Mañanitas
    audio.play().catch(error => console.log("Error al reproducir audio:", error));

    // 3. SECUENCIA DE TIEMPOS (en segundos)
    // Ajusta estos valores según los momentos clave de tu versión en MP3:

    // Entrada de Freddie Mercury (Ej. segundo 3)
    setTimeout(() => {
      freddie.classList.remove('oculto');
      freddie.classList.add('visible');
    }, 3000);

    // Entrada de James Hetfield / Metallica (Ej. segundo 8)
    setTimeout(() => {
      james.classList.remove('oculto');
      james.classList.add('visible');
    }, 8000);

    // Entrada de Axl Rose / Guns N' Roses (Ej. segundo 13)
    setTimeout(() => {
      axel.classList.remove('oculto');
      axel.classList.add('visible');
    }, 13000);

    // Entrada de Till Lindemann / Rammstein (Ej. segundo 18)
    setTimeout(() => {
      till.classList.remove('oculto');
      till.classList.add('visible');
    }, 18000);

    // Aparición del Cartel "Feliz Cumpleaños" en Alemán (Ej. segundo 25)
    setTimeout(() => {
      mensajeFinal.classList.remove('oculto');
      mensajeFinal.classList.add('visible');
    }, 25000);
  });
});
