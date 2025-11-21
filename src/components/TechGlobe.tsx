import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Technology data with colors
const techStack = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'Google', color: '#4285f4' },
  { name: 'LangChain', color: '#1c3c3c' },
  { name: 'TensorFlow', color: '#ff6f00' },
  { name: 'PyTorch', color: '#ee4c2c' },
  { name: 'Hugging Face', color: '#ffcc00' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Node.js', color: '#339933' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Django', color: '#092e20' },
  { name: 'Express', color: '#ffffff' },
  { name: 'GraphQL', color: '#e10098' },
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: 'Vue.js', color: '#4fc08d' },
  { name: 'Svelte', color: '#ff3e00' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Azure', color: '#0078d4' },
  { name: 'Google Cloud', color: '#4285f4' },
  { name: 'Angular', color: '#4285f4' },
  { name: 'GCP', color: '#4285f4' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Kubernetes', color: '#326ce5' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Supabase', color: '#3ecf8e' },
  { name: 'Pinecone', color: '#00d4ff' },
  { name: 'Chroma', color: '#ff6b6b' },
  { name: 'Spring Boot', color: '#6db33f' },
  { name: 'Struct', color: '#6db33f' },
  { name: 'Java', color: '#6db33f' },
  { name: 'Vibe', color: '#6db33f' },
  { name: 'Rollup', color: '#6db33f' },
  { name: 'Webpack', color: '#6db33f' },
  { name: 'Parcel', color: '#6db33f' },
  { name: 'Snowpack', color: '#6db33f' },
  { name: 'Netlify', color: '#6db33f' },
  { name: 'Firebase', color: '#6db33f' },
];

const aiSatellites = [
  { name: 'Anthropic', color: '#d4a574' },
  { name: 'LlamaIndex', color: '#8b5cf6' },
  { name: 'Vibe Coding', color: '#8b5cf6' },
  { name: 'Replicate', color: '#00ff88' },
  { name: 'Cursor', color: '#00ff88' },
  { name: 'Claude AI', color: '#10a37f' },
  { name: 'Windsurf AI', color: '#10a37f' },
  { name: 'Vercel', color: '#ffffff' },
];

// Wireframe Globe Component
function WireframeGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const innerGlobeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <>
      {/* Outer wireframe globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glowing globe */}
      <mesh ref={innerGlobeRef}>
        <sphereGeometry args={[4.1, 24, 24]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[3.5, 16, 16]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  );
}

// Orbiting Tech Item Component
interface OrbitingItemProps {
  name: string;
  color: string;
  orbitRadius: number;
  speed: number;
  angleOffset: number;
  tiltX: number;
  tiltY: number;
  isSatellite?: boolean;
}

function OrbitingItem({
  name,
  color,
  orbitRadius,
  speed,
  angleOffset,
  tiltX,
  tiltY,
  isSatellite = false,
}: OrbitingItemProps) {
  const itemRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (itemRef.current) {
      const t = state.clock.elapsedTime * speed + angleOffset;

      // Calculate position with chaotic orbit (different angles)
      const x = Math.cos(t) * orbitRadius * Math.cos(tiltX);
      const y = Math.sin(t * 1.2) * orbitRadius * Math.sin(tiltY) * 0.5;
      const z = Math.sin(t) * orbitRadius * Math.sin(tiltX);

      itemRef.current.position.set(x, y, z);

      // Make items always face camera
      itemRef.current.lookAt(0, 0, 0);
    }
  });

  const iconSize = isSatellite ? 48 : 40;

  return (
    <group ref={itemRef}>
      {/* Text label only */}
      <Text
        position={[0, 0, 0]}
        fontSize={isSatellite ? 0.6 : 0.48}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

// Starfield Background
function Starfield() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      {/* Starfield */}
      <Starfield />

      {/* Central Wireframe Globe */}
      <WireframeGlobe />

      {/* Tech Stack Items - Chaotic orbits around globe */}
      {techStack.map((tech, index) => {
        const orbitRadius = 6 + Math.random() * 3; // Random orbit distance
        const speed = 0.1 + Math.random() * 0.3; // Random speed
        const angleOffset = (Math.PI * 2 * index) / techStack.length;
        const tiltX = Math.random() * Math.PI; // Random tilt
        const tiltY = Math.random() * Math.PI;

        return (
          <OrbitingItem
            key={tech.name}
            name={tech.name}
            color={tech.color}
            orbitRadius={orbitRadius}
            speed={speed}
            angleOffset={angleOffset}
            tiltX={tiltX}
            tiltY={tiltY}
          />
        );
      })}

      {/* AI Satellites - Outer orbits with different speeds */}
      {aiSatellites.map((satellite, index) => {
        const orbitRadius = 11 + Math.random() * 4; // Larger orbits
        const speed = 0.05 + Math.random() * 0.2; // Different speeds
        const angleOffset = (Math.PI * 2 * index) / aiSatellites.length;
        const tiltX = Math.random() * Math.PI * 0.5;
        const tiltY = Math.random() * Math.PI * 0.5;

        return (
          <OrbitingItem
            key={satellite.name}
            name={satellite.name}
            color={satellite.color}
            orbitRadius={orbitRadius}
            speed={speed}
            angleOffset={angleOffset}
            tiltX={tiltX}
            tiltY={tiltY}
            isSatellite
          />
        );
      })}

      {/* Orbit Controls for user interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={50}
        zoomSpeed={1.5}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

// Main Component
export default function TechGlobe() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 animate-glow" />

      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Section Header */}
      <div className="relative z-10 pt-20 pb-10 text-center">
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-medium text-primary">Interactive 3D Visualization</span>
        </div> */}

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
          Tech Stack & AI Tools
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-4 animate-fade-in-up">
          Explore our cutting-edge technology ecosystem in an immersive 3D space
        </p>
      </div>

      {/* 3D Canvas */}
      <div
        className="relative w-full h-[400px] md:h-[500px]"
        onWheel={(e) => e.stopPropagation()}
      >
        <Canvas
          camera={{ position: [0, 0, 18], fov: 60 }}
          className="cursor-grab active:cursor-grabbing"
          onWheel={(e) => e.stopPropagation()}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Instructions */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 shadow-lg shadow-primary/10">
          <p className="text-slate-300 text-sm font-medium">
            🖱️ Drag to rotate • 🔍 Scroll to zoom • 🔄 Auto-rotating
          </p>
        </div>
      </div> */}
    </section>
  );
}
