import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './documentation/app/app.config';
import { AppComponent } from './documentation/app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
