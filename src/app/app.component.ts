import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  secondes!: number;
  counterSubsciption!: Subscription;

  constructor() {}

  ngOnInit() {
    const counter = Observable.interval(1000);
    this.counterSubsciption = counter.subscribe(
      (value) => {
        this.secondes = value
      }, (error) => {
        console.log('Uh-oh, il y a une error: ' + error)
      }, () => {
        console.log('Observable complete! ')
      }
    )
  }
  
  ngOnDestroy() {
    this.counterSubsciption.unsubscribe()
  }
}
