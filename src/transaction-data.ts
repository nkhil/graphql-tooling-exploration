type Transaction = {
  amount: string,
  id: string,
  merchant: string,
  reference: string,
  secretId: string,
}
type Transactions = Record<string, Transaction>

const DATA:Transactions = {
  '1': {
    amount: '12',
    id: '1',
    merchant: 'Subway',
    reference: '',
    secretId: '123',
},
}


export async function fetchTransaction(id: string): Promise<Transaction | undefined> {
  return DATA[id]
}
