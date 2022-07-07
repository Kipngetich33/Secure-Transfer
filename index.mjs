//import the reach standard library
import { loadStdlib } from '@reach-sh/stdlib';
//import all the compilled version of indexedDB.mjs i.e indexedDB.main.js
import * as backend from './build/index.main.mjs';
//import ask to allow user to interact with the backend on the terminal
import {ask} from '@reach-sh/stdlib';
//get the set environment variable for example Algo the default/fallback is Algo
const stdlib = loadStdlib(process.env);

//helper functions
const toAU = (su) => stdlib.parseCurrency(su);
const toSU = (au) => stdlib.formatCurrency(au, 4);
const showBalance = async (acc) => console.log(`Your balance is ${stdlib.balanceOf(acc)}.`);

const participantInteract = (role) => ({
    start: () => {console.log("Inside common interact")}
});

//create a new test account and initialiaze the account with 1000 units of the Network
const acc = await stdlib.newTestAccount(stdlib.parseCurrency(500));
await showBalance(acc);
const ctc = acc.contract(backend);
await ctc.participants.sendersInteract(participantInteract);
await showBalance(acc);
