/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
/** Persisted JSON-server batch response, including generated identity. */
export interface BookStockResource {
 id: number; bookstoreId: number; bookKey: string; bookTitle: string;
 authorName: string; copies: number; receivedAt: string;
}
/** POST request intentionally excludes the server-generated identifier. */
export type ReceiveBooksRequest = Omit<BookStockResource, 'id'>;
/** Response contract for a completed receipt. */
export type ReceiveBooksResponse = BookStockResource;
