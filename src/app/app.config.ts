import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideHttpClient} from '@angular/common/http';
import {InitializerService} from './initializer.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideOAuthClient(),
    provideHttpClient(),
    provideAppInitializer(() => {
      inject(InitializerService).init();
    })
  ]};
