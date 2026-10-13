/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Routes } from '@angular/router';
export const inventoryRoutes: Routes = [
 { path: 'receipts', children: [
   { path: 'new', loadComponent: () => import('./views/receive-books/receive-books').then(m => m.ReceiveBooks) }
 ] }
];
