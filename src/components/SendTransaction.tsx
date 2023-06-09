'use client'

import { Address, parseEther } from 'viem'
import { useAccount, useContractWrite, useSendTransaction, useWaitForTransaction } from 'wagmi'
import ERC20Abi from '../abi/BscAbi.json'

import { stringify } from '../utils/stringify'
import { Button, Input, Stack } from '@mui/material'
import { useState } from 'react'
const BASE = '0xFa60D973F7642B748046464e165A65B7323b0DEE'
export function SendTransaction() {
  const { address } = useAccount()
  const [addressValue, setAddressValue] = useState('')
  const [amount, setAmount] = useState('')
  const [value, setValue] = useState('')
  const { write: ApproveWrite } = useContractWrite({
    address: BASE,
    abi: ERC20Abi,
    functionName: 'approve'
  })
  const { write: SendWrite } = useContractWrite({
    address: BASE,
    abi: ERC20Abi,
    functionName: 'approve'
  })
  const Approve = (e: any) => {
    e.preventDefault()
    ApproveWrite({
      args: [address, amount]
    })
  }

  const send = (e: any) => {
    e.preventDefault()
    SendWrite({
      args: ['0x060615638ba98Ea67415C29d94C75464a02d7f5D', value]
    })
  }
  return (
    <>
      <Stack>
        {/* <Input
          onChange={(e) => {
            setAddressValue(e.target.value)
          }}
          sx={{ width: 480 }}
          name="address"
          placeholder="address"
        /> */}
        <Input
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          sx={{ width: 180 }}
          name="value"
          placeholder="value (ether)"
        />
      </Stack>

      <Button onClick={send} sx={{ marginTop: 1, width: 100 }} variant="contained" type="submit">
        Send
      </Button>

      <Stack mt={5}>
        <Input
          onChange={(e) => {
            setValue(e.target.value)
          }}
          sx={{ width: 180 }}
          name="value"
          placeholder="value (ether)"
        />
        <Button
          onClick={Approve}
          sx={{ marginTop: 1, marginRight: 1, width: 100 }}
          variant="contained"
          type="submit"
        >
          Approve
        </Button>
      </Stack>
    </>
  )
}
