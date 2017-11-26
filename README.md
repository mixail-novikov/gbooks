# todo

## Внутренняя страница
- [ ] Реализовать форму поиска
  - [ ] SpeechAPI
  - [ ] Параметры сортировки и т.д.
- [ ] Пагинация
- [x] `.SpeechRecognition__microphone` переделать в отдельный компонент
- [ ] Анимация MicrophoneButton во время распознавания
- [ ] Анимация на смену текста Speak now -> Listening...

## BookInfo

1. Вынести генерацию ссылки для поиска автора

## В дальний ящик
- Suggestions https://www.npmjs.com/package/suggestion


1. Как синхронизировать урл и состояние при первой загрузке?

Была идея слушать LOCATION_CHANGE, но так получается что мы слушаем всегда + можем слушать тогда, когда синхронизация не нужна.

Пока остановился на том что для страницы(Search) на componentDidMount будет вызван экшен с данными из роутера, и стор синхронизируется


## Отличия от реального приложения Google Books

1. Поиск по автору доступен не для всех, но т.к. из API это не понятно, у нас этот поиск доступен для всех авторов
2. API не отдает ключ для поиска editions:, поэтому не доступна ссылка More editions
3. В исходном коде страницы уже зашит размер изображения, из API мы этот резмер не знаем, поэтому при загрузке картинок пункты "скачут"

## Thoughts
Роутер. Синхронизация стора. Получение данных от API. Надо определиться что я хочу.
- Я хочу, при изменении параметров урла, обновлять состояние(синхронизировать) стор. Обязательно учесть - из урла могут приходить неправильные значения.
- Я хочу менять состояние из компонента
- Я хочу запускать поиск только по кнопке поиска
- Я хочу запускать поиск при изменении параметров урла.

### Попытка №1:
В контейнере читать значение из урла, пробрасывать в компонент, в компоненте на componentWillReceiveProps сравнивать предыдущее init значение и новое. Если они поменялись, пришло новое инит значение, устанавливаем его. Если мы еще храним состояние компонента в сторе, вызываем экшен обновления. Пробую.
