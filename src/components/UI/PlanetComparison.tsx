import { memo } from "react";
import type { CSSProperties } from "react";
import type { Planet } from "../../types/planet";
import { TYPE_LABELS, PHYSICAL_STATS } from "../../utils/planetStats";
import { ComparePicker } from "./ComparePicker";
import "./PlanetInfo.css";
import "./PlanetComparison.css";

interface PlanetComparisonProps {
  /** Primary (camera-followed) planet */
  planet: Planet;
  /** Planet being compared against the primary */
  comparedPlanet: Planet;
  /** Planets offered in the dropdown */
  planets: Planet[];
  /** Called when the user picks a different planet to compare */
  onChangeCompared: (planet: Planet) => void;
  /** Ends the comparison and returns to the single-planet panel */
  onClose: () => void;
}

/** Column heading: thumbnail, name in the planet's colour and type badge. */
const PlanetColumnHeader = ({ planet }: { planet: Planet }) => (
  <th
    scope="col"
    className="compare-table__planet"
    style={{ "--planet-color": planet.baseColor } as CSSProperties}
  >
    <img
      src={planet.texture}
      alt=""
      className="compare-table__img"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
    <span className="compare-table__name">{planet.name}</span>
    <span className="planet-type-badge">
      {TYPE_LABELS[planet.type] ?? planet.type}
    </span>
  </th>
);

/**
 * PlanetComparison Component
 * Replaces PlanetInfo while a second planet is chosen, showing both planets'
 * physical data side by side. Reuses the PlanetInfo panel shell and styles.
 */
export const PlanetComparison = memo(
  ({ planet, comparedPlanet, planets, onChangeCompared, onClose }: PlanetComparisonProps) => (
    <div
      className="planet-info-panel planet-info-panel--compare"
      role="complementary"
      aria-label={`Comparison: ${planet.name} and ${comparedPlanet.name}`}
    >
      {/* Header */}
      <div className="planet-info-header">
        <div className="planet-info-header__text">
          <h2 className="planet-name">Compare Planets</h2>
        </div>
        <button className="close-button" onClick={onClose} aria-label="Close comparison">
          ✕
        </button>
      </div>

      <div className="planet-info-content">
        <ComparePicker
          label={`Compare ${planet.name} with`}
          planets={planets}
          excludeId={planet.id}
          value={comparedPlanet.id}
          onSelect={onChangeCompared}
        />

        <section className="info-section">
          <h3 className="info-section__title">Physical Data</h3>
          <table className="compare-table">
            <caption className="sr-only">
              Physical data of {planet.name} compared with {comparedPlanet.name}
            </caption>
            <thead>
              <tr>
                <td className="compare-table__corner" />
                <PlanetColumnHeader planet={planet} />
                <PlanetColumnHeader planet={comparedPlanet} />
              </tr>
            </thead>
            <tbody>
              {PHYSICAL_STATS.map((stat) => (
                <tr key={stat.key}>
                  <th scope="row" className="compare-table__label">
                    {stat.label}
                  </th>
                  <td className="compare-table__value">{stat.format(planet)}</td>
                  <td className="compare-table__value">{stat.format(comparedPlanet)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
);
