"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeroesComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var HeroesComponent = /** @class */ (function () {
    // heroes : any ;
    function HeroesComponent(router, heroesService) {
        this.router = router;
        this.heroesService = heroesService;
        this.heroes = [];
        this.cargando = false;
        this.vacio = false;
    }
    HeroesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        this.heroesService.obtenerHeroes().subscribe(function (data) {
            _this.heroes = data;
            // aca ya dejo de cargar la informacion
            //  el settimeout es para alcanzar a visualizar
            setTimeout(function () {
                _this.cargando = false;
                if (_this.heroes.length == 0) {
                    _this.vacio = true;
                }
                else {
                    _this.vacio = false;
                }
            }, 500);
        });
    };
    // eliminarHeroe(id,i)
    HeroesComponent.prototype.eliminarHeroe = function (id) {
        var _this = this;
        // el subscribe aqui es asi
        //  otro metodo
        // this.heroes.splice(i,1)
        sweetalert2_1["default"].fire({
            icon: 'warning',
            text: '¿Está seguro que desea eliminar el elemento?',
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonColor: '#d9534f'
            // si la respuesta es true o sea que le di en ok se eliminarael elemento
        }).then(function (resp) {
            if (resp.value) {
                _this.heroesService.eliminarHeroe(id).subscribe();
                setTimeout(function () {
                    _this.ngOnInit();
                }, 300);
            }
        });
        console.log(id);
    };
    HeroesComponent = __decorate([
        core_1.Component({
            selector: 'app-heroes',
            templateUrl: './heroes.component.html',
            styles: []
        })
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
