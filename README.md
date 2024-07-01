# SFM

Проект сделан на Angular 17, используя Tailwind CSS, NestJS, TypeORM, PostgreSQL.

## Что надо?

Для проекта надо установить:

Node js - https://nodejs.org/en

Angular 17 и выше - npm install -g @angular/cli

NestJS - npm i -g @nestjs/cli

PostgresSQL (Настройка ниже)

Проверить версии - ng v

Из полезных, но необязательных программ:
Для редактирования БД - DBeaver
Для запросов - Insomnia

## Установка

После установки проекта, надо прописать команду `npm install` в основную папку (\SFM) и в папку с сервером (\SFM\src\server).

## Запуск

Чтобы запустить проект без БД надо написать команду `ng serve` в основной папке (\SFM).
Для запуска БД надо написать команду `npm run start` в папке серера (\SFM\src\server).
Фронт запускается на `http://localhost:4200/`, а бек на `http://localhost:3001/`

В папке server нужно создать файл ".еnv" С такими параметрами:

JWT_SECRET=asgjasldukeybvqtikwhbtvuahbiugakhu (Пример ключа)

DB_HOST='localhost'

DB_PORT=5432

DB_USERNAME='postgres'

DB_PASSWORD='Пароль'

DB_NAME='SFM'

MAIL_HOST=smtp.gmail.com

MAIL_PORT=587

MAIL_USER=Почта

MAIL_PASS=Пароль

## Cкриншоты проекта:
![alt Главная страница пользователя](/ReadmeScreen/Страница_«main».png)

![alt Вкладка поиск](/ReadmeScreen/Страница_«search».png)

![alt Страница плейлистов](/ReadmeScreen/Страница_«playlists».png)

![alt Страница альбомов](/ReadmeScreen/Страница_«albums».png)

![alt Страница исполнителя](/ReadmeScreen/Страница_«actors».png)

![alt Страница профиля пользователя](/ReadmeScreen/Страница_«profile».png)

![alt Страница регистрации](/ReadmeScreen/Страница_«signup».png)

![alt Страница авторизации](/ReadmeScreen/Страница_«login».png)

![alt Страница восстановления пароля](/ReadmeScreen/Страница_«password_recovery».png)

![alt Страница создания нового пароля](/ReadmeScreen/Страница_«new_password».png)

![alt Страница «Исполнители» админка](/ReadmeScreen/Страница_«actors_admin».png)

![alt Страница «Альбомы» админка](/ReadmeScreen/Страница_«albums_admin».png)

![alt Страница «Плейлисты» админка](/ReadmeScreen/Страница_«playlists_admin».png)

![alt Страница «Пользователи» админка](/ReadmeScreen/Страница_«user_admin».png)

![alt Страница «Треки» админка](/ReadmeScreen/Страница_«tracks_admin».png)