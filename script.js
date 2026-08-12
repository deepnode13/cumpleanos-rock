document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const musica = document.getElementById('musica');
  const corredora = document.getElementById('corredora');
  const pista = document.getElementById('pista');
  const meta = document.getElementById('meta');
  const cartelGradas = document.getElementById('cartel-gradas');
  const mensajeFinal = document.getElementById('mensaje-final');

  let duracionCancion = 90; // Duración por defecto (1 min 30 seg)

  btnIniciar.addEventListener('click', () => {
    // 1. Ocultar pantalla de bienvenida
    pantallaInicio.classList.add('oculto');

    // 2. Intentar reproducir audio y detectar su duración real
    musica.play().then(() => {
      if (musica.duration && !isNaN(musica.duration)) {
        duracionCancion = musica.duration;
      }
    }).catch(err => {
      console.warn("No se pudo reproducir el audio de audio/happyrock.mp3. Revisa la ruta.", err);
    });

    // 3. Activar animación de la corredora y la pista
    pista.classList.add('movimiento');
    corredora.classList.add('animar');
    cartelGradas.classList.remove('oculto');

    const tiempoInicio = Date.now();

    // 4. Bucle principal de movimiento
    const intervalo = setInterval(() => {
      const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
      const progreso = Math.min(tiempoTranscurrido / duracionCancion, 1);

      // Desplazamiento progresivo hacia adelante
      const posicionX = 5 + (progreso * 63);
      corredora.style.left = `${posicionX}%`;

      // Mostrar arco de meta 10 segundos antes del final
      if (tiempoTranscurrido >= (duracionCancion - 10)) {
        meta.classList.remove('oculto');
      }

      // Llegada a la meta
      if (progreso >= 1) {
        clearInterval(intervalo);

        // Detener animación de carrera
        pista.classList.remove('movimiento');
        corredora.classList.remove('animar');
        corredora.style.left = '70%';

        // Mostrar cartel final
        mensajeFinal.classList.remove('oculto');
      }
    }, 100);
  });
});
