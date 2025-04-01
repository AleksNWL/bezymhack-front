
import "./app.css";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Registation from "./pages/registation";
import Main from './pages/Main/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const symbols = ["$", "€", "¥", "₽", "£", "₩", "₹"];

type CurrencyElement = {
    id: number;
    symbol: string;
    left: string;
    animationDuration: string;
};

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Main />} />
//       </Routes>
//     </Router>
//   )
// }


const App = () => {
    const [currencyElements, setCurrencyElements] = useState<CurrencyElement[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrencyElements((prev: CurrencyElement[]) => [
                ...prev,
                {
                    id: Math.random(),
                    symbol: symbols[Math.floor(Math.random() * symbols.length)],
                    left: Math.random() * 100 + "vw",
                    animationDuration: Math.random() * 3 + 2 + "s",
                },
            ]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="money-background">
            <h1 className="title">Добро пожаловать в финансовое приложение</h1>
            {currencyElements.map((el) => (
                <span
                    key={el.id}
                    className="currency-symbol"
                    style={{ left: el.left, animationDuration: el.animationDuration }}
                >
          {el.symbol}
        </span>
            ))}
            <Registation/>
            <Login/>
        </div>
    );
};

export default App;