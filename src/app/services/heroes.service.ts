import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  private url = 'https://crudd-a34fa-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) {

  }

  crearHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(map((resp: any) => {
      heroe.id = resp.name
      return heroe;
    }))

  }

  // el signo de pregunta es para que no se genere errores en el delete
  actualizarHeroe(heroe?: HeroeModel) {

    // copiarme un heroe temporal para eliminar el id al objeto que enviare
    // pero no eliminarlo del objeto heroe como tal
    const heroeTemporal = {
      ...heroe
    }

    delete heroeTemporal.id;

    // para actualizar se coloca put
    // el .json es para firebase no es oblitatorio enlos otros backend
    return this.http.put(`${this.url}/heroes/${heroe?.id}.json`, heroeTemporal)
  }

  obtenerHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(map(this.crearArregloDeHeroes))
  }


  private crearArregloDeHeroes(heroesObj: any) {

    const heroes: HeroeModel[] = []

    if (heroesObj == null) {
      return []
    }

    // los keys son las posiciones que lo contienen el objeto ejemplo :
    // arreglo como objeto
    // var obj = { 0: 'a', 1: 'b', 2: 'c' };
    // console.log(Object.keys(obj)); // console: ['0', '1', '2']
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      console.log(key);
      heroe.id = key
      heroes.push(heroe)
    })

    return heroes;


  }

  obtenerHeroePorId(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  eliminarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }

}
