document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btn-iniciar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const musica = document.getElementById('musica');
  const corredora = document.getElementById('corredora');
  const pista = document.querySelector('.pista');
  const meta = document.getElementById('meta');
  const mensajeCumple = document.getElementById('mensaje-cumple');
  const subtextoMeta = document.getElementById('subtexto-meta');

  const DURACION_CANCION_SEG = 95; // 1 min 35 seg

  btnIniciar.addEventListener('click', () => {
    // 1. Ocultar pantalla de inicio
    pantallaInicio.style.display = 'none';

    // 2. Intentar reproducir audio con fallback por si falla o no existe el archivo
    musica.play().then(() => {
      console.log("Audio reproducido con éxito.");
    }).catch(error => {
      console.warn("No se pudo reproducir el audio (revisa que cancion.mp3 exista en la carpeta):", error);
    });

    // 3. Forzar el inicio de las animaciones visuales
    pista.classList.add('corriendo');
    corredora.classList.add('animar-carrera');

    // Posición inicial visible de la corredora
    corredora.style.left = '5%';

    // 4. Mostrar el mensaje en alemán
    if (mensajeCumple) {
      mensajeCumple.classList.remove('oculto');
    }

    // 5. Iniciar secuencia de la carrera
    const tiempoInicio = Date.now();

    const intervaloAvance = setInterval(() => {
      const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
      const progreso = Math.min(tiempoTranscurrido / DURACION_CANCION_SEG, 1);

      // Avanza gradualmente del 5% al 68% de la pantalla
      const posicionX = 5 + (progreso * 63);
      corredora.style.left = `${posicionX}%`;

      // A los 10 segundos antes del final aparece el arco de meta ("ZIEL")
      if (tiempoTranscurrido >= (DURACION_CANCION_SEG - 10)) {
        if (meta) meta.classList.remove('oculto');
      }

      // Al cruzar la meta
      if (progreso >= 1) {
        clearInterval(intervaloAvance);
        
        // Detener carrera y actualizar mensaje final
        corredora.style.left = '70%';
        pista.classList.remove('corriendo');
        corredora.classList.remove('animar-carrera');
        if (subtextoMeta) {
          subtextoMeta.textContent = "🏆 Du hast das Ziel erreicht! 🏆";
        }
      }
    }, 100);
  });
});
