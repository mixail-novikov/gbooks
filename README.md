# todo

## Внутренняя страница
1. Реализовать форму поиска
  - SpeechAPI
  - Параметры сортировки и т.д.
- Пагинация
- `.SpeechRecognition__microphone` переделать в отдельный компонент

## BookInfo

1. Вынести генерацию ссылки для поиска автора

## В дальний ящик
- Suggestions https://www.npmjs.com/package/suggestion


1. Как синхронизировать урл и состояние при первой загрузке?

Была идея слушать LOCATION_CHANGE, но так получается что мы слушаем всегда + можем слушать тогда, когда синхронизация не нужна.

Пока остановился на том что для страницы(Search) на componentDidMount будет вызван экшен с данными из роутера, и стор синхронизируется
