import { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { BalanceDisplay }  from '../components/BalanceDisplay'
import  Donateproject  from '../components/Donateproject'

export const AppBar: FC = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
      console.log({balance})
    }, [balance])
    
    return (
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={30} width={200} />
            <span>Donation Portal</span>
            <BalanceDisplay setBalance={setBalance} balance={balance}/>
            <WalletMultiButton />
        </div>
    )
}