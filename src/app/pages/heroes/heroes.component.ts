import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  vacio = false;
  // heroes : any ;

  constructor(private router: Router, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true
    this.heroesService.obtenerHeroes().subscribe(data => {
      this.heroes = data
      // aca ya dejo de cargar la informacion
      //  el settimeout es para alcanzar a visualizar
      setTimeout(() => {
        this.cargando = false
        if (this.heroes.length == 0) {
          this.vacio = true
        }else{
          this.vacio = false
        }
      }, 500);

    })
  }

  // eliminarHeroe(id,i)
  eliminarHeroe(id: string) {
    // el subscribe aqui es asi
    //  otro metodo
    // this.heroes.splice(i,1)
    Swal.fire({
      icon: 'warning',
      text: '¿Está seguro que desea eliminar el elemento?',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d9534f'
      // si la respuesta es true o sea que le di en ok se eliminarael elemento
    }).then(resp => {
      if (resp.value) {
        this.heroesService.eliminarHeroe(id).subscribe();

        setTimeout(() => {
          this.ngOnInit();
        }, 300);


      }


    })


    console.log(id);



  }








}
