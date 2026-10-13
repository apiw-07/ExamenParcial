/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Component, computed, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { BookstoresStore } from '../../../application/bookstores.store';
import { InventoryStore } from '../../../../inventory/application/inventory.store';
import { summarizeInventory } from '../../../domain/model/store-inventory';
import { BookstoreSummary } from '../../components/bookstore-summary/bookstore-summary';
/** Loads store and batch data on entry and derives reactive inventory summaries. */
@Component({ selector: 'app-bookstore-overview', standalone: true,
 imports: [MatGridListModule, MatButtonModule, MatProgressSpinnerModule, RouterLink, TranslatePipe, BookstoreSummary],
 templateUrl: './bookstore-overview.html', styleUrl: './bookstore-overview.css' })
export class BookstoreOverview {
 readonly stores = inject(BookstoresStore);
 readonly inventory = inject(InventoryStore);
 readonly narrow = toSignal(inject(BreakpointObserver).observe('(max-width: 1050px)').pipe(map(r => r.matches)), { initialValue: false });
 readonly summaries = computed(() => this.stores.bookstores().map(s => summarizeInventory(s, this.inventory.stocks())));
 readonly loading = computed(() => this.stores.loading() || this.inventory.loading());
 readonly failed = computed(() => this.stores.error() || this.inventory.error());
 readonly rowHeight = computed(() => {
  const maxTitles = Math.max(0, ...this.summaries().map(s => s.titles.length));
  const longest = Math.max(0, ...this.summaries().flatMap(s => s.titles.map(t => t.bookTitle.length)));
  return 245 + Math.max(1, maxTitles) * (longest > 45 ? 85 : 58);
 });
 constructor() { void this.refresh(); }
 /** Refreshes both resources together; the error UI avoids presenting stale success. */
 async refresh(): Promise<void> { await Promise.all([this.stores.load(), this.inventory.load()]); }
}
