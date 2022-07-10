//Declare reach version that this file will be run on
'reach 0.1';

//create a  Participant interface
const participantInteract = {
    startingBackend: Fun([], Null),
};

//export the main reach application 
export const main = Reach.App(() => {

    //create contract participant
    const Sender = Participant('Sender', participantInteract);
    const Reciever = Participant('Reciever', participantInteract);

    //initialize contract
    init();

    //Sender's only step
    Sender.only(() => {

    })

    //inform participants that the contract backend is running
    each([Sender,Reciever],() => { interact.startingBackend() });

    //just create a publication to avoid publication warning
    Sender.only(() => {});
    Sender.publish()
    commit();

    //end contract
    exit()
})