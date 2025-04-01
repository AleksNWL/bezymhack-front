import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RuleList, { Rule } from '../RuleList/RuleList';
import './PasswordGame.css';

interface FormValues {
    email: string;
    password: string;
}

const initialRules: Rule[] = [
    {
        id: 1,
        description: "Пароль состоит из минимум 5 символов",
        validator: (pwd) => pwd.length >= 5,
        isActive: false,
        isCompleted: false,
    },
    {
        id: 2,
        description: "Пароль должен содержать цифру",
        validator: (pwd) => /\d/.test(pwd),
        isActive: false,
        isCompleted: false,
    },
    {
        id: 3,
        description: "Пароль должен содержать специальный символ (!@#$%^&*)",
        validator: (pwd) => /[!@#$%^&*]/.test(pwd),
        isActive: false,
        isCompleted: false
    },
    {
        id: 4,
        description: "Пароль должен содержать заглавную букву",
        validator: (pwd) => /[A-Z]/.test(pwd),
        isActive: false,
        isCompleted: false
    },
    {
        id: 5,
        description: "Сумма цифр в пароле должна быть равна 25",
        validator: (pwd) => {
            const sum = pwd.split('').reduce((acc, char) => {
                const num = parseInt(char);
                return acc + (isNaN(num) ? 0 : num);
            }, 0);
            return sum === 25;
        },
        isActive: false,
        isCompleted: false
    },
    {
        id: 6,
        description: "Пароль должен содержать букву 'X' (регистр не важен)",
        validator: (pwd) => /x/i.test(pwd),
        isActive: false,
        isCompleted: false
    },
    {
        id: 7,
        description: "Длина пароля должна быть не менее 10 символов",
        validator: (pwd) => pwd.length >= 10,
        isActive: false,
        isCompleted: false
    },
    {
        id: 8,
        description: `Пароль должен содержать текущий год (${new Date().getFullYear()})`,
        validator: (pwd) => pwd.includes(new Date().getFullYear().toString()),
        isActive: false,
        isCompleted: false
    },
    {
        id: 9,
        description: "Пароль должен содержать римскую цифру (I, V, X, L, C, D, M)",
        validator: (pwd) => /[IVXLCDM]/i.test(pwd),
        isActive: false,
        isCompleted: false
    },
    {
        id: 10,
        description: "Пароль должен быть палиндромом",
        validator: (pwd) => {
            const cleaned = pwd.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            return cleaned === cleaned.split('').reverse().join('');
        },
        isActive: false,
        isCompleted: false
    },
];

const PasswordGame = () => {
    const [password, setPassword] = useState('');
    const [rules, setRules] = useState<Rule[]>(initialRules);
    const [gameWon, setGameWon] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log("Отправленные данные:", data);
    };

    useEffect(() => {
        let lastValidIndex = -1;

        const updatedRules = rules.map((rule, index) => {
            const isValid = index <= lastValidIndex + 1 ? rule.validator(password) : false;
            if (isValid && index === lastValidIndex + 1) lastValidIndex = index;

            return {
                ...rule,
                isCompleted: isValid,
                isActive: index <= lastValidIndex + 1
            };
        });

        setRules(updatedRules);
        setGameWon(lastValidIndex === rules.length - 1);
    }, [password]);

    return (
        <div className="password-game">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    E-mail:
                    <input {...register("email", {
                        required: "Email обязателен",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Неверный формат email" }
                    })} />
                </label>
                {errors.email && <p>{errors.email.message}</p>}

                <label>
                    Пароль:
                    <input
                        type="text"
                        {...register("password", {
                            required: "Пароль обязателен",
                            validate: (value) => rules.every(rule => rule.validator(value)) || "Пароль не соответствует правилам"
                        })}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {errors.password && <p>{errors.password.message}</p>}

                <RuleList rules={rules} />

                {gameWon && <div className="win-message">🎉 Поздравляем! Вы выиграли!</div>}
                <button type="submit" disabled={!gameWon}>Отправить</button>
            </form>
        </div>
    );
};

export default PasswordGame;