import * as THREE from 'three';

export function sampleLogo(src, maxParticles) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // 1. INCREASED RESOLUTION FOR CRISP EDGES
      const SAMPLE_W = 800; 
      const scale = SAMPLE_W / img.naturalWidth;
      const SAMPLE_H = Math.round(img.naturalHeight * scale);

      const cvs = document.createElement('canvas');
      cvs.width = SAMPLE_W;
      cvs.height = SAMPLE_H;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H);

      const data = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
      const visible = [];

      for (let y = 0; y < SAMPLE_H; y++) {
        for (let x = 0; x < SAMPLE_W; x++) {
          const idx = (y * SAMPLE_W + x) * 4;
          if (data[idx + 3] > 30) {
            visible.push({
              x, y,
              r: data[idx] / 255,
              g: data[idx + 1] / 255,
              b: data[idx + 2] / 255,
            });
          }
        }
      }

      for (let i = visible.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [visible[i], visible[j]] = [visible[j], visible[i]];
      }
      const pts = visible.slice(0, maxParticles);

      const aspect = SAMPLE_W / SAMPLE_H;
      
      // 2. INCREASED SPAN FOR A LARGER LOGO
      const spanX = 14.0; 
      const spanY = spanX / aspect;

      const targets = new Float32Array(pts.length * 3);
      const colors = new Float32Array(pts.length * 3);

      pts.forEach((p, i) => {
        targets[i * 3] = ((p.x / SAMPLE_W) - 0.5) * spanX;
        // Shifted Y up by +3.0 to keep it in the top half since it's bigger now
        targets[i * 3 + 1] = -((p.y / SAMPLE_H) - 0.5) * spanY + 3.0; 
        targets[i * 3 + 2] = 0; 

        colors[i * 3] = p.r;
        colors[i * 3 + 1] = p.g;
        colors[i * 3 + 2] = p.b;
      });

      resolve({ targets, colors, count: pts.length });
    };

    img.onerror = () => resolve(null);
    img.src = src;
  });
}