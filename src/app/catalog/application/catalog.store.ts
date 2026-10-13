/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { inject, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../domain/model/book.entity';
import { CatalogApi } from '../infrastructure/catalog-api';
/** Loads catalog results and cancels stale specialty requests. */
@Injectable({ providedIn: 'root' })
export class CatalogStore {
 private readonly api = inject(CatalogApi);
 private request?: Subscription;
 private readonly items = signal<Book[]>([]);
 readonly books = this.items.asReadonly();
 readonly loading = signal(false);
 readonly error = signal(false);
 /** Clears the previous selection and ensures late responses cannot overwrite it. */
 load(specialty: string): void {
  this.clear();
  if (!specialty) return;
  this.loading.set(true);
  this.request = this.api.getBooks(specialty).subscribe({
   next: books => { this.items.set(books); this.loading.set(false); },
   error: () => { this.error.set(true); this.loading.set(false); }
  });
 }
 clear(): void { this.request?.unsubscribe(); this.items.set([]); this.loading.set(false); this.error.set(false); }
}
