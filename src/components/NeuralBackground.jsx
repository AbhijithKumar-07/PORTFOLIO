import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export default function NeuralBackground() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const sceneRef = useRef(null);
  const spritesRef = useRef([]);
  const lineMaterialRef = useRef(null);
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const fallbackTextureRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const particlesCount = 25;
    const sprites = [];
    const velocities = [];

    const createCircleTexture = (color) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(256, 256, 240, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const fallbackColor = isDark ? "#ffffff" : "#1e293b";
    const fallbackTexture = createCircleTexture(fallbackColor);

    const maxConnections = (particlesCount * (particlesCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineColor = isDark ? 0x3b82f6 : 0x6366f1;
    const lineOpacity = isDark ? 0.2 : 0.15;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
    });

    lineMaterialRef.current = lineMaterial;
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    textureLoaderRef.current.setCrossOrigin("anonymous");
    fallbackTextureRef.current = fallbackTexture;

    const spriteOpacity = isDark ? 0.08 : 0.12;

    for (let i = 0; i < particlesCount; i++) {
      const material = new THREE.SpriteMaterial({
        map: fallbackTexture,
        transparent: true,
        opacity: 0, // start subtle and fade in
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      sprite.scale.set(10, 10, 1);
      scene.add(sprite);
      sprites.push(sprite);
      spritesRef.current.push(sprite);

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      );
    }

    let mouse = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleResize);

    function animate() {
      requestAnimationFrame(animate);

      sprites.forEach((sprite, i) => {
        sprite.position.add(velocities[i]);
        ["x", "y", "z"].forEach((axis) => {
          if (Math.abs(sprite.position[axis]) > 50) {
            velocities[i][axis] *= -1;
          }
        });
      });

      let vertexPosition = 0;
      let connectedLines = 0;

      for (let i = 0; i < sprites.length; i++) {
        for (let j = i + 1; j < sprites.length; j++) {
          const dist = sprites[i].position.distanceTo(sprites[j].position);
          if (dist < 20) {
            linePositions[vertexPosition++] = sprites[i].position.x;
            linePositions[vertexPosition++] = sprites[i].position.y;
            linePositions[vertexPosition++] = sprites[i].position.z;
            linePositions[vertexPosition++] = sprites[j].position.x;
            linePositions[vertexPosition++] = sprites[j].position.y;
            linePositions[vertexPosition++] = sprites[j].position.z;
            connectedLines++;
          }
        }
      }

      lineGeometry.setDrawRange(0, connectedLines * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  useEffect(() => {
    const spriteOpacity = isDark ? 0.12 : 0.20;
    const iconColor = isDark ? "white" : "334155";
    const lineColor = isDark ? 0x3b82f6 : 0x6366f1;
    const lineOpacity = isDark ? 0.2 : 0.15;

    if (lineMaterialRef.current) {
      lineMaterialRef.current.color.setHex(lineColor);
      lineMaterialRef.current.opacity = lineOpacity;
    }

    const iconUrls = [
      `https://cdn.simpleicons.org/react/${iconColor}`,
      `https://cdn.simpleicons.org/nodedotjs/${iconColor}`,
      `https://cdn.simpleicons.org/python/${iconColor}`,
      `https://cdn.simpleicons.org/javascript/${iconColor}`,
      `https://cdn.simpleicons.org/tailwindcss/${iconColor}`,
      `https://cdn.simpleicons.org/html5/${iconColor}`,
      `https://cdn.simpleicons.org/docker/${iconColor}`,
      `https://cdn.simpleicons.org/mongodb/${iconColor}`,
      `https://cdn.simpleicons.org/git/${iconColor}`,
    ];

    Promise.all(
      iconUrls.map((url) =>
        new Promise((resolve) => {
          textureLoaderRef.current.load(
            url,
            (texture) => resolve(texture),
            undefined,
            () => resolve(fallbackTextureRef.current)
          );
        })
      )
    ).then((textures) => {
      if (!spritesRef.current.length) return;
      
      spritesRef.current.forEach((sprite, i) => {
        const texture = textures[i % textures.length];
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const oldMaterial = sprite.material;
        sprite.material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: spriteOpacity,
        });
        oldMaterial.dispose();
      });
    });
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'bg-black' : 'bg-slate-50'}`}
      style={{ zIndex: -50 }}
    />
  );
}