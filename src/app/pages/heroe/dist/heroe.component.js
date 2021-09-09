"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeroeComponent = void 0;
var core_1 = require("@angular/core");
var heroe_model_1 = require("../../models/heroe.model");
var sweetalert2_1 = require("sweetalert2");
var HeroeComponent = /** @class */ (function () {
    function HeroeComponent(heroesService, activatedRoute) {
        this.heroesService = heroesService;
        this.activatedRoute = activatedRoute;
        // importante ponerlo asiiiii con el new heroemodel
        this.heroe = new heroe_model_1.HeroeModel();
        this.heroe.estado = true;
    }
    HeroeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // id en comillas es como se coloco en el archivo app routing module
        var id = this.activatedRoute.snapshot.paramMap.get('id');
        // necesario lo de que sea de tipo string
        if (id != "nuevo" && typeof (id) == "string") {
            // obligatorio el data con el any
            this.heroesService.obtenerHeroePorId(id).subscribe(function (data) {
                _this.heroe = data;
                // si no se coloca se crea otro
                _this.heroe.id = id;
            });
        }
        console.log(id);
    };
    HeroeComponent.prototype.guardarInformacion = function (formulario) {
        if (formulario.invalid)
            return;
        // importante decision entre actualizar y crear, si existe el id es porque ya se creo asi que se debera actualizar
        if (this.heroe.id)
            this.guardarActualizarHeroe();
        else {
            this.guardarCrearHeroe();
        }
    };
    HeroeComponent.prototype.guardarCrearHeroe = function () {
        var _this = this;
        this.heroesService.crearHeroe(this.heroe).subscribe(function (respuesta) {
            console.log(respuesta);
            _this.heroe = respuesta;
            _this.alertas('crear');
        });
    };
    HeroeComponent.prototype.guardarActualizarHeroe = function () {
        var _this = this;
        // si existe un id significa que el heroe ya esta creado asi que actualizaria
        this.heroesService.actualizarHeroe(this.heroe).subscribe(function (respuesta) {
            console.log(respuesta);
            _this.alertas('actualizar');
        });
    };
    HeroeComponent.prototype.alertaCargando = function () {
        sweetalert2_1["default"].fire({
            icon: 'info',
            title: 'Guardando informacion',
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        sweetalert2_1["default"].showLoading();
    };
    HeroeComponent.prototype.alertas = function (tipo) {
        this.alertaCargando();
        var texto = '';
        tipo === "crear" ? texto = "Héroe creado correctamente" : texto = "Héroe actualizado corretamente";
        setTimeout(function () {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: "" + texto,
                timer: 2000
            });
        }, 1500);
        // aqui se ve mejor
        // this.router.navigateByUrl('/heroes')
    };
    HeroeComponent = __decorate([
        core_1.Component({
            selector: 'app-heroe',
            templateUrl: './heroe.component.html'
        })
    ], HeroeComponent);
    return HeroeComponent;
}());
exports.HeroeComponent = HeroeComponent;
