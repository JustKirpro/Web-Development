import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return <div className="sidebar">
        <nav>
            <ul>
                <li><NavLink to="/" end>Домашняя страница</NavLink></li>
                <li><NavLink to="/books/title" end>Поиск книг по названию</NavLink></li>
                <li><NavLink to="/books/author" end>Поиск книг автора</NavLink></li>
                <li><NavLink to="/authors/name" end>Поиск авторов по имени</NavLink></li>
                <li><NavLink to="/books/to_read" end>Запланированные книги</NavLink></li>
                <li><NavLink to="/books/read" end>Прочитанные книги</NavLink></li>
                <li><NavLink to="/books/new" end>Добавить книгу</NavLink></li>
                <li><NavLink to="/authors/new" end>Добавить автора</NavLink></li>
            </ul>
        </nav>
    </div>
}

export default Sidebar;