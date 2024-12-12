import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './documentation/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './documentation/app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
