type Transaction = {
  amount: string,
  id: string,
  merchant: string,
  reference: string,
}
type Transactions = Record<string, Transaction>

const DATA:Transactions = {
  '1': {
    amount: '12',
    id: '1',
    merchant: 'Subway',
    reference: '',
  }
}


export async function fetchTransaction(id: string): Promise<Transaction | undefined> {
  return DATA[id]
}
