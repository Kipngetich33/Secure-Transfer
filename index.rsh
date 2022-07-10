//Declare reach version that this file will be run on
'reach 0.1';

//create a  Participant interface
const participantInteract = {
    startingBackend: Fun([], Null),
};

//export the main reach application 
export const main = Reach.App(() => {

    //create contract participant
    const P = Participant('Participant', participantInteract);

    //initialize contract
    init();

    //inform participants that the contract backend is running
    each([P,],() => { interact.startingBackend() });

    //just create a publication to avoid publication warning
    P.only(() => {});
    P.publish()
    commit();

    //end contract
    exit()
})