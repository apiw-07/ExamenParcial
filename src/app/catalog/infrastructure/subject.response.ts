/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
/** External API resource naming is preserved only in transport contracts. */
export interface BookResource {
 key: string; title: string; authors?: { name?: string }[];
 first_publish_year?: number; cover_id?: number;
}
export interface SubjectResponse { works: BookResource[]; }
