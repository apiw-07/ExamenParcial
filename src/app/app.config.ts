/**
 * @summary Provides inventory platform configuration and behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
 providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(),
 provideRouter(routes), provideTranslateService({ lang: 'en', fallbackLang: 'en',
 loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }) })]
};
