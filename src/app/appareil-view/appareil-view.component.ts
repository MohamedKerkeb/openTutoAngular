import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  // isAuth = false;
  lastUpdate = new Date()
  // lastUpdate = new Promise((resolve, reject) => {
  //   const date = new Date();
  //   setTimeout(() => {
  //     resolve(date);
  //   }, 2000);
  // });

  appareils!: any[] ;
  appareilSubsciption!: Subscription;

  constructor(private appareilService: AppareilService) {}

  ngOnInit() {
    this.appareilSubsciption = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    )
    this.appareilService.emitAppareilSubject()
  }

  onAllumer() {
    console.log('on allume tout!');
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    console.log('on éteint tout!')
    this.appareilService.switchOffAll()
  }

  ngOnDestroy() {
    this.appareilSubsciption.unsubscribe()
  }

  onSave() {
    this.appareilService.saveAppareilsServer()
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

}
