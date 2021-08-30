import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }

  buscargGifs(query: string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial = this.historial.slice(0,10); //Para que solo deje meter 10 valores
    }
    console.log(this._historial);
  }
}
