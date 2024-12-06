import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './documentation/app/app.component';
import { config } from './documentation/app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
