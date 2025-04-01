import React, { useState } from 'react';
import CardsSection from '../../components/CardsSection/CardsSection';
import { CardsForm } from '../../components/CardsForm/CardsForm'
import { CardType } from '../../types/Card';

const Main: React.FC = () => {
    const [data, setData] = useState<Array<CardType>>([]);


    return (
        <>
            <CardsForm cards={data} setCards={setData}></CardsForm>
            <CardsSection changeArray={setData} getArray={() => data}></CardsSection>
        </>
    );
};

export default Main;
