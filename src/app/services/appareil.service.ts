import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppareilService {

    appareilsSubject = new Subject<any[]>();

    private appareils: any[] = []
    // {
    //     id:1,
    //     name: 'Machine à laver',
    //     status: 'allumé',
    // },
    // {
    //     id:2,
    //     name: 'Télévision',
    //     status: 'allumé',
    // },
    // {
    //     id:3,
    //     name: 'Ordinateur',
    //     status: 'éteint',
    // },
    // ];

    constructor(private HttpClient : HttpClient){}

    getAppareilById(id: number) {
        const appareil = this.appareils.find((appareilObject) => {
            return appareilObject.id === id;
        })
        return appareil
    }

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice())
    }

    switchOnAll() {
        for (const appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject()
    }

    switchOffAll() {
        for (const appareil of this.appareils) {
        appareil.status = 'éteint';
        this.emitAppareilSubject()
        }
        
    }
    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé'
        this.emitAppareilSubject()
    }
    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint'
        this.emitAppareilSubject()
    }


    AddAppareil( name : string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        }
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject)
        this.emitAppareilSubject()
    }

    saveAppareilsServer() {
        this.HttpClient
            .put('https://http-client-demo-b415a-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
            .subscribe(() => {
                console.log('Enregistrement terminé!')
                },(error) => {
                console.log('Erreur de sauvegarde ! ' + error)
                }
            )
    }
    getAppareilsFromServer() {
        this.HttpClient
            .get<any[]>('https://http-client-demo-b415a-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
            .subscribe((response) => {
                this.appareils = response;
                this.emitAppareilSubject()
                },(error) => {
                    console.log('Erreur de chargement!' + error)
                }
            )
    }
}
