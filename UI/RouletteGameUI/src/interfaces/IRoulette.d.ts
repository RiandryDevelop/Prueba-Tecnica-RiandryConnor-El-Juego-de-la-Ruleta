 interface IFormData {
    name: string;
    balance: number;
  }

  interface Bet {
    number: number | null;
    type: 'EVEN' | 'ODD' | '';
    color: 'RED' | 'BLACK' | '';
  }
  
  

  export {
    IFormData,
    IBet
  }