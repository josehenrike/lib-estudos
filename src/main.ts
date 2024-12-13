import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './documentation/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './documentation/app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err));
