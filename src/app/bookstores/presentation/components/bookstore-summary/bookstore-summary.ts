/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '@ngx-translate/core';
import { StoreInventory } from '../../../domain/model/store-inventory';
/** Shows one store's aggregated inventory and distinct-title indicators. */
@Component({ selector: 'app-bookstore-summary', standalone: true,
 imports: [MatCardModule, MatChipsModule, TranslatePipe], templateUrl: './bookstore-summary.html', styleUrl: './bookstore-summary.css' })
export class BookstoreSummary { readonly summary = input.required<StoreInventory>(); }
