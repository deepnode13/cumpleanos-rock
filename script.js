document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const musica = document.getElementById('musica');
  const corredora = document.getElementById('corredora');
  const pista = document.getElementById('pista');
  const meta = document.getElementById('meta');
  const cartelGradas = document.getElementById('cartel-gradas');
  const mensajeFinal = document.getElementById('mensaje-final');

  let duracionCancion = 95; // 1 min 35 seg de la canción por defecto

  btnIniciar.addEventListener('click', () => {
    // 1. Ocultar pantalla de bienvenida
    pantallaInicio.classList.add('oculto');

    // 2. Reproducir audio e identificar duración real
    musica.play().then(() => {
      if (musica.duration && !isNaN(musica.duration)) {
        duracionCancion = musica.duration;
      }
    }).catch(err => {
      console.warn("Ruta 'audio/happyrock.mp3' no encontrada. La animación continuará.", err);
    });

    // 3. Activar animaciones de pista, corredora y cartel
    pista.classList.add('movimiento');
    corredora.classList.add('animar');
    cartelGradas.classList.remove('oculto');

    const tiempoInicio = Date.now();

    // 4. Bucle del trayecto
    const intervalo = setInterval(() => {
      const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
      const progreso = Math.min(tiempoTranscurrido / duracionCancion, 1);

      // Desplazamiento horizontal fluido
      const posicionX = 5 + (progreso * 63);
      corredora.style.left = `${posicionX}%`;

      // Mostrar la meta 10 segundos antes de finalizar
      if (tiempoTranscurrido >= (duracionCancion - 10)) {
        meta.classList.remove('oculto');
      }

      // Llegada a la meta
      if (progreso >= 1) {
        clearInterval(intervalo);

        pista.classList.remove('movimiento');
        corredora.classList.remove('animar');
        corredora.style.left = '70%';

        // Cartel final
        mensajeFinal.classList.remove('oculto');
      }
    }, 100);
  });
});
