import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";

import Twitter from "./components/Twitter";
import Header from "./components/Header";

import Scene from "./components/Scene";
import Footer from "./components/Footer";

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <h1>hover me</h1>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <Overlay />
      <a
        href="https://twitter.com/NowMoDesign/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: "absolute", bottom: 40, left: "4vw", width: 50 }}
      >
        <Twitter />
      </a>
      <Footer />
    </>
  );
}

export default App;
