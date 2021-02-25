import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/rafcavalheiro.png" alt="Rafael Cavalheiro" />
            <div>
                <strong>Rafael Cavalheiro</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}

                </p>
            </div>
        </div>
    );
}