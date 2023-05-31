'use client'

import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import MButton from './Button'
import { Account } from '../components/Account'
import { Balance } from '../components/Balance'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { SignMessage } from '../components/SignMessage'
import { SignTypedData } from '../components/SignTypedData'
import { Box, Stack, Typography } from '@mui/material'
import AddChain from './AddChain'

export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <Box sx={{ flexDirection: 'row' }}>
        {isConnected && (
          <MButton onClick={() => disconnect()} title={`Disconnect from ${connector?.name}`} />
        )}
        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <MButton
              key={x.id}
              onClick={() => connect({ connector: x })}
              title={`${x.name} ${isLoading && x.id === pendingConnector?.id && ' (connecting)'}`}
            />
          ))}
      </Box>
      <Stack flexDirection={'row'} alignItems={'center'}>
        <Typography>account:</Typography>
        <Account />
      </Stack>
      <Stack flexDirection={'row'} alignItems={'center'}>
        balance:
        <Balance />
      </Stack>
      <Stack mt={5} flexDirection={'row'} alignItems={'center'}>
        Add Chain:
        <AddChain />
      </Stack>
      <Stack>
        network:
        <NetworkSwitcher />
      </Stack>

      <Stack mt={5} flexDirection={'row'} alignItems={'center'}>
        sign:
        <SignMessage />
      </Stack>

      {error && <Box>{(error as BaseError).shortMessage}</Box>}
    </Box>
  )
}
