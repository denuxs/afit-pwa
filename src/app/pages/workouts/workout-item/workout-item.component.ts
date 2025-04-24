import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Exercise, Workout } from 'app/domain';

@Component({
  selector: 'workout-item',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './workout-item.component.html',
  styleUrl: './workout-item.component.scss',
})
export class WorkoutItemComponent {
  @Input() workout!: Workout;
  // workout = input<Workout>();

  // daysOfWeek = [
  //   'Lunes',
  //   'Martes',
  //   'Miercoles',
  //   'Jueves',
  //   'Viernes',
  //   'Sabado',
  //   'Domingo',
  // ];

  daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  colors = [
    'from-blue to-blue-500',
    'from-pink-400 to-pink-500',
    'from-rose-400 to-rose-500',
    'from-amber-500 to-pink-500',
    'from-emerald-500 to-green-900',
    'from-cyan-400 to-cyan-500',
    'from-rose-400 to-red-500',
    'from-red-500 to-orange-500',
  ];
  gradient = '';

  ngOnInit() {
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    const randomColor = this.colors[randomNumber];

    this.gradient = randomColor;
  }

  getDayOfWeek(index: number): string {
    return this.daysOfWeek[index - 1];
  }

  getMuscles(exercises: any) {
    const data = exercises.map((e: any) => e.exercise.muscle.name);
    return [...new Set(data)];
  }
}
