/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Routes } from '@angular/router';
export const bookstoresRoutes: Routes = [
 { path: 'overview', loadComponent: () => import('./views/bookstore-overview/bookstore-overview').then(m => m.BookstoreOverview) }
];
