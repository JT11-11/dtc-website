"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { feature } from "topojson-client";
import { geoCentroid, geoEquirectangular, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  CATEGORY_COLORS,
  categoryForStatus,
  NUMERIC_ID_BY_ALPHA2,
  type RestrictionRecord,
  type WorldTopology,
} from "@/lib/adci-restrictions";

type Marker = {
  record: RestrictionRecord;
  position: [number, number, number];
};

function createMapTexture(
  topology: WorldTopology,
  records: RestrictionRecord[],
) {
  const collection = feature(
    topology as never,
    (topology as { objects: { countries: never } }).objects.countries,
  ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
  const recordById = new Map(
    records.flatMap((record) => {
      const id = NUMERIC_ID_BY_ALPHA2[record.countryCode];
      return id ? [[id, record] as const] : [];
    }),
  );
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const projection = geoEquirectangular()
    .scale(canvas.width / (2 * Math.PI))
    .translate([canvas.width / 2, canvas.height / 2]);
  const path = geoPath(projection, context);

  context.fillStyle = "#d8e0dc";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  path({ type: "Sphere" });
  context.strokeStyle = "rgba(255,255,255,0.32)";
  context.lineWidth = 1;
  context.stroke();

  for (const country of collection.features) {
    const id = String(country.id ?? "").padStart(3, "0");
    const record = recordById.get(id);
    context.beginPath();
    path(country);
    context.fillStyle = record
      ? CATEGORY_COLORS[categoryForStatus(record.status)]
      : "#e8e6de";
    context.fill();
    context.strokeStyle = "#c2c8c3";
    context.lineWidth = 0.55;
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.offset.x = 0.5;
  texture.anisotropy = 8;
  return texture;
}

function globePosition(longitude: number, latitude: number): [number, number, number] {
  const lon = THREE.MathUtils.degToRad(longitude);
  const lat = THREE.MathUtils.degToRad(latitude);
  const radius = 1.012;
  return [
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon),
  ];
}

function GlobeMarkers({
  markers,
  selectedCode,
  onSelect,
}: {
  markers: Marker[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
}) {
  return (
    <group>
      {markers.map(({ record, position }) => {
        const selected = record.countryCode === selectedCode;
        const normal = new THREE.Vector3(...position).normalize();
        const ringRotation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          normal,
        );
        return (
          <mesh
            key={record.countryCode}
            position={position}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "";
            }}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(record.countryCode);
            }}
          >
            <sphereGeometry args={[selected ? 0.021 : 0.014, 12, 12]} />
            <meshBasicMaterial
              color={CATEGORY_COLORS[categoryForStatus(record.status)]}
              depthTest={false}
              toneMapped={false}
            />
            {selected && (
              <mesh
                position={normal.clone().multiplyScalar(0.018)}
                quaternion={ringRotation}
              >
                <torusGeometry args={[0.032, 0.004, 8, 24]} />
                <meshBasicMaterial color="#ffffff" depthTest={false} />
              </mesh>
            )}
          </mesh>
        );
      })}
    </group>
  );
}

function GlobeContents({
  texture,
  markers,
  selectedCode,
  onSelect,
}: {
  texture: THREE.Texture | null;
  markers: Marker[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
}) {
  const globeRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(new THREE.Quaternion());

  useEffect(() => {
    const selectedMarker = markers.find(
      (marker) => marker.record.countryCode === selectedCode,
    );
    if (selectedMarker) {
      targetRotation.current.setFromUnitVectors(
        new THREE.Vector3(...selectedMarker.position).normalize(),
        new THREE.Vector3(0, 0, 1),
      );
    }
  }, [markers, selectedCode]);

  useFrame((_, delta) => {
    if (!globeRef.current) return;
    globeRef.current.quaternion.slerp(
      targetRotation.current,
      1 - Math.exp(-delta * 3.5),
    );
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight intensity={2.2} position={[-3, 4, 5]} />
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          <meshStandardMaterial
            color="#ffffff"
            map={texture ?? undefined}
            roughness={0.96}
            metalness={0}
          />
        </mesh>
        <GlobeMarkers
          markers={markers}
          onSelect={onSelect}
          selectedCode={selectedCode}
        />
      </group>
    </>
  );
}

export default function RestrictionGlobeScene({
  topology,
  records,
  selectedCode,
  onSelect,
}: {
  topology: WorldTopology;
  records: RestrictionRecord[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
}) {
  const texture = useMemo(() => createMapTexture(topology, records), [topology, records]);
  const markers = useMemo(() => {
    const collection = feature(
      topology as never,
      (topology as { objects: { countries: never } }).objects.countries,
    ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
    const countryById = new Map(
      collection.features.map((country) => [
        String(country.id ?? "").padStart(3, "0"),
        country as Feature<Geometry, GeoJsonProperties>,
      ]),
    );

    return records.flatMap((record) => {
      const id = NUMERIC_ID_BY_ALPHA2[record.countryCode];
      const country = id ? countryById.get(id) : undefined;
      if (!country) return [];
      const [longitude, latitude] = geoCentroid(country);
      return [{ record, position: globePosition(longitude, latitude) }];
    });
  }, [records, topology]);

  return (
    <Canvas
      aria-label="Interactive 3D globe of social media age restriction policies"
      camera={{ position: [0, 0, 2.75], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
    >
      <GlobeContents
        markers={markers}
        onSelect={onSelect}
        selectedCode={selectedCode}
        texture={texture}
      />
      <OrbitControls
        enablePan={false}
        maxDistance={4.5}
        minDistance={2.05}
        rotateSpeed={0.55}
      />
    </Canvas>
  );
}