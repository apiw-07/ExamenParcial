/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
/** One received batch of copies; repeated book keys represent separate batches. */
export class BookStock {
 constructor(public readonly id: number, public readonly bookstoreId: number,
 public readonly bookKey: string, public readonly bookTitle: string,
 public readonly authorName: string, public readonly copies: number,
 public readonly receivedAt: string) {}
}
