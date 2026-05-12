import { JsonRpcProvider } from "ethers";
import axios from "axios";
let CURRENT_BLOCK_NUMBER = 24936355;

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/dhuFXA2gtsJsGgz7diJSo")

async function main() {
    // get interested addresses from the DB
    const interestedAddress = ["0x05557f7d084b12c0b303c03e6e4aed314696533b", "0x5c3593481cba011737e36ded62f1797c9f6afce1"]
    // inspect the block from native eth transactions on one of these addresses

    // const block = await provider.getBlock(CURRENT_BLOCK_NUMBER, true);
    // console.log(block?.transactions)

    const transaction = await getTransactionReceipt(CURRENT_BLOCK_NUMBER.toString());

    const interestedTransactions = transaction.result.filter(
        (x) =>
            (x.to && interestedAddress.includes(x.to.toLowerCase())) ||
            (x.from && interestedAddress.includes(x.from.toLowerCase()))
    );

    const fullTxns = await Promise.all(interestedTransactions.map(async ({ transactionHash }) => {
        const txn = await provider.getTransaction(transactionHash);
        return txn;
    }))

    console.log(fullTxns);

    // console.log(interestedTransactions);
    // Bad approach => Update the balance in the database
}

interface TransactionReceipt {
    transactionHash: string;
    from: string;
    to: string;
}

interface TransactionReceiptResponse {
    result: TransactionReceipt[];
}

async function getTransactionReceipt(blockNumber: string): Promise<TransactionReceiptResponse> {
    let data = JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "eth_getBlockReceipts",
        "params": [
            "0x17C7FA3" // TODO: add block number here
        ]
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://eth-mainnet.g.alchemy.com/v2/dhuFXA2gtsJsGgz7diJSo',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Cookie': '_cfuvid=Qn1QTPgL8vHUo0A_cayd0JmLEtgJy5VQKGI5IFuem44-1737735399258-0.0.1.1-604800000'
        },
        data: data
    };

    const response = await axios.request(config)
    return response.data;
}


main();