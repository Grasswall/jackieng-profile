"use client";

import { useEffect, useRef } from "react";
import type { Vector3, Material, Mesh } from "three";

// Three.js molecular visualization — procedural protein structure (alpha helices + beta sheets)
// Loaded dynamically to avoid SSR issues. Runs at 60fps.

export function MoleculeHero({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let animId: number;
    let disposed = false;
    let cleanupFn: (() => void) | undefined;

    (async () => {
      const canvas = canvasRef.current;
      if (!canvas || disposed) return;

      const T = await import("three");

      const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 200);
      camera.position.set(0, 3, 28);
      camera.lookAt(0, 0, 0);

      scene.add(new T.AmbientLight(0xffffff, 0.6));
      const d1 = new T.DirectionalLight(0xffffff, 1.2);
      d1.position.set(8, 12, 10);
      scene.add(d1);
      const d2 = new T.DirectionalLight(0x14b8a6, 0.6);
      d2.position.set(-8, -4, -6);
      scene.add(d2);
      const rim = new T.DirectionalLight(0xb91c1c, 0.3);
      rim.position.set(0, -10, 0);
      scene.add(rim);

      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const helixMat = new T.MeshPhongMaterial({ color: darkMode ? 0x14b8a6 : 0x0a5f5f, shininess: 80, transparent: true, opacity: 0.92 });
      const sheetMat = new T.MeshPhongMaterial({ color: 0xd4a843, shininess: 60, transparent: true, opacity: 0.85 });
      const loopMat  = new T.MeshPhongMaterial({ color: 0xb91c1c, shininess: 40, transparent: true, opacity: 0.6 });

      const protein = new T.Group();

      // Tube helper — types come from the static "three" type import
      function makeTube(pts: Vector3[], r: number, mat: Material, radSeg = 8): Mesh {
        const curve = new T.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
        const geo   = new T.TubeGeometry(curve, pts.length * 6, r, radSeg, false);
        return new T.Mesh(geo, mat);
      }

      // Alpha helix 1
      const h1: Vector3[] = [];
      for (let i = 0; i <= 80; i++) {
        const t = (i / 80) * Math.PI * 4.2;
        h1.push(new T.Vector3(Math.cos(t) * 2.2, i * 0.14 - 5.6, Math.sin(t) * 2.2));
      }
      protein.add(makeTube(h1, 0.38, helixMat, 10));

      // Alpha helix 2
      const h2: Vector3[] = [];
      for (let i = 0; i <= 60; i++) {
        const t = (i / 60) * Math.PI * 3.6;
        h2.push(new T.Vector3(Math.cos(t) * 1.8 + 5, i * 0.15 - 4, Math.sin(t) * 1.8 - 3));
      }
      protein.add(makeTube(h2, 0.34, helixMat, 10));

      // Beta sheet strands
      for (let s = 0; s < 4; s++) {
        const strand: Vector3[] = [];
        for (let i = 0; i <= 20; i++) {
          strand.push(new T.Vector3((i / 20) * 8 - 6, -3 + Math.sin(i * 0.7) * 0.2, s * 1.3 - 2));
        }
        protein.add(makeTube(strand, 0.22, sheetMat, 8));
      }

      // Connecting loop
      protein.add(makeTube([
        new T.Vector3(2.2, 0.5,  2.2),
        new T.Vector3(4,   1.5,  0),
        new T.Vector3(6,   0.5, -2),
        new T.Vector3(5,  -1,   -3),
        new T.Vector3(2,  -3,   -2),
      ], 0.15, loopMat, 6));

      // Backbone nodes
      const nodeMat = new T.MeshPhongMaterial({ color: darkMode ? 0x5eead4 : 0x0d9488, shininess: 100, transparent: true, opacity: 0.75 });
      const nodeGeo = new T.SphereGeometry(0.22, 12, 12);
      for (const [x, y, z] of [[2.2,-5.6,0],[-2.2,-2.5,0],[2.2,0.5,2.2],[5,4,-2],[-1,2,-1]]) {
        const n = new T.Mesh(nodeGeo, nodeMat);
        n.position.set(x, y, z);
        protein.add(n);
      }

      scene.add(protein);
      protein.rotation.x = 0.15;

      function onResize() {
        if (!canvas) return;
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
      }
      window.addEventListener("resize", onResize);

      const clock = new T.Clock();
      function animate() {
        if (disposed) return;
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        protein.rotation.y = elapsed * 0.18;
        protein.position.y = Math.sin(elapsed * 0.4) * 0.3;
        renderer.render(scene, camera);
      }
      animate();

      cleanupFn = () => {
        disposed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanupFn?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}
