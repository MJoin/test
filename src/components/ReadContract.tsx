'use client'

import { useState } from 'react'
import { BaseError } from 'viem'
import { type Address, useContractRead, useAccount } from 'wagmi'

import { Button, Input, Stack } from '@mui/material'
import ERC20Abi from '../abi/BscAbi.json'
import { BigNumber, ethers } from 'ethers'

//bsc address
// 0xfa60d973f7642b748046464e165a65b7323b0dee
const BASE = '0xFa60D973F7642B748046464e165A65B7323b0DEE'
export function ReadContract() {
  return (
    <Stack spacing={3}>
      <BalanceOf />
      <GetName />
      <GetSymbol />
    </Stack>
  )
}

function BalanceOf() {
  const { address } = useAccount()
  const [Token, setToken] = useState('')
  const { data, error, isLoading, isSuccess } = useContractRead({
    address: Token as Address,
    abi: ERC20Abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(address)
  })

  return (
    <Stack>
      Token balance: {isSuccess && ethers.utils.formatUnits((data as any) || '0', 'ether')}
      <Button
        sx={{ width: 180, marginTop: 1 }}
        variant="contained"
        onClick={(e: any) => {
          e.preventDefault()
          setToken(BASE)
        }}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </Button>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </Stack>
  )
}
function GetName() {
  const { address } = useAccount()
  const [Token, setToken] = useState('')

  const { data, error, isLoading, isSuccess } = useContractRead({
    address: Token as Address,
    abi: ERC20Abi,
    functionName: 'name'
  })
  return (
    <Stack>
      name: {isSuccess && data?.toString()}
      <Button
        sx={{ width: 180, marginTop: 1 }}
        variant="contained"
        onClick={(e: any) => {
          e.preventDefault()
          setToken(BASE)
        }}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </Button>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </Stack>
  )
}
function GetSymbol() {
  const { address } = useAccount()
  const [Token, setToken] = useState('')

  const { data, error, isLoading, isSuccess } = useContractRead({
    address: Token as Address,
    abi: ERC20Abi,
    functionName: 'symbol'
  })
  return (
    <Stack>
      symbol: {isSuccess && data?.toString()}
      <Button
        sx={{ width: 180, marginTop: 1 }}
        variant="contained"
        onClick={(e: any) => {
          e.preventDefault()
          setToken(BASE)
        }}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </Button>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </Stack>
  )
}
