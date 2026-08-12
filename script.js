document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const musica = document.getElementById('musica');
  const corredora = document.getElementById('corredora');
  const pista = document.getElementById('pista');
  const meta = document.getElementById('meta');
  const cartelGradas = document.getElementById('cartel-gradas');
  const mensajeFinal = document.getElementById('mensaje-final');
  const lucesEscenario = document.getElementById('luces-escenario');
  const fuegoEscenario = document.getElementById('fuego-escenario');

  let duracionCancion = 95; // Duración de respaldo (1 min 35 seg)
  let eventoFinalEjecutado = false;

  btnIniciar.addEventListener('click', () => {
    // 1. Ocultar pantalla de inicio
    pantallaInicio.classList.add('oculto');

    // 2. Intentar reproducir audio y obtener duración real
    musica.play().then(() => {
      if (musica.duration && !isNaN(musica.duration)) {
        duracionCancion = musica.duration;
      }
    }).catch(err => {
      console.warn("No se pudo reproducir el audio. Usando tiempo estimado.", err);
    });

    // 3. Activar estado de movimiento e iniciar la carrera
    pista.classList.add('movimiento');
    corredora.classList.add('animar');
    cartelGradas.style.display = 'block';

    const tiempoInicio = Date.now();

    // Tiempo total de carrera activa = Duración total de la canción menos 10 segundos
    const tiempoMeta = Math.max(duracionCancion - 10, 5);

    const intervalo = setInterval(() => {
      const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
      const progreso = Math.min(tiempoTranscurrido / tiempoMeta, 1);

      // Avance progresivo de la corredora a lo largo de la pista (de 5% a 70%)
      const posicionX = 5 + (progreso * 65);
      corredora.style.left = `${posicionX}%`;

      // DISPARO DE EVENTOS EXACTAMENTE 10 SEGUNDOS ANTES DEL FINAL DE LA CANCIÓN
      if (tiempoTranscurrido >= tiempoMeta && !eventoFinalEjecutado) {
        eventoFinalEjecutado = true;
        clearInterval(intervalo);

        // A. Detener animación de carrera de la corredora
        pista.classList.remove('movimiento');
        corredora.classList.remove('animar');
        corredora.style.left = '70%';

        // B. Mostrar la meta y ocultar el cartel de gradas
        meta.classList.remove('oculto');
        cartelGradas.style.display = 'none';

        // C. Activar show de fuego y luces de concierto
        fuegoEscenario.classList.remove('oculto');
        lucesEscenario.classList.add('fiesta-rock');

        // D. Mostrar cartel final de "Felices 16 años" en Alemán
        mensajeFinal.classList.remove('oculto');

        // E. Lanza explosión de confeti en toda la pantalla
        lanzarGranConfetiRock();
      }
    }, 100);
  });

  // Función de explosión masiva de confeti con Canvas-Confetti
  function lanzarGranConfetiRock() {
    if (typeof confetti !== 'function') return;

    const duracionConfeti = 4000;
    const fin = Date.now() + duracionConfeti;

    // Disparo inicial fuerte en el centro
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ffcc00', '#00d4ff', '#ffffff']
    });

    // Ráfagas continuas en ambos lados del escenario
    (function marcoConfeti() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0055', '#ffcc00', '#ffffff']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00d4ff', '#ff0055', '#ffffff']
      });

      if (Date.now() < fin) {
        requestAnimationFrame(marcoConfeti);
      }
    })();
  }
});
