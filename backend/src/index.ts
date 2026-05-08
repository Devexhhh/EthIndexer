import express from "express";
import pg from "pg";
import { HDNodeWallet } from "ethers";
import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { MNEMONICS } from "./config.js";

const seed = mnemonicToSeedSync(MNEMONICS);

const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userId = 1;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);

    console.log(child.privateKey);
    console.log(child.address);

    res.json({
        userId
    })
    return child.privateKey;
})

app.get("/depositAddress/:userId", (req, res) => {

})

app.listen(3000);