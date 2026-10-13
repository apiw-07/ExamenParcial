/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiEndpoint } from '../../shared/infrastructure/api-endpoint';
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoreResource } from './bookstore.resource';
import { BookstoreAssembler } from './bookstore-assembler';
/** Encapsulates bookstore provider configuration and its endpoint. */
@Injectable({ providedIn: 'root' })
export class BookstoresApi {
 private readonly endpoint = new ApiEndpoint<Bookstore, BookstoreResource>(inject(HttpClient),
 environment.inventoryApiBaseUrl + environment.bookstoresPath, new BookstoreAssembler());
 getAll() { return this.endpoint.getAll(); }
}
