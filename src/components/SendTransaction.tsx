'use client'

import { parseEther } from 'viem'
import { useSendTransaction, useWaitForTransaction } from 'wagmi'

import { stringify } from '../utils/stringify'
import { Button, Input, Stack } from '@mui/material'

export function SendTransaction() {
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction()
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  const Approve = (e: any) => {
    e.preventDefault()
    console.log(222, e)
  }

  const send = (e: any) => {
    e.preventDefault()
  }
  return (
    <>
      <form
        onSubmit={
          (e) => Approve(e)
          // (e) => {
          // e.preventDefault()
          // const formData = new FormData(e.target as HTMLFormElement)
          // const address = formData.get('address') as string
          // const value = formData.get('value') as `${number}`
          // sendTransaction({
          //   to: address,
          //   value: parseEther(value)
          // })
          // }
        }
      >
        <Stack>
          <Input sx={{ width: 480 }} name="address" placeholder="address" />
          <Input sx={{ width: 180 }} name="value" placeholder="value (ether)" />
        </Stack>
        <Button sx={{ marginTop: 1, marginRight: 1 }} variant="contained" type="submit">
          Approve
        </Button>
        <Button sx={{ marginTop: 1 }} variant="contained" type="submit">
          Send
        </Button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>Error: {error?.message}</div>}
    </>
  )
}
