import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransfer'
})
export class DateTransferPipe implements PipeTransform {

  transform(value: Date | string | null): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    
    // Jours de la semaine en français (format court)
    const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    // Mois en français (format court)
    const mois = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 
                  'juil', 'août', 'sep', 'oct', 'nov', 'déc'];

    const jourSemaine = jours[date.getDay()];
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();

    return `${jourSemaine} ${jour} ${moisNom} ${annee}`;
  }

}