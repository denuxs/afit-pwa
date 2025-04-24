## AFIT PWA

PWA para ver rutinas de gimnasio con autenticacion (**En desarrollo**)

El API esta en Django 5 [github.com/denuxs/gym_api](https://github.com/denuxs/gym_api)

### Paquetes

- Angular 18
- Tailwind 3
- Angular PWA
- PrimeNg
- Firebase

### Funcionalidades

- Autenticación JWT
- Ver/Editar perfil
- Ver rutinas y ejercicios
- Comentar ejercicios
- Subida de Imágenes
- Notificaciones Push
- Traducción 118n

### Instalar y ejecutar app

```
Clonar el repositorio

Crear un proyecto web en firebase para notificaciones push y descargar credenciales para actualizar en archivos *.environment.ts (opcional)

npm install
ng server
```

### screenshots

![profile](https://github.com/denuxs/afit-pwa/blob/main/screenshots/login.png)
![profile](https://github.com/denuxs/afit-pwa/blob/main/screenshots/profile.png)
![workouts](https://github.com/denuxs/afit-pwa/blob/main/screenshots/workouts.png)
![exercises](https://github.com/denuxs/afit-pwa/blob/main/screenshots/exercises.png)
![exercise](https://github.com/denuxs/afit-pwa/blob/main/screenshots/exercise.png)

### TO DO

- Mejoras en autenticación JWT
- Mejoras en UI/UX
- Integrar Unit Tests con Jest
- Completar traducciones es/en
- Completar Notificaciones Push
