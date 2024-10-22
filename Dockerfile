# Базовый образ с Node.js
FROM node:16

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файл package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Компилируем фронтенд
RUN npm run build

# Указываем порт, на котором будет работать фронтенд
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
