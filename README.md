# Desarrollo de una Aplicación de Gestión de Productos y Categorías en ReactJS con PrimeReact

Melani Gonzaga

Nicole Cóndor

Vladimir Escobar 

Mateo Amaguaya

NRC: 17713

## Proyecto `Actividad` - Backend

### Descripción

Este proyecto es una API RESTful que permite gestionar productos y categorías. Se han implementado diversas rutas que permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) tanto para productos como para categorías. La API está configurada para aceptar solicitudes desde un frontend que corre en http://localhost:3000 y responde en el puerto 3001.

### Dependencias Principales

- **Express:** Un marco de aplicación web para Node.js que facilita la creación de servidores y la gestión de rutas.
- **CORS:** Un middleware que permite configurar políticas de acceso desde otros dominios, en este caso, permitiendo solicitudes desde http://localhost:3000.

### Funcionalidad y Rutas

1. **Configuración Inicial y Middleware**
express.json(): Middleware de Express que permite parsear las solicitudes entrantes con un cuerpo JSON.
CORS: Configurado para aceptar solicitudes desde http://localhost:3000, lo que es útil cuando el frontend y el backend se ejecutan en diferentes puertos.

2. **Datos Simulados**
Se han definido dos conjuntos de datos en memoria:

Productos (products): Una lista de productos con atributos como id, nombre, precio, stock y categoryName.
Categorías (categories): Una lista de categorías con atributos como id y nombre.
Estos datos se utilizan para simular una base de datos en memoria.

3. **Rutas de Productos**
GET /api/products: Devuelve todos los productos en la lista. Además, se asegura de que cada producto tenga una categoría válida.

GET /api/products/:id: Devuelve un producto específico basado en su id. Si no se encuentra el producto, retorna un error 404.

POST /api/products: Permite crear un nuevo producto. El producto se añade a la lista de products y se le asigna un id único basado en el tamaño actual de la lista.

PUT /api/products/:id: Actualiza un producto existente por id. Se modifican los atributos del producto según los datos proporcionados en la solicitud.

DELETE /api/products/:id: Elimina un producto de la lista basado en su id. Si el producto no se encuentra, retorna un error 404.

4. **Rutas de Categorías**
GET /api/categories: Devuelve todas las categorías en la lista.

GET /api/categories/name/:name: Devuelve una categoría específica basada en su nombre. Si no se encuentra, retorna un error 404.

POST /api/categories: Permite crear una nueva categoría. Verifica que la categoría no exista ya antes de añadirla.

PUT /api/categories/name/:name: Actualiza una categoría existente basada en su nombre. Además, actualiza el nombre de la categoría en todos los productos que pertenecen a esa categoría.

DELETE /api/categories/name/:name: Elimina una categoría basada en su nombre. Si la categoría no se encuentra, retorna un error 404.

### Instrucciones de Uso

1. **Navega al directorio del proyecto:**

   ```bash
   cd Actividad

2. **Instala las dependencias:**

    ```bash
    npm install

3. **Ejecuta el proyecto:**

    ```bash
    node index.js

Inicia el servidor en el puerto 3001. Cuando el servidor está corriendo, muestra un mensaje en la consola indicando que la API REST está disponible en http://localhost:3001.

## Proyecto `Actividad3` - Frontend

### Descripción

El proyecto actividad3 es una aplicación web desarrollada utilizando Node.js y React. Este proyecto demuestra el uso de una arquitectura moderna de desarrollo frontend y backend con React como tecnología de interfaz de usuario.

### Estructura del Proyecto

- **node_modules/:** Carpeta generada automáticamente por npm que contiene todas las dependencias de la aplicación. Esta carpeta no se edita manualmente.

- **package-lock.json:** Archivo que describe la estructura exacta de las dependencias instaladas en node_modules, lo que asegura que la aplicación sea consistente en diferentes entornos.

- **package.json:** Archivo de configuración para npm que define los scripts, dependencias, y otra información relevante para la gestión del proyecto. Aquí se especifican los paquetes necesarios y sus versiones.

- **tsconfig.json:** Archivo de configuración para TypeScript, que define las opciones del compilador, como el nivel de estrictura, la versión de ECMAScript a usar, y los módulos a incluir o excluir en la compilación.

### Contenido del Directorio src/
El directorio src/ contiene el código fuente principal de la aplicación React.

- **App.tsx:** El componente principal de la aplicación. Este archivo es la entrada central de la aplicación donde se ensamblan todos los componentes principales.

- **App.css:** Archivo de estilos asociado con App.tsx, utilizado para aplicar CSS a los componentes de la aplicación.

- **index.tsx:** Punto de entrada para la aplicación React. Este archivo renderiza el componente App en el DOM dentro del elemento con el id root en index.html.

- **index.css:** Estilos globales aplicados a toda la aplicación.

- **types.ts:** Archivo para definir tipos personalizados que se usan a lo largo de la aplicación, lo cual es una práctica común en aplicaciones TypeScript para asegurar el tipado estático.

### Subdirectorios dentro de src/

- **components/:** Carpeta donde se almacenan los componentes reutilizables de la aplicación. Cada componente React suele estar en un archivo separado para mejorar la organización y mantenibilidad del código.

- **services/:** Carpeta destinada a manejar la lógica de interacción con servicios externos, como APIs. Este patrón de diseño separa la lógica de negocio del código de presentación.

### Explicación de Funcionalidades

- **Componentización:** La aplicación está dividida en componentes independientes que gestionan su propio estado y presentación. Esto facilita el desarrollo, la prueba y el mantenimiento del código.

- **Uso de TypeScript:** El uso de TypeScript permite detectar errores durante la fase de desarrollo y asegura que los componentes y funciones sigan estrictamente los tipos definidos.

- **Interacción con APIs:** Probablemente, los archivos en services/ contienen la lógica para interactuar con la API backend que maneja los productos y categorías. Usualmente, estas interacciones se implementan utilizando fetch o bibliotecas como Axios.

### Cómo Funciona Todo Junto
Cuando se ejecuta la aplicación (por ejemplo, con npm start), Webpack o un empaquetador similar compila el código TypeScript y JSX en JavaScript estándar que puede ser entendido por los navegadores. El componente App se monta en el elemento root dentro de index.html, y los componentes React se encargan de renderizar la interfaz de usuario en función del estado y las propiedades que reciban.

### Instrucciones de Uso

1. **Navega al directorio del proyecto:**

    ```bash
    cd actividad3

2. **Instala las dependencias:**

    ```bash
    npm install

3. **Ejecuta el proyecto en modo desarrollo:**

    ```bash
    npm start

La aplicación se abrirá automáticamente en el navegador en http://localhost:3000.


Este archivo `README.md` proporciona una guía clara para ejecutar ambos proyectos. Puedes personalizarlo según tus necesidades específicas.
