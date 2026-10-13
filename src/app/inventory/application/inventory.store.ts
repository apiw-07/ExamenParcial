/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BookStock } from '../domain/model/book-stock.entity';
import { Bookstore } from '../../bookstores/domain/model/bookstore.entity';
import { Book } from '../../catalog/domain/model/book.entity';
import { InventoryApi } from '../infrastructure/inventory-api';
import { validCopies } from '../domain/model/receipt-policy';
/** Stores received stock and coordinates validated, awaited persistence. */
@Injectable({ providedIn: 'root' })
export class InventoryStore {
 private readonly api = inject(InventoryApi);
 private readonly items = signal<BookStock[]>([]);
 readonly stocks = this.items.asReadonly();
 readonly loading = signal(false);
 readonly saving = signal(false);
 readonly error = signal(false);
 async load(): Promise<void> {
  this.loading.set(true); this.error.set(false);
  try { this.items.set(await firstValueFrom(this.api.getAll())); }
  catch { this.error.set(true); }
  finally { this.loading.set(false); }
 }
 /** Validates business rules and updates state only with the saved response. */
 async receive(store: Bookstore, book: Book, copies: number): Promise<BookStock> {
  if (this.saving() || !validCopies(copies, store.minimumCopies)) throw new Error('Invalid receipt');
  this.saving.set(true); this.error.set(false);
  try {
   const saved = await firstValueFrom(this.api.receive({ bookstoreId: store.id, bookKey: book.key,
    bookTitle: book.title, authorName: book.authorName, copies, receivedAt: new Date().toISOString() }));
   this.items.update(items => [...items, saved]); return saved;
  } catch (error) { this.error.set(true); throw error; }
  finally { this.saving.set(false); }
 }
}
