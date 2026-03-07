# Используем официальный образ Node.js
FROM node:22-alpine

# Создаем и переходим в рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем сервер для обслуживания статических файлов (например, serve)
RUN npm install -g serve

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000"]
