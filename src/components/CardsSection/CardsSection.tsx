import React, { useEffect } from 'react';
import { Card } from 'antd';
import { CardType } from "../../types/Card"
import { ApiClient } from '../../api';
import { Purchase } from '../../types/ApiTypes';

interface CardsSectionProps {
    changeArray: (array: Array<CardType>) => void;
    getArray: () => Array<CardType>;
}

const CardsSection: React.FC<CardsSectionProps> = ({ changeArray, getArray }) => {
    useEffect(() => {
        const fetchData = async () => {
            const api = new ApiClient()
            api.getAllPurchases()
                .then((purchases: Purchase[]) => {
                    console.log("Purchases", purchases)
                })
            const mockData: Array<CardType> = [
                { id: 1, title: 'Card 1', description: 'This is card 1', price: 234, x: 0, y: 0 },
                { id: 2, title: 'Card 2', description: 'This is card 2', price: 244, x: 0, y: 0 },
                { id: 3, title: 'Card 3', description: 'This is card 3', price: 254, x: 0, y: 0 },
                { id: 4, title: 'Card 4', description: 'This is card 4', price: 245, x: 0, y: 0 },
                { id: 5, title: 'Card 5', description: 'This is card 5', price: 249, x: 0, y: 0 },
            ]

            const initializedData = mockData.map((item) => ({
                ...item,
                x: Math.random() * (window.innerWidth - 300),
                y: Math.random() * 400,
            }));

            setTimeout(() => changeArray(initializedData), 500); //здесь запрос в сервис
        };

        fetchData();
    }, [changeArray]);

    const dropPosition = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text/plain');
        const data = getArray();
        const cardIndex = data.findIndex((item: { id: number }) => item.id.toString() === id);
        if (cardIndex !== -1) {
            const updatedData = [...data];
            let x = e.clientX - 150;
            let y = e.clientY - 50;

            const cardWidth = 300;
            const cardHeight = 100;
            const screenWidth = window.innerWidth;
            const screenHeight = 500;

            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x + cardWidth > screenWidth) x = screenWidth - cardWidth;
            if (y + cardHeight > screenHeight) y = screenHeight - cardHeight;

            updatedData[cardIndex] = {
                ...updatedData[cardIndex],
                x,
                y,
            };
            changeArray(updatedData);
        }
    };

    const data = getArray();
    console.log(data)
    return (
        <div
            style={{
                position: 'relative',
                height: '500px',
                width: '100%',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={dropPosition}
        >
            {data.map((item: { id: number; title: string; description: string; price: number; x: number; y: number }) => (
                <Card
                    key={item.id}
                    title={item.title}
                    style={{
                        position: 'absolute',
                        top: item.y,
                        left: item.x,
                        width: 300,
                        cursor: 'grab',
                    }}
                    extra={`Потрачено: ${item.price}р`}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', item.id.toString());
                    }}
                >
                    <p>{item.description}</p>
                </Card>
            ))}
        </div>
    );
};

export default CardsSection;
