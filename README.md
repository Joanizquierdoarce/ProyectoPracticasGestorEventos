Gestor de Eventos
descripcion: El gestor de eventos es una aplicació web que permite al usuario registrarse y loggearse, asi como despues de acceder se pueden crear, editar, listar, eliminar y fltrar eventos
ya sea por ubicación o en su defecto por la fecha del evento, esta aplicación se soporta para su desarrrollo en el node.js con express para el backend y el React.js para frontend.

Caracteristicas: 1) crea eventos con la estructura de nombre del evento, fecha del evento, hora del evento, ubicacion del evento y la descripción.
2) Modifica un evento existente para ello requiere del id y despues rellenar los campos de creacion.
3) Elimina los eventos de forma correcta.
4) Filtra los eventos ya sea por ubicacion o por un rango de fechas.
5) Tiene un sistema de autenticación para que solo los usuarios registrados puedan gestionar los eventos.
6) Tiene una interfaz sencilla pero con todas las funcionalidades requeridas.

📦Tecnologias utilizadas: 
Frontend:
1) React.js
2) React Router Dom
3) fontawesome
4) tailwind CSS
5) axios
6) bootstrap
Backend:
1) Node.js con Express
2) CORS
3) Mongo DB con Mongoose
4) JWT ( JSON Web Token)
5) Dotenv
6) bcryptjs
7) Nodemon

Configuración de instalación:
Backend: 
1) crear carpeta backend
2) dentro del cmd poner cd C:\gestor-eventos\backend
3) para la instalación de dependencias empezamos con npm init -y
4) seguidamente se instalan las otras dependencias npm install express mongoose bcryptjs jsonwebtoken dotenv cors nodemon
Frontend: 
1) verificar que estamos en la ubicacion de gestor-eventos
2) una vez verificado introducir el siguiente codigo npm create vite@latest frontend
3) una vez creada la carpeta dentro del cmd se introduce cd frontend
4) luego de estar en la carpeta frotend hacemos npm install
5) para verificar que quedo bien instalado el vite se ejecuta el codigo npm run dev y debe de mostrar en la pagina web lo correspondiente.
6) seguidamente se instalan las demas dependencias npm i react-router-dom fontawesome bootstrap axios tailwind


Método	   Endpoint	                                   Descripción
GET  	   /api/eventos	                            Obtener todos los eventos
GET	     /api/eventos/:id	                        Obtener un evento por ID
POST     /api/eventos	                            Crear un nuevo evento
PUT	     /api/eventos/:id	                        Modificar un evento existente
DELETE	 /api/eventos/:id	                        Eliminar un evento
GET	     /api/eventos/:ubicacion	                Filtrar eventos por ubicación
GET	     /api/eventos/:fechaInicio/:fechaFinal	  Filtrar eventos por rango de fecha
POST     /api/usuario/registrar                   Registrar usuario
POST     /api/usuario/login                       inicia sesion el usuario


Por ultimo se utilizaron los siguientes codigos para realizar la carga al gitHub:
1) git init
2) git add .
3) git commit -m
4) git branch -M main
5) git remote
6) git push origin main
