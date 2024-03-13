import { MusicService } from './services/music.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Music } from './models/music.models';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-api';
  // musicas: Music[] = []
  musicas$ = new Observable<Music[]>()

  id = ''
  musica = ''
  autor = ''

  constructor(private MusicService: MusicService){
    console.log(environment.API);
    this.obterMusicasCadastradas();

  }

  obterMusicasCadastradas(){
    // this.MusicService.obterMusicas().subscribe(musicas => this.musicas = musicas)
    this.musicas$ = this.MusicService.obterMusicas();
  }

  buttonClick(){
    if (!this.musica || !this.autor)
      return;

    if (this.id){
      this.atualizar();
      return;
    }

    this.MusicService.cadastrarMusica({author: this.autor, text: this.musica})
      .subscribe(_ => this.obterMusicasCadastradas())

  }

  atualizar(){
    this.MusicService.editarMusica({
      id: parseInt(this.id), author: this.autor, text: this.musica})
      .subscribe(_ => this.obterMusicasCadastradas())
  }

  preencherCampos(musica: Music){
    this.id = musica.id!.toString();
    this.autor = musica.author;
    this.musica = musica.text;

  }

  remover(id: number){
    this.MusicService.remover(id)
      .subscribe(_ => this.obterMusicasCadastradas())
  }
}
