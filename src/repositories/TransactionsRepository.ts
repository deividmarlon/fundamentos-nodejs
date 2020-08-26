import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string; 
  value: number ;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }
  
  public getBalance(): Balance {
    let income = 0, outcome = 0, balance = 0;
    
    this.transactions.map(transaction=>{
      if(transaction.type==='outcome'){
          outcome+=transaction.value;
      }else{
          income+=transaction.value
      }
    })

    balance = income - outcome;

    return ({income,outcome,total:balance});

  }
  
  
  public create({title,value,type}:TransactionDTO): Transaction {
    
    const transaction  = new Transaction({
        title,
        value,
        type
    });
    
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
