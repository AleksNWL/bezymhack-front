import PasswordGame from '../../components/PasswordGame/PasswordGame';
import './style.css'

const RegistationPage = () => {
    return (
        <div className="page-container">
            <h1>Регистрация</h1>
            <PasswordGame />
        </div>
    );
};

export default RegistationPage;