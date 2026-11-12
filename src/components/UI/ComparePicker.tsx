import { memo, useId } from "react";
import type { Planet } from "../../types/planet";

interface ComparePickerProps {
  /** Visible label for the dropdown */
  label: string;
  /** Planets offered as options */
  planets: Planet[];
  /** Planet excluded from the options (the primary selection) */
  excludeId: string;
  /** Id of the currently compared planet, or "" to show the placeholder */
  value: string;
  /** Called with the chosen planet */
  onSelect: (planet: Planet) => void;
}

/**
 * Native dropdown for choosing the planet to compare against.
 * Shared by PlanetInfo (start a comparison) and PlanetComparison (change it).
 */
export const ComparePicker = memo(
  ({ label, planets, excludeId, value, onSelect }: ComparePickerProps) => {
    const id = useId();

    return (
      <div className="compare-picker">
        <label className="compare-picker__label" htmlFor={id}>
          {label}
        </label>
        <select
          id={id}
          className="compare-picker__select"
          value={value}
          onChange={(e) => {
            const planet = planets.find((p) => p.id === e.target.value);
            if (planet) onSelect(planet);
          }}
        >
          {value === "" && (
            <option value="" disabled>
              Choose a planet…
            </option>
          )}
          {planets
            .filter((p) => p.id !== excludeId)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
      </div>
    );
  }
);
