import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import { ClarityIcons } from '@clr/icons'; // ❌ This is outdated and incompatible with Clarity Core
import '@cds/core/icon/register.js';
import { ClarityIcons } from '@cds/core/icon';
import { trashIcon, pencilIcon } from '@cds/core/icon';
import '@cds/core/badge/register.js';
ClarityIcons.addIcons(trashIcon, pencilIcon);
import { cogIcon } from '@cds/core/icon/shapes/cog.js';
import { provideAnimations } from '@angular/platform-browser/animations';

//import { ClarityIcons } from '@cds/core/icon';


ClarityIcons.addIcons(trashIcon, pencilIcon);


ClarityIcons.addIcons(cogIcon);


bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), ...appConfig.providers]
}).catch(err => console.error(err));

