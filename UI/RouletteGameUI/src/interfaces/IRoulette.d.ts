 interface IFormData {
    name: string;
    balance: number;
  }

  interface Bet {
    number: number | null;
    type: 'EVEN' | 'ODD' | '';
    color: 'RED' | 'BLACK' | '';
  }
  
  interface IStore {
    
  } 
  interface IBetAmount  { value: number; }



  export {
    IFormData,
    IBet,
    IStore,
    IBetAmount
  }