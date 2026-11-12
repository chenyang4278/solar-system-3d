import { memo } from 'react';
import type { Planet } from '../../types/planet';
import { TYPE_LABELS, TYPE_ICONS, PHYSICAL_STATS, MOTION_STATS } from '../../utils/planetStats';
import { ComparePicker } from './ComparePicker';
import './PlanetInfo.css';

interface PlanetInfoProps {
  /** Planet data to display, or null if no planet selected */
  planet: Planet | null;
  /** Planets offered in the "Compare with…" dropdown */
  planets: Planet[];
  /** Callback when a planet is chosen for comparison */
  onCompare: (planet: Planet) => void;
  /** Callback function when close button is clicked */
  onClose: () => void;
}

/**
 * PlanetInfo Component
 * Displays detailed information about a selected planet in a slide-out panel.
 */
export const PlanetInfo = memo(({ planet, planets, onCompare, onClose }: PlanetInfoProps) => {
  if (!planet) return null;

  const typeLabel = TYPE_LABELS[planet.type] ?? planet.type;
  const typeIcon = TYPE_ICONS[planet.type] ?? '🌑';

  return (
    <div className="planet-info-panel" role="complementary" aria-label={`Info: ${planet.name}`}>
      {/* Header */}
      <div className="planet-info-header" style={{ borderColor: planet.baseColor }}>
        <div className="planet-info-header__icon" aria-hidden="true">
          <img
            src={planet.texture}
            alt={planet.name}
            className="planet-info-header__img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement | null)?.removeAttribute('hidden');
            }}
          />
          <span hidden>{typeIcon}</span>
        </div>
        <div className="planet-info-header__text">
          <h2 className="planet-name" style={{ color: planet.baseColor, textShadow: `0 0 12px ${planet.baseColor}80` }}>
            {planet.name}
          </h2>
          <span className="planet-type-badge">{typeLabel}</span>
        </div>
        <button className="close-button" onClick={onClose} aria-label="Close planet info">
          ✕
        </button>
      </div>

      <div className="planet-info-content">
        {/* Start a comparison */}
        <ComparePicker
          label="Compare with"
          planets={planets}
          excludeId={planet.id}
          value=""
          onSelect={onCompare}
        />

        {/* Stats grid */}
        <section className="info-section">
          <h3 className="info-section__title">Physical Data</h3>
          <div className="info-grid">
            {PHYSICAL_STATS.map((stat) => (
              <div key={stat.key} className="info-item">
                <label>{stat.label}</label>
                <p>{stat.format(planet)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Motion data */}
        <section className="info-section">
          <h3 className="info-section__title">Motion</h3>
          <div className="info-grid">
            {MOTION_STATS.map((stat) => (
              <div key={stat.key} className="info-item">
                <label>{stat.label}</label>
                <p>{stat.format(planet)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Known moons */}
        {planet.satellites && planet.satellites.length > 0 && (
          <section className="info-section">
            <h3 className="info-section__title">Known Moons</h3>
            <div className="satellites-list">
              {planet.satellites.map((s) => (
                <span key={s.name} className="satellite-chip">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Fun fact */}
        <div className="fun-fact">
          <h3>Did you know?</h3>
          <p>{planet.funFact}</p>
        </div>
      </div>
    </div>
  );
});
