import { builder } from '../builder';
import { fetchTransaction } from '../transaction-data'

interface ITransaction {
  id: string;
  amount: string;
  merchant: string;
  reference: string;
  bankId: string;
}

const TransactionRef = builder.objectRef<ITransaction>('Transaction')

TransactionRef.implement({
  fields: t => ({
    id: t.exposeID('id'),
    amount: t.exposeString('amount'),
    merchant: t.exposeString('merchant'),
    reference: t.exposeString('reference'),
    bankId: t.exposeString('bankId')
  })
})

builder.queryFields(t => ({
  transaction: t.field({
    type: TransactionRef,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (parent, args, context) => {
      const trx = await fetchTransaction(String(args.id))
      if (trx === undefined) return null
      return {
        ...trx,
        bankId: trx?.secretId,
      }
    },
    nullable: true,
  })
}))
