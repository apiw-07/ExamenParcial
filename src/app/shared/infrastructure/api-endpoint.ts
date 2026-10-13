/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
/** Maps transport resources to domain entities at a single REST endpoint. */
export interface Assembler<TEntity, TResource> {
 toEntity(resource: TResource): TEntity;
}
/** Reusable read endpoint with typed resource/domain separation. */
export class ApiEndpoint<TEntity, TResource> {
 constructor(protected readonly http: HttpClient, protected readonly url: string,
 protected readonly assembler: Assembler<TEntity, TResource>) {}
 /** Fetches and maps the resource collection. */
 getAll(): Observable<TEntity[]> {
  return this.http.get<TResource[]>(this.url).pipe(map(resources => resources.map(r => this.assembler.toEntity(r))));
 }
}
