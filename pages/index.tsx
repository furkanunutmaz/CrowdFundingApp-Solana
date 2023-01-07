import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import project from '..//public/project.json'
import  Donateproject  from '../components/Donateproject'
import { BalanceDisplay }  from '../components/BalanceDisplay'
import { useEffect, useState } from 'react'


const Home: NextPage = (props) => {

  const [balance, setBalance] = useState(0);
  useEffect(() => {
    console.log({balance})
  }, [balance])
  
  return (
    <div className={styles.App}>
      <Head>
        <title>Donation Portal</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
        <AppBar />
        <div className={styles.AppBody}>
        {project.map(project => (
					<Donateproject key={project.id} project={project} balance={balance}/>
				))}
        </div>

    </div>
  );
}

export default Home;