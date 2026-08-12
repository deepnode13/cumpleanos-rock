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
    // Importante: El archivo debe estar en audio/happyrock.mp3
    musica.play().then(() => {
      if (musica.duration && !isNaN(musica.duration)) {
        duracionCancion = musica.duration;
      }
      console.log("Audio reproduciéndose. Duración:", duracionCancion);
    }).catch(err => {
      console.warn("No se pudo reproducir el audio automáticamente. Usando tiempo estimado. Revisa la ruta audio/happyrock.mp3", err);
      // Fallback: Si no hay audio, la animación dura 95s igual.
    });

    // 3. Activar estado de movimiento visual de la pista y corredora
    pista.classList.add('movimiento');
    corredora.classList.add('animar');
    // El cartel ya es visible por defecto en el HTML modificado

    const tiempoInicio = Date.now();

    // Tiempo total de carrera activa = Duración total de la canción menos 10 segundos
    const tiempoMeta = Math.max(duracionCancion - 10, 5); // Fallback minimo 5s

    const intervalo = setInterval(() => {
      const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
      // Progreso basado en el tiempo total de carrera (hasta T-10s)
      const progreso = Math.min(tiempoTranscurrido / tiempoMeta, 1);

      // Avance progresivo de la corredora a lo largo de la pista (de 5% a 70%)
      const posicionX = 5 + (progreso * 65);
      corredora.style.left = `${posicionX}%`;

      // DISPARO DE EVENTOS EXACTAMENTE 10 SEGUNDOS ANTES DEL FINAL DE LA CANCIÓN
      if (tiempoTranscurrido >= tiempoMeta && !eventoFinalEjecutado) {
        eventoFinalEjecutado = true;
        clearInterval(intervalo); // Detiene el bucle de movimiento horizontal

        console.log("Hito T-10s alcanzado. Iniciando final.");

        // A. Detener animación física de carrera (piernas/brazos) y movimiento de pista
        pista.classList.remove('movimiento');
        corredora.classList.remove('animar');
        corredora.style.left = '70%'; // Asegura posición final frente a la meta

        // B. Mostrar el arco de meta y ocultar el cartel de felicitación de gradas
        meta.classList.remove('oculto');
        if(cartelGradas) cartelGradas.style.display = 'none';

        // C. Activar show de fuegos y luces intensas de concierto
        if(fuegoEscenario) fuegoEscenario.classList.remove('oculto');
        if(lucesEscenario) lucesEscenario.classList.add('fiesta-rock');

        // D. Lanza explosión masiva de confeti en toda la pantalla
        lanzarGranConfetiRock();

        // E. Mostrar cartel emergente final modal "Felices 16 años" en Alemán
        // Pequeño delay para que se vea la explosión primero
        setTimeout(() => {
            if(mensajeFinal) mensajeFinal.classList.remove('oculto');
        }, 500);
      }
    }, 100); // Chequeo cada 100ms para precisión
  });

  // Función de explosión masiva de confeti con Canvas-Confetti
  function lanzarGranConfetiRock() {
    if (typeof confetti !== 'function') {
        console.error("La librería canvas-confetti no está cargada.");
        return;
    }

    const duracionConfeti = 4000; // 4 segundos de ráfagas
    const fin = Date.now() + duracionConfeti;

    // 1. Explosión inicial fuerte central
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 }, // Cerca de la pista
      colors: ['#ff0055', '#ffcc00', '#00d4ff', '#ffffff', '#ff6600']
    });

    // 2. Ráfagas continuas tipo cañón desde los lados del escenario
    (function marcoConfeti() {
      // Cañón Izquierdo
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff0055', '#ffcc00', '#ffffff']
      });
      // Cañón Derecho
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#00d4ff', '#ff0055', '#ffffff']
      });

      // Continuar mientras no pase el tiempo definido
      if (Date.now() < fin) {
        requestAnimationFrame(marcoConfeti);
      }
    })();
  }
});
