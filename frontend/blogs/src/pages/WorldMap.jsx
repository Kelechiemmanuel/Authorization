import Globe from "react-globe.gl";
import { useEffect, useRef, useState } from "react";

const WorldMap = () => {
  const globeEl = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();

      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;

      globeEl.current.pointOfView({ altitude: 2.2 }, 2000);

      setReady(true);
    }
  }, []);

  const points = [
    { lat: 9.082, lng: 8.6753, size: 0.4, color: "#ff4d4d" },
    { lat: 51.5072, lng: -0.1276, size: 0.4, color: "#4da6ff" },
    { lat: 40.7128, lng: -74.006, size: 0.4, color: "#00ff99" },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* 🌍 GLOBE */}
      <div className="absolute inset-0 -z-10">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"

          pointsData={points}
          pointAltitude="size"
          pointColor="color"
          pointRadius={0.6}

          showAtmosphere={true}
          atmosphereColor="#4da6ff"
          atmosphereAltitude={0.25}
        />
      </div>

      {/* 🌫️ GRADIENT OVERLAY (better than flat black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* ✨ GLOW EFFECT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      {/* 📄 CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Explore Stories Worldwide
        </h1>

        <p className="mt-4 text-base md:text-xl text-gray-300 max-w-xl">
          A living map of global stories, insights, and connections.
        </p>

        {/* CTA */}
        <button className="mt-8 px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition">
          Discover More
        </button>

      </div>
    </section>
  );
};

export default WorldMap;