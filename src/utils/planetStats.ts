import type { Planet } from "../types/planet";

/** A single labelled statistic derived from planet data. */
export interface PlanetStat {
  key: string;
  label: string;
  format: (planet: Planet) => string;
}

export const TYPE_LABELS: Record<Planet["type"], string> = {
  terrestrial: "Terrestrial",
  "gas-giant": "Gas Giant",
  "ice-giant": "Ice Giant",
  dwarf: "Dwarf Planet",
  star: "Star",
};

export const TYPE_ICONS: Record<Planet["type"], string> = {
  terrestrial: "🌍",
  "gas-giant": "🪐",
  "ice-giant": "🔵",
  dwarf: "⚫",
  star: "⭐",
};

/** Real-world physical data — shown in PlanetInfo and PlanetComparison. */
export const PHYSICAL_STATS: PlanetStat[] = [
  {
    key: "diameter",
    label: "Diameter",
    format: (p) => `${p.diameter.toLocaleString()} km`,
  },
  {
    key: "temperature",
    label: "Temperature",
    format: (p) => `${p.temperature} K`,
  },
  {
    key: "distanceFromSun",
    label: "Distance from Sun",
    format: (p) => `${(p.distanceFromSun / 1e6).toFixed(1)} M km`,
  },
  {
    key: "satellites",
    label: "Satellites",
    format: (p) => String(p.numberOfSatellites),
  },
];

/** Simulation motion values — shown in PlanetInfo only. */
export const MOTION_STATS: PlanetStat[] = [
  {
    key: "rotationSpeed",
    label: "Rotation Speed",
    format: (p) => `${p.rotationSpeed.toFixed(4)} rad/s`,
  },
  {
    key: "orbitSpeed",
    label: "Orbit Speed",
    format: (p) => p.orbitSpeed.toFixed(4),
  },
];
