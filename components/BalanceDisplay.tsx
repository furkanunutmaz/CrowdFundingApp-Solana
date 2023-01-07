import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {FC, useEffect, useState } from 'react'

export const BalanceDisplay = ({setBalance, balance}) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) { return }

        connection.getAccountInfo(publicKey).then(info => {
            setBalance(info.lamports);
        })
    }, [connection, publicKey])

    return (
        <div className='Balance'>
            <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL}` : ''}</p>

            <style jsx>{`
                  .Balance {  
                    padding-left: 600px;
                    font-size: 20px;
                    color: #179b17;
                    align-items: center;
                    display: flex;
                  }
				`}</style>


        </div>

        
    )
}