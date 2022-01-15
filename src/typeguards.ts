export const isDefined = <T extends unknown>(
  maybe: T | undefined | null,
): maybe is T => maybe != null;
