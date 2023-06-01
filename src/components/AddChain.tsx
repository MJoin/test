'use client'

import { Button, Stack } from '@mui/material'
import React from 'react'
import { useSwitchNetwork } from 'wagmi'
export default function AddChain() {
  const bscT = 97

  const { switchNetwork } = useSwitchNetwork()

  return (
    <Stack ml={5}>
      {switchNetwork && (
        <Button sx={{ marginLeft: 5 }} variant="contained" onClick={() => switchNetwork(bscT)}>
          add bscTest
        </Button>
      )}
    </Stack>
  )
}
