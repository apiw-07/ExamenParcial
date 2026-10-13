/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiEndpoint } from '../../shared/infrastructure/api-endpoint';
import { BookStock } from '../domain/model/book-stock.entity';
import { BookStockResource, ReceiveBooksRequest, ReceiveBooksResponse } from './book-stock.resource';
import { BookStockAssembler } from './book-stock-assembler';
/** Exposes inventory queries and the receipt command endpoint. */
@Injectable({ providedIn: 'root' })
export class InventoryApi {
 private readonly http = inject(HttpClient);
 private readonly url = environment.inventoryApiBaseUrl + environment.bookStocksPath;
 private readonly assembler = new BookStockAssembler();
 private readonly endpoint = new ApiEndpoint<BookStock, BookStockResource>(this.http, this.url, this.assembler);
 getAll() { return this.endpoint.getAll(); }
 /** Posts one batch without retrying non-idempotent writes. */
 receive(request: ReceiveBooksRequest) {
  return this.http.post<ReceiveBooksResponse>(this.url, request).pipe(map(r => this.assembler.toEntity(r)));
 }
}
