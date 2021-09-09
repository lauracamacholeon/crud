"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeroesService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var HeroesService = /** @class */ (function () {
    function HeroesService(http) {
        this.http = http;
        this.url = 'https://crudd-a34fa-default-rtdb.firebaseio.com';
    }
    HeroesService.prototype.crearHeroe = function (heroe) {
        return this.http.post(this.url + "/heroes.json", heroe).pipe(operators_1.map(function (resp) {
            heroe.id = resp.name;
            return heroe;
        }));
    };
    // el signo de pregunta es para que no se genere errores en el delete
    HeroesService.prototype.actualizarHeroe = function (heroe) {
        // copiarme un heroe temporal para eliminar el id al objeto que enviare
        // pero no eliminarlo del objeto heroe como tal
        var heroeTemporal = __assign({}, heroe);
        delete heroeTemporal.id;
        // para actualizar se coloca put
        // el .json es para firebase no es oblitatorio enlos otros backend
        return this.http.put(this.url + "/heroes/" + (heroe === null || heroe === void 0 ? void 0 : heroe.id) + ".json", heroeTemporal);
    };
    HeroesService.prototype.obtenerHeroes = function () {
        return this.http.get(this.url + "/heroes.json").pipe(operators_1.map(this.crearArregloDeHeroes));
    };
    HeroesService.prototype.crearArregloDeHeroes = function (heroesObj) {
        var heroes = [];
        if (heroesObj == null) {
            return [];
        }
        // los keys son las posiciones que lo contienen el objeto ejemplo :
        // arreglo como objeto
        // var obj = { 0: 'a', 1: 'b', 2: 'c' };
        // console.log(Object.keys(obj)); // console: ['0', '1', '2']
        Object.keys(heroesObj).forEach(function (key) {
            var heroe = heroesObj[key];
            console.log(key);
            heroe.id = key;
            heroes.push(heroe);
        });
        return heroes;
    };
    HeroesService.prototype.obtenerHeroePorId = function (id) {
        return this.http.get(this.url + "/heroes/" + id + ".json");
    };
    HeroesService.prototype.eliminarHeroe = function (id) {
        return this.http["delete"](this.url + "/heroes/" + id + ".json");
    };
    HeroesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HeroesService);
    return HeroesService;
}());
exports.HeroesService = HeroesService;
