# todo

## Внутренняя страница
- [ ] Реализовать форму поиска
  - [ ] SpeechAPI
  - [ ] Параметры сортировки и т.д.
- [ ] Пагинация
- [x] `.SpeechRecognition__microphone` переделать в отдельный компонент
- [ ] Анимация MicrophoneButton во время распознавания
- [ ] Анимация на смену текста Speak now -> Listening...
- [x] Закрытие Drodown при клике из вне

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
В контейнере читать значение из урла, пробрасывать в компонент, в компоненте на componentWillReceiveProps сравнивать предыдущее init значение и новое. Если они поменялись, пришло новое инит значение, устанавливаем его. Если мы еще храним состояние компонента в сторе, вызываем экшен обновления. Пробую. Реализовать получилось.

Теперь новая проблема, т.к. по сути компонент отвечает за синхронизацию урла и стора, то мы должны рендерить компоненть чтобы синхронизироваться. Но по интерфейсу, компонента нет, пока выбраны дефолтные значения. Возможное решение: синхронизировать состояние в сторе, на экшен LOCATION_CHANGE.

## Попытка №2
Синхронизировать состояние стора на экшен LOCATION_CHANGE.

Недостаток: т.к. редьюсер всегда в сторе, при хождении по другим страницам сайта, состояние тоже может синхронизироваться.

Когда нам нужна синхронизация стора? Когда мы на странице поиска.

Решение: запускать синхронизацию только на странице поиска, когда она создается. И останавливать синхронизацию при размонтировании.

Когда запускать запрос данных от API? По экшену. И при изменении урла. Изменение урла слушает функция синхронизации, возможно стоит и в ней запускать поиск?

Функция поиска должна быть отдельной сагой, и иметь доступ к предыдущему набору параметров поиска, если текущий набор отличается от предыдущего - запустить поиск.

## Dropdown
Как получать значение выбранного пункта при монтировании? Пока мне решение не особо нравится. Почему выбрал такое решение? Это эксперимент на тему компзиции элементов.

### Попытка №3
Идея синхронизировать состояние на LOCATION_CHANGE- остается. Но она будет всегда, а не только при монтировании компонента. Я не хотел синхронизировать состояние если мы не на странице поиска. Но мы можем это проверять в payload LOCATION_CHANGE.


------------

С текущим подходом синхронизация стора на LOCATION_CHANGE допускает скрытое использование функций поиска. Например один из выпадающих списков будет скрыт, данные все равно попадут в стор и поиск будет с учетом этого значения. Выглядит как скрытой использование. Значит возвращаемся к идее инициализации значения из компонента.

Компонент через пропсы будет получать значение и из стора и из роутера. На componentDidMount взять значение из роута, если значение не пустое породить экшен. На родителе, в нашем случае SearchPage на componentDidMount повесить запуск поиска. Считаем что сначала инициализируются потомки(возьмут значения из роута и обновят стор), и к моменту didMount страницы стор будет актуальным.

Забыл совсем что FilterToolbar, компонент который содержит фильтры, не рендерится пока не выполнятся некоторые условия... Значит инициализация должна быть выше. Тогда инициализация будет в SearchPage. Нет пока пусть будет в саге, там вся логика.
