import {useState} from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ChangeEventHandler } from 'react';
import { Provider } from 'react-redux';


const PROGRAM_ID = new Web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

function Donateproject({project, balance}) {

    const [txSig, setTxSig] = useState('');
    const { connection } = useConnection();
    const [amount, setAmount] = useState<number>(1)
    const { publicKey, sendTransaction } = useWallet();
    const link = () => {
        return (txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : '')
    }

    // donate function
    const paySolana = () => {

    if (!connection || !publicKey) { 
        alert("Please connect your wallet first lol")
        return
    }

    const transaction = new Web3.Transaction()
    const recipientPubKey = new Web3.PublicKey(project.adress)
    console.log(amount)
     const sendSolInstruction = Web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubKey,
            lamports: LAMPORTS_PER_SOL * amount * project.price
     })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection).then(sig => {
            setTxSig(sig)
    })

    alert("Thanks for your donate! You are now a stakeholder of this project ")
}



    const donateAmount = (event) => {
        const newData = event.target.value
        console.log(event)
        if (newData){
            setAmount(+newData)
        }
        else{
            setAmount(1)
        }
    }

	return (
		<>
			<div className="project">
				<img src={project.image} alt=""/>
				<h6>{project.title}</h6>
				<div className="price"> Unit price is ${project.price}</div>
				<div className="actions">
                    <input id = "amount" className='amount' onChange={donateAmount}/>
					<button className="pay-btn" onClick={paySolana}> Donate </button>
                    {/* disabled={project.price*amount*LAMPORTS_PER_SOL > balance} */}
				</div>



				<style jsx>{`
                  .project {
                    padding: 15px;
                    background: #fff;
                    border: 1px solid #ddd;
                    margin-bottom: 20px;
                    width: 24%;
                  }
                  .project img {
                    width: 100%;
                  }
                  .project h6 {
                    font-size: 20px;
                    margin-bottom: 10px;
                    color: black;
                  }
                  .project .price {
                    font-size: 20px;
                    color: #179b17;
                  }
                  .project .useradress {
                    color: #179b17;
                  }
                  .project .actions {
                    display: flex;
                    align-items: center;
                    margin-top: 15px;
                  }
                  .actions button {
                    height: 40px;
                    padding: 0 15px;
                    flex: 1;
                    cursor: pointer;
                  }
                  .actions button[disabled] {
                    opacity: .3;
                    cursor: not-allowed;
                  }
                  .actions .buy-btn {
                    background: #61dafb;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 0 4px 4px 0;
                  }
                  .actions .pay-btn {
                    background: #ccc;
                    font-size: 16px;
                    color: #333;
                    font-weight: 500;
                    border-radius: 4px 0 0 4px;
                  }
                  .project .amount {
                    width: 40px;
                    text-align: center;
                    border: 1px solid #ddd;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    font-weight: bold;
                    color: #555;
                  }
				`}</style>
			</div>
		</>
	)
}

export default Donateproject