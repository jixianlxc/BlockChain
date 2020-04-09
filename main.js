//区块链

//block
const sha256 = require('crypto-js/sha256')

class Block {
    constructor(data, previousHash) {
        this.previousHash = previousHash //上一个区块的哈希值
        this.data = data //区块的数据
        this.hash = this.computeHash() //区块的哈希值
    }
    computeHash() {
        return sha256(this.data + this.previousHash).toString()
    }
    //计算出符合区块链难度要求的hash
    mine() {

    }
}

class Chain {
    constructor() {
        this.chain = [this.bigBang()]
        this.difficulty = 1
    }
    //生成祖先区块
    bigBang() {
        const genesisBlock = new Block('祖先区块', '')
        return genesisBlock
    }
    //获取链上最新的一个区块
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    //把一个区块加到链上
    addBlockToChain(newBlockData) {
        let newBlock = new Block(newBlockData, this.getLatestBlock().hash)
        this.chain.push(newBlock)
    }
    //验证区块链是否合法
    //  1.当前数据数据有没有被篡改
    validateChain() {
        if (this.chain.length === 1) {
            if (this.chain[0].hash !== this.chain[0].computeHash()) {
                return false
            }
            return true
        }
        //从第二个区块开始循环验证到最后一个区块
        //1.当前data有没有被篡改
        for (let i = 1; i < this.chain.length; i++) {

            if (this.chain[i].hash !== this.chain[i].computeHash()) {
                const index = i + 1
                console.log(`数据在区块${index}被篡改`)
                // return false
            }
            if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
                console.log(`区块链在区块处${i+1}断裂`)
                // return false
            }

            console.log('数据没有被篡改')
            // return true
        }
        //2.验证当前区块的previousHash是否等于上个区块的hash
        // const previousHash = this.

    }
    //  2. 
}

const myChain = new Chain()

myChain.addBlockToChain('转账10元')
myChain.addBlockToChain('转账20元')
myChain.addBlockToChain('转账30元')

//尝试篡改区块链
myChain.chain[2].data = '转账50元'

console.log(myChain)
console.log(myChain.validateChain())