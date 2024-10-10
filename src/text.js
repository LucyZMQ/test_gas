// 引入Web3模块
const Web3 = require('web3')

// 初始化Web3提供者，连接到以太坊节点
const web3 = new Web3('https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae') // 替换为你的Infura项目ID



// 获取合约的ABI
const contractAbi =

  // 创建合约实例


  // 发送测试币
  contract.methods.mint().send({
    from: sender,
    to: receiver,
    value: amount
  }, (error, transactionHash) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Transaction hash:', transactionHash)
    }
  })