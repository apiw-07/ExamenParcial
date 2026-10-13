/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Book } from '../domain/model/book.entity';
import { BookResource } from './subject.response';
/** Maps the first author and uses the required missing-author fallback. */
export class BookAssembler {
 toEntity(r: BookResource): Book { return new Book(r.key, r.title, r.authors?.[0]?.name || 'Unknown Author'); }
}
