# Lulztech шаблонная инфраструктура

### Что нужно сделать при развертывании нового сервера:
1) В generate-new-service.js заменить BASE_DOMAIN на домен проекта
1) В generate-new-service.js заменить REGISTRY_DOMAIN на домен проекта
1) Запустить ```node generate-env.js base-domain.com my-email@mail.com```
2) В гитхабе инфраструктуры сервера прописать следующие секреты:
```
ROOT_PASS – пароль рута новосоданного сервера
SUDO_USER – логин regular пользователя
SUDO_PASS - пароль regular пользователя
SERVER_NAME – адрес настраиваемого сервера
```
3) Запушить в ветку init


### Что нужно сделать при старте нового проекта:

1) Скопировать workflow-example.yml в %your_project%/.github/workflow/main.yml
2) Запустить ```node generate-new-service.js %IMAGE_NAME% или node generate-new-service.js %IMAGE_NAME% %DOMAIN_NAME% если нужен кастомный домен```
2) В гитхабе проекта прописать следующие секреты:
```
IMAGE_NAME – имя пакета для реджистри и docker-compose файла
WH_TOKEN – токен авторизации для скрипта апдейта пакетов
REGISTRY_URL – URL сервера реджистри
REGISTRY_USER - логин реджистри
REGISTRY_PASSWORD - пароль реджистри
TELEGRAM_CHAT_ID – ID чата в телеге для бота нотификаций
TELEGRAM_TOKEN – Токен бота
```
4) Запушить 
