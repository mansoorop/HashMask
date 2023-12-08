import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount } from 'wagmi';
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import React from "react";
import { EtherInput } from '../components/scaffold-eth/Input/EtherInput';
import { useScaffoldContractWrite } from '../hooks/scaffold-eth/useScaffoldContractWrite';
import { formatEther, parseEther } from "viem";
const Home: NextPage = () => {
  const {address} = useAccount();

  const [toAddress, setToAddress] = React.useState('')
  const [etherAmount, setEtherAmount] = React.useState('')

  const {data: balance} = useScaffoldContractRead ({
    contractName : "YourContract",
    functionName : "balance",
    args: [address],
  });

  const { writeAsync:transfer} = useScaffoldContractWrite ({
    contractName: "YourContract",
    functionName: "transfer",
    args: [toAddress,parseEther(etherAmount)],

  });


  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">"Hello World"
          <Address address = {address} />
          <div className = "p-4 text-4xl"> 
            {balance ? formatEther(balance) : "..."}
      </div>

      <div>SEND FAKE TOKEN TO:</div>
      <div className="p-2">
            <AddressInput 
              value={toAddress}
              placeholder="0x..."
              onChange={v => {
                setToAddress(v)
            }}
            />
      </div>
      <div className="p-2">
            <EtherInput 
              value={etherAmount}
              placeholder="0"
              onChange={v => {
                setEtherAmount(v)
            }}
            />
      </div>
      <div className="p-2">
        <button className="btn btn-primary" onClick={()=> {
         transfer();
        }}>SEND</button>
      </div>
      </div>
    </>
  );
};

export default Home;
