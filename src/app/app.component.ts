import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private settings: SettingsService) {}

  async ngOnInit() {
    // Cargar ajustes guardados al iniciar la app
    await this.settings.load();
  }
}
