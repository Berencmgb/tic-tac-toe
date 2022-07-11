class Printer
{
    storedMessage: string;

    constructor(message: string){
        this.storedMessage = message;
    }

    sayMessege(){
        return console.log(this.storedMessage);
    }
}
