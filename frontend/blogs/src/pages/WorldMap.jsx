import Globe from "react-globe.gl";
import { useEffect, useRef } from "react";

const WorldMap = () => {
  const globeEl = useRef();

useEffect(() => {
  if (globeEl.current) {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.4;

    globeEl.current.pointOfView({ altitude: 1.5 }, 2000);
  }
}, []);

  const points = [
    { lat: 9.082, lng: 8.6753, size: 0.3, color: "red" },
    { lat: 51.5072, lng: -0.1276, size: 0.3, color: "blue" },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* 🌍 Globe Background */}
      <div className="absolute inset-0 -z-10">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={points}
          pointAltitude="size"
          pointColor="color"
          showAtmosphere={true}
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.2}
        />
      </div>

      {/* 🔳 Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 📄 Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-6xl font-bold">
          Explore Stories Worldwide
        </h1>

        <p className="mt-4 text-xl text-gray-200">
          Your blog starts here
        </p>
      </div>
    </section>
  );
};

export default WorldMap;