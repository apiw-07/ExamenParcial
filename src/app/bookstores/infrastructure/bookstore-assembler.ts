/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoreResource } from './bookstore.resource';
/** Converts bookstore resources into domain entities. */
export class BookstoreAssembler {
 toEntity(r: BookstoreResource): Bookstore { return new Bookstore(r.id, r.name, r.specialty, r.minimumCopies); }
}
