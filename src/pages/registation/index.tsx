import PasswordGame from '../../components/PasswordGame/PasswordGame';
import './style.css'

const PasswordGamePage = () => {
    return (
        <div className="page-container">
            <h1>Регистрация</h1>
            <PasswordGame />
        </div>
    );
};

export default PasswordGamePage;