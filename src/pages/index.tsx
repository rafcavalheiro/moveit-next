import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/CountDown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';


import styles from '../styles/page/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
        <section>

          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>

            <ChallengeBox />

          </div>

        </section>
      </CountdownProvider>


    </div>
  )

}
