import React from 'react';
import './RuleList.css';

export interface Rule {
    id: number;
    description: string;
    validator: (password: string) => boolean;
    isActive: boolean;
    isCompleted: boolean;
}

interface RuleListProps {
    rules: Rule[];
}

const RuleList: React.FC<RuleListProps> = ({ rules }) => {
    return (
        <div className="rules-list">
            {rules.filter(rule => rule.isActive).map(rule => (
                <div
                    key={rule.id}
                    className={`rule ${rule.isCompleted ? 'completed' : ''}`}
                >
                    {rule.isCompleted ? <span style={{ color: 'var(--neon-green)' }}>✓   </span> : <span style={{ color: 'var(--hacker-red)' }}>✗   </span>}
                    {rule.description}
                </div>
            ))}
        </div>
    );
};

export default RuleList;