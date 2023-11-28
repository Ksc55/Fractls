import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { transactionLists } from '@/components/mockdata'

const TransactionHistory = () => {

  return (
    <>
    <div className='py-24'>
        <h1 className="text-2xl font-bold mb-4 text-center">Transaction History</h1>
        <DataTable 
            columns={columns}
            data = {transactionLists}
        />
    </div>
    </>
  )
}

export default TransactionHistory