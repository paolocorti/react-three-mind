import { ARAnchor, ARView } from "react-three-mind";
import React, { useState } from "react";

function Plane(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Slide({ activeIndex }) {
  console.log(activeIndex);
  const [scan, setScan] = useState(false);

  return (
    <ARView
      imageTargets="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.mind"
      filterMinCF={1}
      filterBeta={10000}
      missTolerance={0}
      warmupTolerance={0}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ARAnchor
        target={0}
        onAnchorFound={() => {
          console.log("onAnchorFound");
          setScan(false);
        }}
        onAnchorLost={() => {
          console.log("onAnchorLost");
          setScan(true);
        }}
      >
        <Plane />
      </ARAnchor>
    </ARView>
  );
}

function App() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <button
        style={{ position: "absolute", zIndex: 99999 }}
        onClick={() => setActive(active + 1)}
      >
        change index
      </button>
      <Slide activeIndex={active} />
    </div>
  );
}

export default App;
