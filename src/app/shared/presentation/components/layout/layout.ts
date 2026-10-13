/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
/** Responsive application shell, brand identity and language controls. */
@Component({ selector: 'app-layout', standalone: true,
 imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatSidenavModule,
 MatListModule, MatButtonModule, MatButtonToggleModule, TranslatePipe],
 templateUrl: './layout.html', styleUrl: './layout.css' })
export class Layout {
 private readonly translate = inject(TranslateService);
 readonly mobile = toSignal(inject(BreakpointObserver).observe('(max-width: 760px)').pipe(map(r => r.matches)), { initialValue: false });
 readonly language = signal('en');
 readonly logoFailed = signal(false);
 readonly logoUrl = computed(() => environment.logoPublishableKey
  ? `${environment.logoApiBaseUrl}/${environment.logoDomain}?token=${encodeURIComponent(environment.logoPublishableKey)}&size=128&format=png` : '');
 constructor() { this.translate.addLangs(['en', 'es']); this.translate.use('en'); document.documentElement.lang = 'en'; }
 /** Applies language to translated controls and document accessibility metadata. */
 changeLanguage(language: string): void {
  this.language.set(language); this.translate.use(language); document.documentElement.lang = language;
 }
}
