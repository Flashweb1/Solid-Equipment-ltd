"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const RED = "#c1271d";
const RED_DARK = "#9a1a12";
const STEEL = "#2b3a54";
const NAVY_DARK = "#131f36";
const GOLD = "#f59e0b";

function Excavator() {
  const machine = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const boom = useRef<THREE.Group>(null);
  const stick = useRef<THREE.Group>(null);
  const bucket = useRef<THREE.Group>(null);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useFrame((state, delta) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    if (machine.current) {
      if (!reduced) machine.current.rotation.y += delta * 0.1;
    }
    if (upper.current) {
      upper.current.rotation.y = Math.sin(t * 0.3) * 0.42;
    }
    if (boom.current) {
      boom.current.rotation.x = -0.42 + Math.sin(t * 0.5) * 0.1;
    }
    if (stick.current) {
      stick.current.rotation.x = 1.02 + Math.sin(t * 0.5 + 0.9) * 0.16;
    }
    if (bucket.current) {
      bucket.current.rotation.x = -0.32 + Math.sin(t * 0.5 + 1.7) * 0.2;
    }
  });

  const wheelZ = [-1.05, -0.525, 0, 0.525, 1.05];

  return (
    <group ref={machine} position={[0, 0.02, 0]}>
      {/* ------- undercarriage ------- */}
      {[-0.56, 0.56].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.95, 0.42, 2.75]} />
            <meshStandardMaterial color={NAVY_DARK} roughness={0.7} metalness={0.25} />
          </mesh>
          {wheelZ.map((z) => (
            <mesh key={z} position={[0, 0.22, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.17, 0.17, 1.0, 20]} />
              <meshStandardMaterial color="#0d1420" roughness={0.55} metalness={0.5} />
            </mesh>
          ))}
          {wheelZ.map((z) => (
            <mesh key={`hub-${z}`} position={[x > 0 ? 0.51 : -0.51, 0.22, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
              <meshStandardMaterial color={GOLD} roughness={0.35} metalness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* frame */}
      <mesh position={[0, 0.56, 0]} castShadow>
        <boxGeometry args={[1.15, 0.28, 2.1]} />
        <meshStandardMaterial color="#1f2c45" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* ------- rotating upper structure ------- */}
      <group ref={upper} position={[0, 0.72, 0]}>
        {/* turntable */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.25, 0.16, 1.5]} />
          <meshStandardMaterial color="#263753" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* main body */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[1.5, 0.72, 1.75]} />
          <meshStandardMaterial color={RED} roughness={0.38} metalness={0.35} />
        </mesh>

        {/* engine deck */}
        <mesh position={[0, 0.94, -0.45]} castShadow>
          <boxGeometry args={[1.2, 0.22, 0.7]} />
          <meshStandardMaterial color={RED_DARK} roughness={0.45} metalness={0.3} />
        </mesh>

        {/* counterweight */}
        <mesh position={[0, 0.38, -1.02]} castShadow>
          <boxGeometry args={[1.56, 0.6, 0.3]} />
          <meshStandardMaterial color={RED_DARK} roughness={0.5} metalness={0.3} />
        </mesh>

        {/* exhaust */}
        <mesh position={[0.48, 1.28, -0.55]}>
          <cylinderGeometry args={[0.045, 0.045, 0.38, 12]} />
          <meshStandardMaterial color="#1a2436" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* cab frame */}
        <mesh position={[0, 1.2, 0.6]} castShadow>
          <boxGeometry args={[0.82, 0.78, 0.86]} />
          <meshStandardMaterial color="#17223a" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* cab glass */}
        <mesh position={[0, 1.24, 1.03]}>
          <boxGeometry args={[0.7, 0.56, 0.04]} />
          <meshStandardMaterial
            color="#8ecdf2"
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.55}
          />
        </mesh>
        {/* gold cab roof line */}
        <mesh position={[0, 1.62, 0.6]}>
          <boxGeometry args={[0.86, 0.05, 0.9]} />
          <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.6} />
        </mesh>

        {/* hydraulic ram (decorative) */}
        <mesh position={[0, 0.92, 0.62]} rotation={[-0.5, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.0, 12]} />
          <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.7} />
        </mesh>

        {/* ------- working arm ------- */}
        <group ref={boom} position={[0, 0.78, 0.9]}>
          <mesh position={[0, 0, 0.72]} castShadow>
            <boxGeometry args={[0.27, 0.27, 1.5]} />
            <meshStandardMaterial color={RED} roughness={0.4} metalness={0.35} />
          </mesh>
          {/* boom tip joint */}
          <mesh position={[0, 0, 1.46]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
            <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
          </mesh>

          <group ref={stick} position={[0, 0, 1.5]}>
            <mesh position={[0, 0, 0.55]} castShadow>
              <boxGeometry args={[0.2, 0.2, 1.15]} />
              <meshStandardMaterial color={RED_DARK} roughness={0.45} metalness={0.35} />
            </mesh>

            <group ref={bucket} position={[0, 0, 1.12]}>
              <mesh position={[0, -0.05, 0.16]} castShadow>
                <boxGeometry args={[0.42, 0.32, 0.42]} />
                <meshStandardMaterial color={STEEL} roughness={0.45} metalness={0.55} />
              </mesh>
              {/* tooth bar */}
              <mesh position={[0, -0.24, 0.4]}>
                <boxGeometry args={[0.42, 0.08, 0.06]} />
                <meshStandardMaterial color="#223049" roughness={0.5} metalness={0.5} />
              </mesh>
              {[-0.15, -0.05, 0.05, 0.15].map((tx) => (
                <mesh key={tx} position={[tx, -0.33, 0.42]}>
                  <boxGeometry args={[0.045, 0.14, 0.05]} />
                  <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.7} />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function Ground() {
  return (
    <group>
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[3.7, 3.7, 0.12, 72]} />
        <meshStandardMaterial color="#101a2c" roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.7, 0.028, 16, 120]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={0.45}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.45, 0.012, 12, 100]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.14}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const px = state.pointer.x;
    const py = state.pointer.y;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 5.1 + px * 0.35, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2.7 + py * 0.25, 0.04);
    state.camera.lookAt(0, 0.95, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 30, position: [5.1, 2.7, 6.9] }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0.95, 0)}
      aria-label="Interactive 3D excavator"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 9, 5]} intensity={1.7} color="#fff2df" />
      <directionalLight position={[-6, 4, -4]} intensity={0.55} color={GOLD} />
      <pointLight position={[0, 3.5, 4.5]} intensity={0.4} color="#ffffff" />

      <Excavator />
      <Ground />
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.55}
        scale={8}
        blur={2.6}
        far={3.5}
        color="#020610"
      />
      <CameraRig />
    </Canvas>
  );
}
