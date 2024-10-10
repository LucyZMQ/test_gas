// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import tokenAbi from './TokenAbi.json'
import Web3, { ERR_CONTRACT_RESOLVER_MISSING, eth } from 'web3';
import initialToken from './initializeAbi.json'
import add from './add.json'
import token from './token.json';
// import { ethers } from 'ethers'
// import lzqAbi from './lzq.json'
// import swapAbi from './swap.json'
// import liquidityAbi from './liquidity.json'
// import { wormhole } from "@wormhole-foundation/sdk";
// import pairAbi from './pair.json'
// import levelAbi from './upgradeLevel.json'
// import moment from 'moment'
// import minerFactotyAbi from './minerFactory.json'
// import SendAbi from './sendabi.json'
// import { Address, bytesToHex, Chain, encodeFunctionData, HDAccount, http, stringToBytes } from 'viem';
// import { arbitrumSepolia, LocalAccountSigner, SmartAccountSigner, UserOperationFeeOptions } from '@alchemy/aa-core';
// import { generatePrivateKey } from 'viem/accounts';
// import { LightAccountVersion } from './types';
// import { createMultiOwnerLightAccountClient } from './clients/multiOwnerLigheAccount';
// import { API_KEY } from './e2e-tests/constants';
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
  createMultiOwnerModularAccount,
} from "@alchemy/aa-accounts";
import { alchemyGasManagerMiddleware, AlchemyProvider, createAlchemyPublicRpcClient, createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { Chain, custom, encodeFunctionData, http } from "viem";
import { ethers, Result } from "ethers";
import { arbitrumSepolia, createSmartAccountClient, UserOperationFeeOptions, } from '@alchemy/aa-core';
import { createMultiOwnerLightAccountClient } from './clients/multiOwnerLigheAccount';
import { createMultiOwnerLightAccount } from './accounts/multiOwner';
import { LightAccountVersion } from './types';
import { Alchemy, Network } from 'alchemy-sdk';
import {
  createBundlerClient,
  createSmartAccountClientFromExisting,
  erc7677Middleware,
  LocalAccountSigner,
  type Address,
  type SmartAccountSigner,
} from "@aa-sdk/core";
import giftMuiAbi from './giftMui.json'

import giftCardAbi from './giftCardAbi.json'
import moment from 'moment';
import { local070Instance } from './test';


const provider = new ethers.JsonRpcProvider('https://arb-sepolia.g.alchemy.com/v2/N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP')

// const instance = local070Instance;

// const privateKey = "0x48da1836476b1ba69dc1a0a73edbbdedb285c939aea78cdd1e42db072d1537dc"

// const signers = LocalAccountSigner.privateKeyToAccountSigner(privateKey);
// let client: ReturnType<typeof instance.getClient>
// const givenConnectedProvider = ({
//   signer,
//   version = "v2.0.0",
//   accountAddress,
//   usePaymaster = false,
//   accountIndex,
// }: {
//   signer: SmartAccountSigner;
//   version?: LightAccountVersion<"MultiOwnerLightAccount">;
//   usePaymaster?: boolean;
//   accountAddress?: Address;
//   accountIndex?: bigint;
// }) =>
//   createMultiOwnerLightAccountClient({
//     signer,
//     accountAddress,
//     version,
//     transport: custom(client),
//     chain: instance.chain,
//     salt: accountIndex,
//     ...(usePaymaster ? erc7677Middleware() : {}),
//   });


function App() {









  // const testSigner = async () => {
  //   const privateKeys = "0x48da1836476b1ba69dc1a0a73edbbdedb285c939aea78cdd1e42db072d1537dc"


  //   const signers =
  //     LocalAccountSigner.privateKeyToAccountSigner(
  //       privateKeys
  //     );

  //   const provider = await givenConnectedProvider({
  //     signer: signers,
  //     usePaymaster: true,
  //     accountIndex: BigInt(1),
  //   });

  //   console.log('provider', provider)

  //   const uoCallData = encodeFunctionData({
  //     abi: token,
  //     functionName: "transfer",
  //     args: ["0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18", BigInt(String(1 * (10 ** 18)))],
  //   });
  //   console.log('1111', uoCallData)


  //   const result = await provider.sendUserOperation({
  //     uo: {
  //       target: '0x9B34a7d5da57e91eA70293c8cE023261c7F3b15d',
  //       data: uoCallData,
  //     },
  //   });

  //   console.log('result', result)

  //   const txHash = await provider.waitForUserOperationTransaction(result)

  //   console.log('txHash', txHash)
  // }




  const OnSigner = async () => {





    const chain = arbitrumSepolia;

    const Paymaster = "0x7347AF6a61Ea0C1a4120DA96B75138B66cd28b03"
    // 0x48da1836476b1ba69dc1a0a73edbbdedb285c939aea78cdd1e42db072d1537dc "0xe218939daa7db22a51b6fc3ce80634dc9e0d3582790a12baa2c09ba7a7b5a801"
    const privateKey = "0x48da1836476b1ba69dc1a0a73edbbdedb285c939aea78cdd1e42db072d1537dc"

    const signer =
      LocalAccountSigner.privateKeyToAccountSigner(
        privateKey
      );
    const rpc = "https://arb-sepolia.g.alchemy.com/v2/N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP"

    const account = await createMultiOwnerLightAccount({
      chain: chain,
      transport: http(rpc),
      signer: signer,

    })

    console.log('account', account)

    const alchemyClient = createAlchemyPublicRpcClient({
      connectionConfig: { rpcUrl: rpc },
      chain: chain,
    });

    const smartAccountClient = createSmartAccountClient({
      transport: http(rpc),
      chain,
      account: account,
      ducmmyPaymasterAndData: async (userop) => ({
        ...userop,
        paymasterAndData: `${Paymaster}`
      }),

      // ...alchemyGasManagerMiddleware(alchemyClient, {
      //   policyId: "dd7e103f-bb7f-4a8f-8e60-52f86b807fc8",
      //   // paymasterAddress: PAYMASTER_ADDRESS,
      // })

      // paymasterAndData: async (userop, opts) => {
      //   console.log('opts', userop, opts)
      //   // call your paymaster here to sponsor the userop
      //   // leverage the `opts` field to apply any overrides
      //   return {
      //     ...userop,
      //     paymasterAndData: Paymaster,
      //   };
      // },

    })

    console.log('smarAccountClient', smartAccountClient)

    // console.log('client', smartAccountClient)

    const ApproveuoCallData = encodeFunctionData({
      abi: token,
      functionName: "approve",
      args: [Paymaster, ethers.MaxUint256],
    });

    const uoCallData = encodeFunctionData({
      abi: token,
      functionName: "transfer",
      args: ["0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18", BigInt(String(1 * (10 ** 18)))],
    });
    console.log('1111', uoCallData)


    const result = await smartAccountClient.sendUserOperation({
      uo: {
        target: '0x9B34a7d5da57e91eA70293c8cE023261c7F3b15d',
        data: ApproveuoCallData,
      },
    });

    console.log('result', result)

    const txHash = await smartAccountClient.waitForUserOperationTransaction(result)

    console.log('txHash', txHash)


    // const client = await createModularAccountAlchemyClient({
    //   apiKey: "N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP", // replace with your Alchemy API Key
    //   chain: chain,
    //   signer: signer,
    //   gasManagerConfig: {
    //     policyId: "dd7e103f-bb7f-4a8f-8e60-52f86b807fc8", // replace with your policy id, get yours at https://dashboard.alchemy.com/
    //   },
    //   // accountAddress: '0x7CbDDFAF29832090314b0f1e723b3c8C3956Fc86'
    // });
    // console.log(client)



    // const uoCallData = encodeFunctionData({
    //   abi: token,
    //   functionName: "transfer",
    //   args: ["0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18", BigInt(String(Number(1) * (10 ** 18)))],
    // });

    // const result = await client.sendUserOperation({
    //   uo: {
    //     target: "0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18",
    //     data: uoCallData,
    //     value: BigInt(0)
    //   },
    // });

    // console.log('result', result)

    // const alchemyClient = createAlchemyPublicRpcClient({
    //   connectionConfig: { rpcUrl: rpc },
    //   chain: chain,
    // });


    // const smartAccountClient = await createMultiOwnerLightAccountClient({
    //   transport: http(rpc),
    //   chain: chain as any,
    //   account: {
    //     signer: signer
    //   }
    // })

    // console.log('client', smartAccountClient)
    // const accountAddress = smartAccountClient.account.address;


    // const transferredClient = await givenConnectedClient({
    //   chain: smartAccountClient.chain,
    //   signer: signer,
    //   accountAddress,

    // })

    // console.log('transferredClient', transferredClient)

    // const uoCallData = encodeFunctionData({
    //   abi: token,
    //   functionName: "transfer",
    //   args: ["0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18", BigInt(String(Number(1) * (10 ** 18)))],
    // });

    // const result = await transferredClient.sendUserOperation({
    //   uo: {
    //     target: "0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18",
    //     data: uoCallData,
    //     value: BigInt(0)
    //   },
    // });

    // console.log('result', result)

    // const signedMessageWith649 = await smartAccountClient.signMessageWith6492(
    //   "test"
    // )

    // const signedTypedData = await smartAccountClient.signTypedData("test");

    // // sign typed data (works for undeployed and deployed accounts), using
    // const signedTypedDataWith6492 = await smartAccountClient.signTypedDataWith6492({
    //   types: {
    //     Request: [{ name: "hello", type: "string" }],
    //   },
    //   primaryType: "Request",
    //   message: {
    //     hello: "world",
    //   },
    // });

    // get on-chain account owner address
    // const ownerAddress = await smartAccountClient.account.getOwnerAddresses();
    // const accountAddress = smartAccountClient.getAddress();

    // console.log('owner', ownerAddress, accountAddress)

    // transfer ownership
    // const newOwner = LocalAccountSigner.privateKeyToAccountSigner(
    //   privateKey
    // );
    // const hash = await smartAccountClient.({
    //   newOwner,
    //   waitForTxn: true, // wait for txn with UO to be mined
    // });
    // const version = "v2.0.0"

    // const privateKey = "0xf2e61af44c7c9fe5312705ccaa8b6051596a87f43c24063dfe88df11a707eb71"

    // const signer: SmartAccountSigner<HDAccount> =
    //   LocalAccountSigner.privateKeyToAccountSigner(
    //     privateKey
    //   );

    // console.log('signer', signer)
    // const undeployedAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
    //   privateKey
    // );


    // const client = await givenConnectedClient({ signer, chain, version });
    // console.log('client', client)
    // const message = "test";


    // const signature = await client.account.signMessage({ message });
    // expect(
    //   await client.verifyMessage({
    //     address: client.account.address,
    //     message,
    //     signature,
    //   })
    // ).toBe(/*expected*/ true)

    // console.log('signature', signature)




    // const { account } = await givenConnectedClient({
    //   signer: undeployedAccountSigner,
    //   chain,
    // });

    // console.log("account", account)

    // const res1 = await account.signTypedDataWith6492({
    //   types: {
    //     Request: [{ name: "hello", type: "string" }],
    //   },
    //   primaryType: "Request",
    //   message: {
    //     hello: "world",
    //   },
    // })

    // console.log('res', res1)

    // const clients = await givenConnectedClient({ signer, chain });

    // const AlchemyTokenAbi = [
    //   {
    //     inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    //     name: "mint",
    //     outputs: [],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    // ];


    // const tx = {
    //   from: 
    // }

    // const uoCallData = encodeFunctionData({
    //   abi: token,
    //   functionName: "transfer",
    //   args: ["0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18", BigInt(String(Number(0.1) * (10 ** 18)))],
    // });

    // const result = await transferredClient.sendUserOperatin({
    //   uo: {
    //     target: "0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18",
    //     data: uoCallData,
    //     value: BigInt(String(Number(0.01) * (10 ** 18)))
    //   },
    // });

    // console.log('result', result)




    // const { parseUnits, parseEther } = ethers;

    // /* create provider */
    // const ALCHEMY_API_KEY = "N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP";
    // const provider = new AlchemyProvider({
    //   apiKey: ALCHEMY_API_KEY, // replace with your Alchemy API Key
    //   chain: arbitrumSepolia as any,
    // });

    // /* create signer */
    // const chain = arbitrumSepolia;
    // const PRIVATE_KEY =
    //   "0xf2e61af44c7c9fe5312705ccaa8b6051596a87f43c24063dfe88df11a707eb71";
    // const eoaSigner = LocalAccountSigner.privateKeyToAccountSigner(
    //   `0x${PRIVATE_KEY}`
    // );

    // /* connect the signer to provider */
    // const connectedProvider = provider.connect(
    //   (rpcClient) =>
    //     new LightSmartContractAccount({
    //       chain,
    //       owner: eoaSigner,
    //       factoryAddress: getDefaultLightAccountFactoryAddress(chain),
    //       rpcClient,
    //     })
    // );

    // /* encode an action */
    // const tokenAbi = [
    //   {
    //     inputs: [
    //       {
    //         internalType: "address",
    //         name: "receiver",
    //         type: "address",
    //       },
    //       {
    //         internalType: "uint256",
    //         name: "numTokens",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "transfer",
    //     outputs: [
    //       {
    //         internalType: "bool",
    //         name: "",
    //         type: "bool",
    //       },
    //     ],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    // ];

    // const tokenReceiver = "0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18";
    // const numberOfTokens = parseUnits("1", 18);

    // const uoCallData = encodeFunctionData({
    //   abi: tokenAbi,
    //   functionName: "transfer",
    //   args: [tokenReceiver, numberOfTokens],
    // });

    // /* execute the transaction */
    // const gasFee = parseEther("0.01");
    // const contractToInteract = "0x9B34a7d5da57e91eA70293c8cE023261c7F3b15d";

    // const uo = await connectedProvider.sendUserOperation({
    //   target: contractToInteract,
    //   data: uoCallData,
    //   value: gasFee,
    // });
    // console.log('uo', uo)

    // const txHash = await connectedProvider.waitForUserOperationTransaction(uo.hash);

    // console.log(txHash);



  }

  const url = 'https://arb-sepolia.g.alchemy.com/v2/N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP';

  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  const getReciveTconst = async () => {
    // const config = {
    //   apikey: 'v4lFtgETq3zJy5SFozS_lbimDPg2VBhH',
    //   network: Network.ARB_SEPOLIA
    // }

    // const alchemy = new Alchemy(config)

    // const toAddress = "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152";

    // const res = await alchemy.core.getAssetTransfers({
    //   fromBlock: "0x0",
    //   fromAddress: "0x0000000000000000000000000000000000000000",
    //   toAddress: toAddress,
    //   excludeZeroValue: true,
    //   category: ["erc721", "erc1155", "erc20"],
    // });

    // console.log(res);

    // https://arb-sepolia.g.alchemy.com/v2/v4lFtgETq3zJy5SFozS_lbimDPg2VBhH
    const url = 'https://arb-sepolia.g.alchemy.com/v2/N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP';

    // const web3 = new Web3(new Web3.providers.HttpProvider(url))


    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          // fromAddress: '0x546729D342C0400411B85bfE15A75853B9e1b53F',
          toAddress: "'0x546729D342C0400411B85bfE15A75853B9e1b53F'",
          // withMetadata: false,
          excludeZeroValue: true,
          // maxCount: "0x3e8",
          category: [
            "external",
            "erc20",
            "erc721", "erc1155"
          ]
        }
      ]
    });
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        web3.eth.getTransactionReceipt(data.result.transfers[0].hash).then(receipt => {
          if (receipt) {
            return web3.eth.getBlock(receipt.blockNumber)
          }
        }).then(block => {
          if (block) {
            console.log('trancaction time:', moment(Number(block.timestamp) * 1000).format('YYYY-MM-DD HH:mm:ss'), parseInt(data.result.transfers[0].rawContract.value, 16) / (10 ** 18))
          }
        })
        // console.log(data.result.transfers[0].blockNum, function (timestamp) {
        //   console.log('时间戳', timestamp)
        // })
      })
      .catch(error => console.error('Error:', error));










    // console.log('res', res)

  }


  const getTransfer = async () => {
    // const config = {
    //   apikey: 'v4lFtgETq3zJy5SFozS_lbimDPg2VBhH',
    //   network: Network.ARB_SEPOLIA
    // }

    // const alchemy = new Alchemy(config)

    // const toAddress = "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152";

    // const res = await alchemy.core.getAssetTransfers({
    //   fromBlock: "0x0",
    //   fromAddress: "0x0000000000000000000000000000000000000000",
    //   toAddress: toAddress,
    //   excludeZeroValue: true,
    //   category: ["erc721", "erc1155", "erc20"],
    // });

    // console.log(res);

    // https://arb-sepolia.g.alchemy.com/v2/v4lFtgETq3zJy5SFozS_lbimDPg2VBhH
    const url = 'https://arb-sepolia.g.alchemy.com/v2/N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP';

    // const web3 = new Web3(new Web3.providers.HttpProvider(url))


    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          fromAddress: '0x546729D342C0400411B85bfE15A75853B9e1b53F',
          // toAddress: "0x42FcD9DaB6D9a6D8d823ebc955DDa3d6238f8E18",
          // withMetadata: false,
          excludeZeroValue: true,
          // maxCount: "0x3e8",
          category: [
            "external",
            "erc20",
            "erc721", "erc1155"
          ]
        }
      ]
    });
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        web3.eth.getTransactionReceipt(data.result.transfers[0].hash).then(receipt => {
          if (receipt) {
            return web3.eth.getBlock(receipt.blockNumber)
          }
        }).then(block => {
          if (block) {
            console.log('trancaction time:', moment(Number(block.timestamp) * 1000).format('YYYY-MM-DD HH:mm:ss'), parseInt(data.result.transfers[0].rawContract.value, 16) / (10 ** 18))
          }
        })
        // console.log(data.result.transfers[0].blockNum, function (timestamp) {
        //   console.log('时间戳', timestamp)
        // })
      })
      .catch(error => console.error('Error:', error));










    // console.log('res', res)

  }
  const getHash = () => {

    let web3 = new Web3()

    let hash = web3.utils.keccak256('4763')
    console.log('hash', hash)
  }

  const creategiftCard = async () => {

    // const chain = arbitrumSepolia;
    // const privateKeys = "0xe218939daa7db22a51b6fc3ce80634dc9e0d3582790a12baa2c09ba7a7b5a801"

    // const signer =
    //   LocalAccountSigner.privateKeyToAccountSigner(
    //     privateKeys
    //   );
    // const rpc = "https://arb-sepolia.g.alchemy.com/v2/N2y00I64lx3TGpMiFDcu3Tx1Q5asJMuP"

    // const account = await createMultiOwnerLightAccount({
    //   chain: chain,
    //   transport: http(rpc),
    //   signer: signer
    // })

    // const alchemyClient = createAlchemyPublicRpcClient({
    //   connectionConfig: { rpcUrl: rpc },
    //   chain: chain,
    // });

    // const smartAccountClient = createSmartAccountClient({
    //   transport: http(rpc),
    //   chain,
    //   account: account,
    //   // dummyPaymasterAndData: async (userop: any) => ({
    //   //   ...userop,
    //   //   paymasterAndData: `0x478Aa404Ac0189321E1F2BE6E4802a2d7103FeB5`,
    //   // }),
    //   ...alchemyGasManagerMiddleware(alchemyClient, {
    //     policyId: 'dd7e103f-bb7f-4a8f-8e60-52f86b807fc8',
    //     // paymasterAddress: '0x478Aa404Ac0189321E1F2BE6E4802a2d7103FeB5'
    //   })
    // })

    // console.log('client', smartAccountClient)

    // const uoCallData = encodeFunctionData({
    //   abi: token,
    //   functionName: "approve",
    //   args: ['0x26c955e314219310c60e6c6438Dc1B879C6c322A', BigInt(String(Number(10)) * (10 ** 18))],
    // });
    // console.log('1111', uoCallData)


    // const result = await smartAccountClient.sendUserOperation({
    //   uo: {
    //     target: '0x9B34a7d5da57e91eA70293c8cE023261c7F3b15d',
    //     data: uoCallData,
    //   },
    // });

    // console.log('result', result)

    // const txHash = await smartAccountClient.waitForUserOperationTransaction(result)

    // console.log('txHash', txHash)

    let web3 = new Web3()

    let hash = web3.utils.keccak256('1980')
    console.log('hash', hash)

    const privateKey = "0xe218939daa7db22a51b6fc3ce80634dc9e0d3582790a12baa2c09ba7a7b5a801"
    let wallet = new ethers.Wallet(privateKey, provider)

    const contract = new ethers.Contract('0x9B34a7d5da57e91eA70293c8cE023261c7F3b15d', token, provider)



    let contractWithSigner = contract.connect(wallet)

    let tx = await contractWithSigner.approve('0x26c955e314219310c60e6c6438Dc1B879C6c322A', BigInt(String(10 * (10 ** 18))))

    console.log('hash111', tx)

    // const privateKey = "0xe218939daa7db22a51b6fc3ce80634dc9e0d3582790a12baa2c09ba7a7b5a801"
    // let wallet = new ethers.Wallet(privateKey, provider)

    // const contract = new ethers.Contract('0x26c955e314219310c60e6c6438Dc1B879C6c322A', giftCardAbi, provider)



    // let contractWithSigner = contract.connect(wallet)

    // let tx = await contractWithSigner.createGift(hash, '0x9B34a7d5da57e91eA70293c8cE023261c7F3b15d', '2000000', 0, '2', 'test', 'code gift 1980')

    // console.log('hash', tx.hash)





  }

  const getTransactionReceipt = async () => {

    const contract = new web3.eth.Contract(giftMuiAbi, '0x16B5e5798c9Da5192D676Da861241d0A69bE5Efa')

    const events = contract.getPastEvents('allEvents').then((res) => {
      console.log('res', res)
    })

    console.log('event', events)

    // const receipt = await provider.getTransactionReceipt('0x4bc78a8a90d22962f33f78335bd5e67e8642f3573cda40939b4f07a12a2fa63a')
    // const receiptLogs = await provider.getTransaction('0x4bc78a8a90d22962f33f78335bd5e67e8642f3573cda40939b4f07a12a2fa63a')

    // console.log('receipt', receiptLogs, receipt)

  }

  const onIndexDB = () => {
    let db;
    var request = indexedDB.open("Database", 7);

    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      // 如果尚未创建，则创建一个新的对象存储空间
      var objectStore;
      if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', { keyPath: 'id' });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
      }

      console.log('db', db)




    };
    // console.log('request', request)

    request.onsuccess = function (event) {
      const db = event.target.result

      var transaction = db.transaction(['person']);
      var objectStore = transaction.objectStore('person');
      var request = objectStore.get(1);

      request.onerror = function (_event) {
        console.log('事务失败');
      };

      request.onsuccess = function (_event) {
        console.log('result', request)
        if (request) {
          console.log('Name: ' + request.result.name);
          console.log('Age: ' + request.result.age);
          console.log('Email: ' + request.result.email);
        } else {
          console.log('未获得数据记录');
          var request = db.transaction(['person'], 'readwrite')
            .objectStore('person')
            .add({ id: 1, name: '张三', email: 'zhangsan@example.com' });
          request.onsuccess = function (_event) {
            console.log('数据写入成功');
          };

          request.onerror = function (event) {
            console.log('数据写入失败', event);
          }

        }
      };

      // const trans = db.transaction(['tokens'], "readwrite")

      // const object = trans.objectStore('tokens')

      // const res = object.add({ ssn: '1', keys: "0xe218939daa7db22a51b6fc3ce80634dc9e0d3582790a12baa2c09ba7a7b5a801" })

      // res.onsuccess = (event) => {
      //   console.log('event', event)
      // }


      // const transaction = db.transaction(['tokens'])
      // const objectStores = transaction.objectStore('tokens')



      // // objectStores.add({ 'value': "0xe218939daa7db22a51b6fc3ce80634dc9e0d3582790a12baa2c09ba7a7b5a801" })
      // const requests = objectStores.get('1')





      // requests.onerror = (event) => {
      //   console.log('失败')
      // }

      // requests.onsuccess = (event) => {
      //   console.log('objectchengg', requests, event.target.result)
      // }




    }




  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Button onClick={OnSigner}>
          al Signer
        </Button>
        <Button onClick={getTransfer}>
          getTransfers
        </Button>
        <Button onClick={getHash}>
          getHash
        </Button>

        <Button onClick={creategiftCard}>
          craeteGiftCard

        </Button>

        <Button onClick={getTransactionReceipt}>
          getTransactionReceipt

        </Button>
        <Button onClick={onIndexDB}>
          indexDB

        </Button>

      </header>
    </div>
  );
}

export default App;
