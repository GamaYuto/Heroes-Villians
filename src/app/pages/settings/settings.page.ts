import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { SettingsService } from '../../core/services/settings.service';
import { addIcons } from 'ionicons';
import { moon, text, informationCircle, codeSlash, refresh } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  dark = false;
  largeText = false;

  constructor(
    private settings: SettingsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    addIcons({ moon, text, informationCircle, codeSlash, refresh });
  }

  async ngOnInit() {
    const s = await this.settings.load();
    this.dark = s.theme === 'dark';
    this.largeText = s.font === 'large';
  }

  async toggleDark() {
    this.dark = !this.dark;
    await this.settings.setTheme(this.dark ? 'dark' : 'light');
    await this.showToast(`Tema ${this.dark ? 'oscuro' : 'claro'} activado`);
  }

  async toggleLargeText() {
    this.largeText = !this.largeText;
    await this.settings.setFont(this.largeText ? 'large' : 'normal');
    await this.showToast(`Texto ${this.largeText ? 'grande' : 'normal'} activado`);
  }

  async resetSettings() {
    const alert = await this.alertCtrl.create({
      header: 'Restablecer ajustes',
      message: '¿Estás seguro de que quieres restablecer todos los ajustes a sus valores predeterminados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Restablecer',
          role: 'destructive',
          handler: async () => {
            this.dark = false;
            this.largeText = false;
            await this.settings.setTheme('light');
            await this.settings.setFont('normal');
            await this.showToast('Ajustes restablecidos correctamente');
          }
        }
      ]
    });

    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}
