'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { type Address, useContractRead } from 'wagmi'

import { wagmiContractConfig } from './contracts'
import { Button, Input, Stack } from '@mui/material'

export function ReadContract() {
  return (
    <Stack>
      <BalanceOf />
      <br />
      <TotalSupply />
    </Stack>
  )
}

function TotalSupply() {
  const { data, isRefetching, refetch } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'totalSupply'
  })

  return (
    <Stack>
      Total Supply: {data?.toString()}
      <Button
        sx={{ width: 180 ,marginTop: 1}}
        variant="contained"
        disabled={isRefetching}
        onClick={() => refetch()}
      >
        {isRefetching ? 'loading...' : 'refetch'}
      </Button>
    </Stack>
  )
}

function BalanceOf() {
  const [address, setAddress] = useState<Address>('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC')
  const { data, error, isLoading, isSuccess } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(address)
  })

  const [value, setValue] = useState<string>(address)

  return (
    <Stack>
      Token balance: {isSuccess && data?.toString()}
      <Input
        sx={{ width: 480 }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        value={value}
      />
      <Button sx={{ width: 180,marginTop: 1 }} variant="contained" onClick={() => setAddress(value as Address)}>
        {isLoading ? 'fetching...' : 'fetch'}
      </Button>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </Stack>
  )
}
