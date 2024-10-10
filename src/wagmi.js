import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { metaMask, injected } from 'wagmi/connectors'

// const projectId = '478f855626cc6accea10d579d2b1fcf1';

export const config = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [metaMask(), injected()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http()
  }
})
