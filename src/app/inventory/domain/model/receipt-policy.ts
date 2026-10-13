/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
/** Validates integer copy counts against the selected store threshold. */
export function validCopies(copies: number, minimumCopies: number): boolean {
 return Number.isInteger(copies) && copies > 0 && copies <= 2 * minimumCopies;
}
