# Task Manager

Застосунок для менеджменту задач.

## Стек

- **Бекенд:** NestJS + TypeORM + PostgreSQL
- **Фронтенд:** Next.js + React + TanStack Query
- **База даних:** PostgreSQL в Docker

## Запуск

### 1. Вимоги

- Node.js v18+
- Docker Desktop

### 2. Запуск бази даних

```bash
docker-compose up -d
```

### 3. Запуск міграцій

```bash
cd backend
npm install
npm run migration:run
cd ..
```

### 4. Встановлення залежностей фронтенду

```bash
cd frontend
npm install
cd ..
```

### 5. Запуск застосунку

```bash
npm run dev
```

Бекенд працює на http://localhost:3001
Фронтенд працює на http://localhost:3000

## API

| Метод | URL                 | Опис                                          |
| ----- | ------------------- | --------------------------------------------- |
| GET   | /tasks              | Список задач. Фільтр: ?status=open\|completed |
| POST  | /tasks              | Створити задачу                               |
| PATCH | /tasks/:id/complete | Завершити задачу                              |

## Архітектурні рішення

- `isOverdue` не зберігається в БД — рахується в сервісі на льоту: `dueDate < now && status === 'open'`
- Схема БД створюється виключно через TypeORM міграції (`synchronize: false`)
- Логіка знаходиться в сервісі, контролер залишається тонким
- TanStack Query інвалідує кеш після кожної мутації — список оновлюється без перезавантаження сторінки

## AI Notes

Використовував Claude як асистента для:

- Генерації початкової структури NestJS модуля
- Написання TypeORM сутності та міграції
- Компонентів React з TanStack Query

Що довелось виправляти вручну:

- Версія `typeorm` була `^1.0.0` (неіснуюча) — виправив на `0.3.20`
- Конфлікт версій `@nestjs/typeorm` з NestJS 11 — підібрав сумісну версію `11.0.1`
- `tsconfig.json` мав `"module": "nodenext"` що конфліктує з NestJS — замінив на `commonjs`
- CORS не працював через те що бекенд не запускався через помилку в tsconfig
- Кирилиця відображалась як `???????` — додав `client_encoding: UTF8`
