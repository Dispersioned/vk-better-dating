# В разработке. Багрепорты слать в телегу или issues
# VK Better Dating client

## Установка
1. Установить расширение из папки chrome-extension (расширения > управление расширениями > включить режим разработчика > загрузить распакованное расширение > указать путь до папки chrome_extension)
3. Установить MongoDB https://www.mongodb.com/try/download/community
4. Запустить MongoDB Compass и создать базу данных `test`
5. Установить nodejs 18 версии (но 20 тоже пойдет) https://nodejs.org/en/download/
6. Открыть папку проекта в любом терминале
7. Прописать `npm i -g yarn`
8. Прописать `yarn`
9. Прописать `yarn install-deps`
10. Запустить проект командой `yarn start`
11. Зайти в ВК знакомства, слева снизу появится окно с токеном. Если не появилось - перезагрузить страницу пару раз
12. Ввести токен в приложение

## Todo
1. фильтры, умные фильтры
2. Просмотр фото в полноэкранном режиме
3. Пофиксить ошибочные src у видео в анкетах
4. Загружать бэклог анкет для бэктрэкинга и более точного указания лайков. В частности показывать бэклог анкет вне ленты, бэклог скипнутых анкет, бэклог лайков
5. Последний онлайн (сегодня, вчера, ...)
6. Кнопка вернуться наверх
7. Парсинг ТГ, Инсты, ВК
8. Авторизация идет 2 запроса почему-то - сделать через tanstack-query
9. С settings при F5 перекидывает на домашнюю
10. Разделить данные логически на анкеты и лайки
11. В FeedCard добавить isLiked и isMissed
12. В разделе твои лайки сделать форму с пояснением как ищутся мэтчи
13. Сделать нотификации был ли лайк взаимен
14. Проверить выкидывание из аккаунта при timeout ошибке
15. Сделать режим единственной анкеты в лента с скипом
16. Сделать уведомление то что лайк/дизлайк уже поставлен
17. Показывать если ты кого-то лайкнул/дизлайкнул в ленте
18. Добавить управление кнопками с фокусом
19. Подмена геолоки

## Фильтры
1. фильтр по интересам, чтобы чипы подсвечивались красным/зеленым

## Changelog

### alpha-0.1
1. Активный процесс разработки и кор фич
