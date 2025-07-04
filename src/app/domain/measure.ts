export interface Measure {
  id: number;
  user: number;
  comment: string;
  created: Date;
  is_active: boolean;
  measures: {
    weight: number;
    waist: number;
    abdomen: number;
    chest: number;
    hips: number;
    back: number;
    left_bicep: number;
    right_bicep: number;
    left_forearm: number;
    right_forearm: number;
    left_thigh: number;
    right_thigh: number;
    left_calf: number;
    right_calf: number;
    glutes: number;
  };
}
