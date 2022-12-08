import {useNavigate} from 'react-router-dom'

const AuthorCard = ({author}) => {
    const navigate  = useNavigate()

    return <div className="card" onClick={() => navigate(`/authors/${author.author_id}`)}>
        <h3>{author.name}</h3>
    </div>
}

export default AuthorCard;