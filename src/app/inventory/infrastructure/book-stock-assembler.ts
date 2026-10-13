/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { BookStock } from '../domain/model/book-stock.entity';
import { BookStockResource } from './book-stock.resource';
/** Maps inventory provider resources to immutable batch entities. */
export class BookStockAssembler {
 toEntity(r: BookStockResource): BookStock {
  return new BookStock(r.id, r.bookstoreId, r.bookKey, r.bookTitle, r.authorName, r.copies, r.receivedAt);
 }
}
