import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',

})
export class HeroeComponent implements OnInit {

  // importante ponerlo asiiiii con el new heroemodel
  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute) {
    this.heroe.estado = true
  }



  ngOnInit(): void {
    // id en comillas es como se coloco en el archivo app routing module
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    // necesario lo de que sea de tipo string
    if (id != "nuevo" && typeof (id) == "string") {
      // obligatorio el data con el any
      this.heroesService.obtenerHeroePorId(id).subscribe((data: any) => {
        this.heroe = data;
        // si no se coloca se crea otro
        this.heroe.id = id;
      })
    }

    console.log(id);

  }

  guardarInformacion(formulario: NgForm) {
    if (formulario.invalid) return;

    // importante decision entre actualizar y crear, si existe el id es porque ya se creo asi que se debera actualizar
    if (this.heroe.id)
      this.guardarActualizarHeroe()
    else {
      this.guardarCrearHeroe()




    }
  }

  guardarCrearHeroe() {
    this.heroesService.crearHeroe(this.heroe).subscribe(respuesta => {
      console.log(respuesta)
      this.heroe = respuesta;
      this.alertas('crear')
    })

  }

  guardarActualizarHeroe() {
    // si existe un id significa que el heroe ya esta creado asi que actualizaria
    this.heroesService.actualizarHeroe(this.heroe).subscribe(respuesta => {
      console.log(respuesta)
      this.alertas('actualizar')
    })
  }

  alertaCargando() {
    Swal.fire({
      icon: 'info',
      title: 'Guardando informacion',
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    Swal.showLoading();
  }

  alertas(tipo: string) {
    this.alertaCargando();
    let texto = '';
    tipo === "crear" ? texto = "Héroe creado correctamente" : texto = "Héroe actualizado corretamente"
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: `${texto}`,
        timer: 2000
      })

    }, 1500);

    // aqui se ve mejor
    // this.router.navigateByUrl('/heroes')
  }

  


}
