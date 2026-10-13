/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Routes } from '@angular/router';
/** Composes child routes by bounded context and handles unsupported paths. */
export const routes: Routes = [
 { path: '', redirectTo: '/bookstores/overview', pathMatch: 'full' },
 { path: 'bookstores', loadChildren: () => import('./bookstores/presentation/bookstores.routes').then(m => m.bookstoresRoutes) },
 { path: 'inventory', loadChildren: () => import('./inventory/presentation/inventory.routes').then(m => m.inventoryRoutes) },
 { path: '**', loadComponent: () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound) }
];
