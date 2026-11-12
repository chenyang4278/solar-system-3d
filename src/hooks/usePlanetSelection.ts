import { useState, useCallback } from 'react';
import type { Planet } from '../types/planet';

interface UsePlanetSelectionReturn {
  /** Currently selected planet, or null if none selected */
  selectedPlanet: Planet | null;
  /** Secondary planet compared against the selected one, or null when not comparing */
  comparedPlanet: Planet | null;
  /** Select a planet and update state */
  selectPlanet: (planet: Planet) => void;
  /** Deselect the current planet (also ends any comparison) */
  deselectPlanet: () => void;
  /** Compare the selected planet with another one. Ignored if nothing is selected or it is the same planet. */
  compareWith: (planet: Planet) => void;
  /** End the comparison, keeping the selected planet */
  clearComparison: () => void;
}

interface SelectionState {
  selected: Planet | null;
  compared: Planet | null;
}

const EMPTY_SELECTION: SelectionState = { selected: null, compared: null };

/**
 * Hook for managing planet selection state globally.
 *
 * Both slots live in one state object so the invariants are enforced atomically:
 * - `compared` is only set while `selected` is set
 * - `compared` is never the same planet as `selected`
 * @returns Object with selection state and selection/comparison functions
 */
export const usePlanetSelection = (): UsePlanetSelectionReturn => {
  const [selection, setSelection] = useState<SelectionState>(EMPTY_SELECTION);

  const selectPlanet = useCallback((planet: Planet) => {
    setSelection((prev) => ({
      selected: planet,
      compared: prev.compared?.id === planet.id ? null : prev.compared,
    }));
  }, []);

  const deselectPlanet = useCallback(() => {
    setSelection(EMPTY_SELECTION);
  }, []);

  const compareWith = useCallback((planet: Planet) => {
    setSelection((prev) =>
      !prev.selected || prev.selected.id === planet.id
        ? prev
        : { ...prev, compared: planet }
    );
  }, []);

  const clearComparison = useCallback(() => {
    setSelection((prev) => (prev.compared ? { ...prev, compared: null } : prev));
  }, []);

  return {
    selectedPlanet: selection.selected,
    comparedPlanet: selection.compared,
    selectPlanet,
    deselectPlanet,
    compareWith,
    clearComparison,
  };
};
