/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
/** Displays the unsupported route safely and offers a return to inventory. */
@Component({ selector: 'app-page-not-found', standalone: true, imports: [RouterLink, MatButtonModule, TranslatePipe],
 template: `<section class="not-found" aria-labelledby="not-found-title"><p class="eyebrow">404</p>
 <h1 id="not-found-title">{{ 'page-not-found' | translate }}</h1>
 <p>{{ 'route-not-found' | translate: { route: path } }}</p>
 <a mat-flat-button routerLink="/bookstores/overview">{{ 'back-overview' | translate }}</a></section>`,
 styles: [`.not-found { padding:60px 0; } .not-found p { overflow-wrap:anywhere; margin-bottom:24px; }`] })
export class PageNotFound { readonly path = inject(Router).url; }
