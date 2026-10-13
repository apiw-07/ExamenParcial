/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookAssembler } from './book-assembler';
import { SubjectResponse } from './subject.response';
/** Fetches works for an Open Library subject through HttpClient. */
@Injectable({ providedIn: 'root' })
export class CatalogApi {
 private readonly http = inject(HttpClient);
 private readonly assembler = new BookAssembler();
 getBooks(specialty: string) {
  const url = environment.catalogApiBaseUrl + environment.subjectsPath + '/' + encodeURIComponent(specialty) + '.json';
  return this.http.get<SubjectResponse>(url, { params: { limit: environment.catalogLimit } })
   .pipe(map(r => (r.works ?? []).map(book => this.assembler.toEntity(book))));
 }
}
