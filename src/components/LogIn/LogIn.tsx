import { useState } from "react";


interface Email {
    email: string;
}

const Login = () => {
    const [email, setEmail] = useState<Email.email>('');
    const [password, setPassword] = useState<string>('');
}

export default Login;