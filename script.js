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
    pantallaInicio.classList.add('oculto');

    // 2. Reproducir la canción
    musica.play().catch(error => {
      console.log("Error al reproducir audio:", error);
    });

    // 3. Iniciar animaciones de movimiento
    pista.classList.add('corriendo');
    corredora.classList.add('animar-carrera');

    // 4. Mostrar el mensaje en alemán durante la carrera
    setTimeout(() => {
      mensajeCumple.classList.remove('oculto');
    }, 1000);

    // 5. Iniciar avance de la corredora a través del tiempo de la canción
    const tiempoInicio = Date.now();

    const intervaloAvance = setInterval(() => {
      const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
      const progreso = Math.min(tiempoTranscurrido / DURACION_CANCION_SEG, 1);

      // Avanza gradualmente del 5% al 70% de la pantalla
      const posicionX = 5 + (progreso * 65);
      corredora.style.left = `${posicionX}%`;

      // A los 10 segundos antes del final aparece la meta ("ZIEL")
      if (tiempoTranscurrido >= (DURACION_CANCION_SEG - 10)) {
        meta.classList.remove('oculto');
      }

      // Al cruzar la meta al final de la canción
      if (progreso >= 1) {
        clearInterval(intervaloAvance);
        
        // Detener carrera y actualizar subtexto de meta en alemán
        corredora.style.left = '72%';
        pista.classList.remove('corriendo');
        corredora.classList.remove('animar-carrera');
        subtextoMeta.textContent = "🏆 Du hast das Ziel erreicht! 🏆";
      }
    }, 100);
  });
});
