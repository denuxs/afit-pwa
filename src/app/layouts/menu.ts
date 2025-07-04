export interface Menu {
  id: number;
  link: string;
  label: string;
  icon: string;
}

export const CLIENT_MENU = [
  {
    id: 1,
    link: '/profile',
    label: 'Perfil',
    icon: 'faSolidUser',
  },
  {
    id: 2,
    link: '/routines',
    label: 'Rutinas',
    icon: 'faSolidDumbbell',
  },
  {
    id: 3,
    link: '/measures',
    label: 'Medidas',
    icon: 'faSolidWeightScale',
  },
  {
    id: 4,
    link: '/about',
    label: 'Acerca',
    icon: 'faSolidCircleInfo',
  },
];

export const COACH_MENU = [
  {
    id: 1,
    link: '/profile',
    label: 'Perfil',
    icon: 'faSolidUser',
  },
  {
    id: 2,
    link: '/clients',
    label: 'Clientes',
    icon: 'faSolidUserGroup',
  },
  {
    id: 3,
    link: '/about',
    label: 'Acerca',
    icon: 'faSolidCircleInfo',
  },
];
