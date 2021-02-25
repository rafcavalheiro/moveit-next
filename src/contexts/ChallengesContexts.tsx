import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
}

interface ChallengesContextData {
    level: number;
    currenteExperience: number;
    challengeComleted: number;
    experienceToNextLevel: number;
    activeChallenge: object;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currenteExperience, setCurrenteExperience] = useState(0);
    const [challengeComleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    })

    function levelUp() {

        setLevel(level + 1);

    }

    function startNewChallenge() {

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })

        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completedChallenge() {

        if (!activeChallenge) { //Challenge diferente de ativo não retono nada
            return;
        }
        const { amount } = activeChallenge;

        let finalExperience = currenteExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrenteExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeComleted + 1);

    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currenteExperience,
            levelUp,
            challengeComleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completedChallenge
        }}
        >

            {children}

        </ChallengesContext.Provider>
    )
}