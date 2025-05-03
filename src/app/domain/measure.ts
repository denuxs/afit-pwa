export interface Measure {
  id: number;
  user: number;
  comment: string;
  created: Date;
  measures: {
    weight: number;
    chest: number;
    abdomen: number;
    back: number;
    forearm: number;
    glutes: number;
    arm_left: number;
    arm_right: number;
    leg_left: number;
    leg_right: number;
    waist: number;
    hips: number;
  };
}

export interface MeasureList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Measure[];
}
