import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/sevicios/mascota.service';

@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrls: ['./form-crear.component.css'],
})
export class FormCrearComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() onCloseModal = new EventEmitter<any>();

  public startDate = new Date().toISOString().slice(0, 10);
  public estados = [
    { label: 'Si', value: true },
    { label: 'No', value: false },
  ];
  public sexos = [
    { label: 'Macho', value: 'macho' },
    { label: 'Hembra', value: 'hembra' },
  ];
  public especies = [
    { label: 'Perro(a)', value: 'perro' },
    { label: 'gato(a)', value: 'gato' },
  ];

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService
  ) {}

  formModal: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    especie: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    raza: ['', [Validators.required, Validators.minLength(4)]],
    estadoDeEsterilizacion: ['', [Validators.required]],
    estadoDeVacunacion: ['', [Validators.required]],
    descripcionDeLaMascota: [
      '',
      [Validators.required, Validators.minLength(15)],
    ],
    fechaDeNacimiento: [new Date().toISOString(), [Validators.required]],
  });

  ngOnInit(): void {}

  public onPress(element: MouseEvent) {
    const node = element.target as HTMLElement;
    if (node.id === 'outer') {
      this.onCloseModal.emit();
    }
  }

  public calcularEdad() {
    const fechaDeNacimiento = this.formModal.get('fechaDeNacimiento')?.value;
    const anosCompletos =
      Math.floor(new Date().getTime() - new Date(fechaDeNacimiento).getTime()) /
      (1000 * 60 * 60 * 24 * 365);

    const anos = Math.floor(anosCompletos);
    const meses = Math.floor((anosCompletos % 1) * 12);

    return `tiene ${anos} años y ${meses} meses`;
  }

  crearMascota() {
    console.log(this.formModal.valid);

    if (this.formModal.valid) {
      this.mascotaService.crearMascota(this.formModal.value).subscribe(
        (response) => {
          alert('mascota creada');
          this.formModal.reset();
          this.onCloseModal.emit();
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
