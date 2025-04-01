import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const emailList = [
    "admin@gmail.com",
    "admin@example4.com",
    "admin@example3.com",
    "admin@example1.com",
];

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [emailGenerated, setEmailGenerated] = useState(false);

    const navigate = useNavigate();

    const generateEmail = () => {
        setSpinning(true);
        setTimeout(() => {
            const randomEmail = emailList[Math.floor(Math.random() * emailList.length)];
            setEmail(randomEmail);
            setSpinning(false);
            setEmailGenerated(true);
        }, 2000);
    };

    const handleLogin = () => {
        console.log("Вход с почтой:", email, "и паролем:", password);
        navigate("/");
    };

    const isLoginEnabled = emailGenerated && password.trim().length > 0;

    return (
        <div className={styles.container}>
            <motion.button
                onClick={generateEmail}
                whileTap={{ scale: 0.9 }}
                className={styles.buttonPrimary}
            >
                🎰 Мы помним тебя *клик* 🎰
            </motion.button>
            <motion.div
                animate={{ rotate: spinning ? 360 : 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className={styles.emailBox}
            >
                {spinning ? "🎰 ... 🎰" : email || "E-mail"}
            </motion.div>
            <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
            />
            <motion.button
                onClick={handleLogin}
                whileTap={{ scale: 0.9 }}
                className={`${styles.buttonSecondary} ${isLoginEnabled ? styles.active : styles.disabled}`}
                disabled={!isLoginEnabled}
            >
                🚀 Войти 🚀
            </motion.button>
        </div>
    );
};

export default Login;