const HomePage = () => {
    return <>
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>My Books App</h1>
            My Books App - простое React приложения для отслеживания списков прочтённых и запланированных к прочтению книг.
            <h2>Функциональные возможности приложения</h2>
            Работа с книгами:
            <ul>
                <li>Добавление новой книги</li>
                <li>Перевод существующей книги из планируемых к прочтению в прочтённые</li>
                <li>Перевод существующей книги из прочтённых в планируемые к прочтению</li>
                <li>Редактирование существующей книги</li>
                <li>Удаление существующей книги</li>
            </ul>
            Работа с авторами:
            <ul>
                <li>Добавление нового автора</li>
                <li>Редактирование существующего автора</li>
                <li>Удаление автора</li>
            </ul>
            Поиск:
            <ul>
                <li>Поиск книги по названию</li>
                <li>Поиск автора по имени</li>
                <li>Поиск всех планируемых к прочтению книг (можно указать язык)</li>
                <li>Поиск всех прочитанных книг</li>
                <li>Поиск всех книг выбранного автора (можно указать язык и статус книг)</li>
            </ul>
        </div>
    </>
}

export default HomePage;