import * as THREE from "three";
import React, { useRef, useState } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import glsl from "glslify";
import { gsap } from "gsap";

// Assets
import faceOne from "../assets/1.jpg";
import faceTwo from "../assets/2.jpg";

const TransitionShaderMaterial = shaderMaterial(
  // Uniform
  {
    dispFactor: 0,
    uTexture1: new THREE.Texture(),
    uTexture2: new THREE.Texture(),
  },

  // Vertex Shader
  glsl`
 
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,

  // Fragment Shader
  glsl`
 
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float dispFactor;
  varying vec2 vUv;

  mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return	mat2(c, -s, s, c);
  }
  
  void main() {
    vec2 uvDivided = fract(vUv*vec2(30.,1.));
    vec2 distortedPosition1 = vUv + rotate(3.14)*uvDivided*vec2(dispFactor*vUv.x/4., 0. ) * 0.5;
    vec2 distortedPosition2 = vUv + rotate(3.14)*uvDivided*vec2((1.- dispFactor)*vUv.x/4., 0. ) * 0.5;

    vec4 _face1 = texture2D(uTexture1, distortedPosition1);
    vec4 _face2 = texture2D(uTexture2, distortedPosition2);
    
    gl_FragColor = mix(_face1, _face2, dispFactor);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }
  `
);

extend({ TransitionShaderMaterial });

const Scene = () => {
  const transitionShaderMaterialRef = useRef();
  const [face1, face2] = useTexture([faceOne, faceTwo]);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    gsap.to(transitionShaderMaterialRef.current, {
      dispFactor: hovered ? 0 : 1,
      duration: 1,
      onStart: () => {
        transitionShaderMaterialRef.current.uTexture1 = face1;
      },
    });
  });

  return (
    <mesh
      onPointerMove={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <planeGeometry args={[1, 1.5, 16, 16]} />
      <transitionShaderMaterial
        ref={transitionShaderMaterialRef}
        uTexture1={face1}
        uTexture1-encoding={THREE.sRGBEncoding}
        uTexture2={face2}
        toneMapped={false}
      />
    </mesh>
  );
};

export default Scene;
