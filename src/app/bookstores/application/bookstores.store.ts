/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoresApi } from '../infrastructure/bookstores-api';
/** Holds store identity and loading state using Angular Signals. */
@Injectable({ providedIn: 'root' })
export class BookstoresStore {
 private readonly api = inject(BookstoresApi);
 private readonly items = signal<Bookstore[]>([]);
 readonly bookstores = this.items.asReadonly();
 readonly loading = signal(false);
 readonly error = signal(false);
 /** Refreshes stores and preserves an explicit error state for retry. */
 async load(): Promise<void> {
  this.loading.set(true); this.error.set(false);
  try { this.items.set(await firstValueFrom(this.api.getAll())); }
  catch { this.error.set(true); }
  finally { this.loading.set(false); }
 }
}
