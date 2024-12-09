import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './documentation/app/app.component';
import { routes } from './documentation/app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    HttpClientModule,
    provideAnimations(),
    BrowserAnimationsModule,
    provideHttpClient(),
    MatDialogModule
  ],
}).catch(err => console.error(err));
