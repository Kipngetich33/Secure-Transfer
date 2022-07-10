//import the reach standard library
import { loadStdlib } from '@reach-sh/stdlib';
//import all the compilled version of indexedDB.mjs i.e indexedDB.main.js
import * as backend from './build/index.main.mjs';
//import ask to allow user to interact with the backend on the terminal
import {ask} from '@reach-sh/stdlib';
//get the set environment variable for example Algo the default/fallback is Algo
const stdlib = loadStdlib(process.env);

//create helper functions below
const getBalance = async (who) => await stdlib.balanceOf(who);
const fmt = (bal) => {
    return (bal/1000000).toFixed(4);
}
//create a parcipant interact
const participantInteract = {
    startingBackend: () => {
        console.log("Contract Backend Running")
    },
};

//determine the role of the participant in the contract
const userRole = await ask.ask('Please Enter Role: Sender or Reciever', (role) => {
    if(role == "Sender" || role == "Reciever"){
        return role
    }else{
        console.log("Invalid input role. Role is either 'Sender' or 'Reciever'")
    }
});

// Run different actions based on user's role
if(userRole == "Sender"){
    //inform the user of their role in the contract
    console.log("Your Role: Sender")
    //initialize the contract
    
    /* create a new test account and initialiaze the amount to 1000000000 ==
    1000 network tokens on algorand */
    const acc = await stdlib.newTestAccount(1000000000);
   
    //initialiaze a contract
    const ctc = acc.contract(backend);
    await ctc.participants.Sender(participantInteract);

    //now show the balance of the account
    getBalance(acc).then((bal) => {
        console.log(`You Current Account Balance is: ${fmt(bal)}`)
    })

    //Show the contract info
    const constractInfo = await ctc.getInfo()
    if(constractInfo){
        console.log(`Contract Info: ${JSON.stringify(constractInfo)}`);
    }

    //now create an address for recipient wih a starting balanc of 1000 network tokens
    const recipientAcc = await stdlib.newTestAccount(1000000000);
    const recipientAddress = await recipientAcc.getAddress()
    //display the created recipients account address to sender
    if(recipientAddress){
        console.log(`Recipeint's Account Address is: ${recipientAddress}`)
    }
}else{
    //inform the user of their role in the contract
    console.log("Your Role: Reciever")
}


//end the contract here
ask.done();