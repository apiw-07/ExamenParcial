/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Bookstore } from './bookstore.entity';
import { BookStock } from '../../../inventory/domain/model/book-stock.entity';
export interface TitleInventory { bookKey: string; bookTitle: string; copies: number; }
export interface StoreInventory { bookstore: Bookstore; titles: TitleInventory[]; availableTitles: number; replenishmentRequired: number; }
/** Aggregates only recorded titles by bookKey and counts each title once. */
export function summarizeInventory(bookstore: Bookstore, stocks: readonly BookStock[]): StoreInventory {
 const grouped = new Map<string, TitleInventory>();
 for (const stock of stocks) {
  if (stock.bookstoreId !== bookstore.id) continue;
  const title = grouped.get(stock.bookKey);
  if (title) title.copies += stock.copies;
  else grouped.set(stock.bookKey, { bookKey: stock.bookKey, bookTitle: stock.bookTitle, copies: stock.copies });
 }
 const titles = [...grouped.values()].sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
 return { bookstore, titles, availableTitles: titles.length,
 replenishmentRequired: titles.filter(t => t.copies < bookstore.minimumCopies).length };
}
