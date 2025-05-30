# Microservicio de Órdenes - NestJS

Este microservicio está construido con NestJS y maneja la gestión de órdenes en el sistema.

## Requisitos

- Node.js (v18 o superior)
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
```

## Estructura del Proyecto

```
src/
├── main.ts              # Punto de entrada de la aplicación
├── app.module.ts        # Módulo principal
├── orders/             # Módulo de órdenes
│   ├── controllers/    # Controladores
│   ├── services/       # Servicios
│   ├── entities/       # Entidades
│   └── dto/           # Data Transfer Objects
└── common/            # Código compartido
```

## Características

- Gestión de órdenes
- Validación de datos
- Documentación con Swagger
- Integración con base de datos
- Manejo de errores centralizado

## Licencia

MIT 