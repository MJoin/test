'use client'

import { Box } from '@mui/material'
import { useAccount, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <Box>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
    </Box>
  )
}
