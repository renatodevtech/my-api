import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Music } from '../models/music.models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private url = `${environment.API}/musics`

  constructor( private http: HttpClient) {
   }

  obterMusicas(){
    return this.http.get<Music[]>(this.url)
  }

  cadastrarMusica(musica: Music){
    return this.http.post<Music>(this.url, musica)
  }

  editarMusica(musica: Music){
    return this.http.put<Music>(`${this.url}/${musica.id}`, musica)
  }
  remover(id: number){
    return this.http.delete<void>(`${this.url}/${id}}`)
  }
}
