interface Catalog {
  id: number;
  name: string;
  key: string;
  image: string;
  created: Date;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  image: string;
  equipment: Catalog;
  muscle: Catalog;
  // exercises_count: number;
  created: Date;
}

interface Sets {
  rept: number;
  weight: number;
  sets: number;
}

export interface RoutineExercise {
  id: number;
  description: string;
  order: number;
  routine: number;
  exercise: Exercise;
  sets: Sets[];
}
