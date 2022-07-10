//import the reach standard library
import { loadStdlib } from '@reach-sh/stdlib';
//import all the compilled version of indexedDB.mjs i.e indexedDB.main.js
import * as backend from './build/index.main.mjs';
//import ask to allow user to interact with the backend on the terminal
import {ask} from '@reach-sh/stdlib';
//get the set environment variable for example Algo the default/fallback is Algo
const stdlib = loadStdlib(process.env);
//create a parcipant interact
const participantInteract = {};

/* create a new test account and initialiaze the amout to 1000000000 ==
1000 network tokens on algorand */
const acc = await stdlib.newTestAccount(1000000000);
const ctc = acc.contract(backend);
await ctc.participants.Participant(participantInteract);

//end the contract here
ask.done();