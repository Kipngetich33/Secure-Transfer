//Title: Simple Secure Fund Swap Contract
// Alogorithim:
    // 1. Create Two test accounts (Sender & Reciever addresses) and make the Sender aware of both
    // 2. Initialize the contract using the Sender's backend
    // 3. Allow Reciever to attach to the contract
    // 4. If the recievers Reciever Participant address is the same as the address that the Sender is aware of
    // Tranfer the funds to the recievers accounts
    // 5. Exit the contract


//Declare reach version that the DaPP that this file will be run with
'reach 0.1';

//create a  Participant interface this interface will be inherited by other 
//interact interfaces i.e Sender and Reciever
const participantInteract = {
    start: Fun([], Null)
};

const sendersInteract = {
    ...participantInteract,
    fundsToTransfer:UInt
}

const recieversInteract = {
    ...participantInteract,
}


//export the main reach application 
export const main = Reach.App(() => {
    const Sender = Participant('Sender', sendersInteract);
    const Receiver = Participant('Receiver', recieversInteract);
    const V = View('Main', { price: UInt });
    init();

    Sender.only(() => {});
    Sender.publish()
    commit();


    Receiver.only(() => {});
    Receiver.publish()
    commit();

})