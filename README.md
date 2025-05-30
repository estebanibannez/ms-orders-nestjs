# Microservicio de Órdenes - NestJS

Este microservicio está construido con NestJS y maneja la gestión de órdenes utilizando una arquitectura CQRS (Command Query Responsibility Segregation).

## Requisitos

- Node.js (v20 o superior)
- npm o yarn
- Docker (opcional)

## Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Ejecutar pruebas
npm test
```

## Estructura del Proyecto

```
src/
├── main.ts              # Punto de entrada de la aplicación
├── app.module.ts        # Módulo principal
├── orders/             # Módulo de órdenes
│   ├── commands/       # Comandos CQRS
│   ├── queries/        # Consultas CQRS
│   ├── handlers/       # Manejadores de comandos y consultas
│   ├── controllers/    # Controladores REST
│   ├── dto/           # Data Transfer Objects
│   └── entities/       # Entidades
└── common/            # Código compartido
```

## Características

- Arquitectura CQRS para separación de comandos y consultas
- Gestión completa de órdenes (crear, leer, actualizar, eliminar)
- Validación de datos con class-validator
- Documentación con Swagger
- Pruebas unitarias con Jest
- Manejo de errores centralizado
- Patrones de diseño y mejores prácticas

## Endpoints API

### Órdenes

- `GET /orders` - Obtener todas las órdenes
- `GET /orders/:id` - Obtener una orden específica
- `POST /orders` - Crear una nueva orden
- `PUT /orders/:id` - Actualizar una orden existente
- `DELETE /orders/:id` - Eliminar una orden

## Pruebas

El proyecto incluye pruebas unitarias para:
```bash
npm test
```

## Documentación API

La documentación de la API está disponible en Swagger UI cuando el servidor está en ejecución:
```
http://localhost:3000/api
```

## Licencia

MIT 