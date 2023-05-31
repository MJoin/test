'use client'

import { Box, Button, Stack } from '@mui/material'
import { useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <Box>
      <Box>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </Box>
      <br />
      {switchNetwork && (
        <Stack flexDirection={'row'} alignItems={'center'}>
          Switch to:{' '}
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <Button
                sx={{ marginLeft: 5 }}
                variant="contained"
                key={x.id}
                onClick={() => switchNetwork(x.id)}
              >
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </Button>
            )
          )}
        </Stack>
      )}

      <div>{error?.message}</div>
    </Box>
  )
}
