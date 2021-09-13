import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearchResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "NmxRsCCB1qAeBM3wxT7mmLsQp8TPJHdd";   //API de GIPHY
  private _historial: string[] = [];

  
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //El signo ! le dice que omita el error, ya que nosotros estamos haciendo la validacion por lo que sabemos que no puede crashear.
    }
  }

  buscargGifs(query: string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial = this.historial.slice(0,10); //Para que solo deje meter 10 valores

    localStorage.setItem('historial', JSON.stringify(this._historial));

    }
    
    this.http.get<GifsSearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=NmxRsCCB1qAeBM3wxT7mmLsQp8TPJHdd&q=${query}&limit=10`)
      .subscribe( (resp) =>{
        this.resultados = resp.data;
      });
  }
}
