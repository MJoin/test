'use client'

import { Box, Button, Stack } from '@mui/material'
import { useState } from 'react'
import type { Address } from 'wagmi'
import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  return (
    <Box>
      <FindBalance />
    </Box>
  )
}

export function FindBalance() {
  const [account, setAccount] = useState('')
  const { address } = useAccount()
  const { data } = useBalance({
    address: account as Address
  })

  const getBalance = () => {
    setAccount(address as Address)
  }

  return (
    <Stack flexDirection={'row'} alignItems={'center'}>
      <div>{data?.formatted ?? 0}</div>
      <Stack width={180} ml={20}>
        <Button variant="contained" onClick={() => getBalance()}>
          getBalance
        </Button>
      </Stack>
    </Stack>
  )
}
