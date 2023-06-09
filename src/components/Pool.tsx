import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useMemo, use } from 'react'
import factory from '../abi/uniswapFactory.json'
import router from '../abi/uniswapRouter.json'
import pair from '../abi/pair.json'
import bscAbi from '../abi/BscAbi.json'
import { ethers } from 'ethers'
import { Address, useAccount, useContractRead } from 'wagmi'

const UNISWAP_FACTORY_ABI = factory
const UNISWAP_ROUTER_ABI = router
const UNISWAP_PAIR_ABI = pair
const ERC20ABI = bscAbi

const UNISWAP_FACTORY_ADDRESS = '0x6725F303b657a9451d8BA641348b6761A6CC7a17'
const UNISWAP_ROUTER_ADDRESS = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1'

const PAIR_ADDRESS = '0x209eBd953FA5e3fE1375f7Dd0a848A9621e9eaFc'
const TOKEN_A_ADDRESS = '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814'
const TOKEN_B_ADDRESS = '0xFa60D973F7642B748046464e165A65B7323b0DEE'

const Pool = () => {
  const { address } = useAccount()
  const [factoryAddress, setFactoryAddress] = useState('')
  const [pool, setPool] = useState('')
  const [tokenA, setTokenA] = useState(TOKEN_A_ADDRESS)
  const [tokenB, setTokenB] = useState(TOKEN_B_ADDRESS)
  const [aAmount, setAAmount] = useState(0)
  const [bAmount, setBAmount] = useState('')

  //创建流动池
  const { data: poolData } = useContractRead({
    address: factoryAddress as Address,
    abi: UNISWAP_FACTORY_ABI,
    functionName: 'getPair',
    args: [tokenA, tokenB]
  })

  //获取TokenA余额
  const { data: TokenAAmount } = useContractRead({
    address: TOKEN_A_ADDRESS as Address,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [pool]
  })
  //获取TokenA Name
  const { data: TokenAName } = useContractRead({
    address: TOKEN_A_ADDRESS as Address,
    abi: ERC20ABI,
    functionName: 'name'
  })
  //获取TokenA Symbol
  const { data: TokenASymbol } = useContractRead({
    address: TOKEN_A_ADDRESS as Address,
    abi: ERC20ABI,
    functionName: 'symbol'
  })

  //获取TokenB余额
  const { data: TokenBAmount } = useContractRead({
    address: TOKEN_B_ADDRESS as Address,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [pool]
  })
  //获取TokenB Name
  const { data: TokenBName } = useContractRead({
    address: TOKEN_B_ADDRESS as Address,
    abi: ERC20ABI,
    functionName: 'name'
  })
  //获取TokenB Symbol
  const { data: TokenBSymbol } = useContractRead({
    address: TOKEN_B_ADDRESS as Address,
    abi: ERC20ABI,
    functionName: 'symbol'
  })

  //计算TokenA || TokenB 余额

  const { data: TokenAmount } = useContractRead({
    address: UNISWAP_ROUTER_ADDRESS as Address,
    abi: UNISWAP_ROUTER_ABI,
    functionName: 'getAmountsOut',
    args: [
      ethers.utils.parseUnits(String(aAmount) || '0', 'ether'),
      [TOKEN_A_ADDRESS, TOKEN_B_ADDRESS]
    ]
  })
  useMemo(() => {
    setBAmount(ethers.utils.formatUnits(TokenAmount ? (TokenAmount[1] as any) : '0', 'ether'))
  }, [TokenAmount])
  const handleCreatePool = () => {
    setFactoryAddress(UNISWAP_FACTORY_ADDRESS)
    setPool(poolData as string)
  }
  useMemo(() => {
    setPool(poolData as string)
  }, [poolData])

  return (
    <>
      <Stack>
        <Typography>流动池：{pool}</Typography>
        <Stack width={180}>
          <Button variant="contained" onClick={handleCreatePool}>
            创建流动池
          </Button>
        </Stack>

        <Stack flexDirection={'row'} mt={5}>
          <Stack width={400}>
            <TextField
              required
              id="outlined-required"
              label="TokenAddressA"
              defaultValue={tokenA}
              onChange={(e) => {
                setTokenA(e.target.value)
              }}
            />
          </Stack>
          <Stack width={400}>
            <TextField
              required
              id="outlined-required"
              label="TokenAddressB"
              defaultValue={tokenB}
              onChange={(e) => {
                setTokenB(e.target.value)
              }}
            />
          </Stack>
        </Stack>

        <Stack mt={5}>
          <Stack width={400}>
            <TextField
              required
              id="outlined-required"
              label="A数量"
              type="number"
              defaultValue={aAmount}
              onChange={(e) => {
                setTimeout(() => {
                  setAAmount(e.target.value)
                }, 600)
              }}
            />
          </Stack>
          <Typography>tokenName:{(TokenAName as any) || ''}</Typography>
          <Typography>symbol:{(TokenASymbol as any) || ''}</Typography>
          <Typography>
            tokenA剩余度:{ethers.utils.formatUnits((TokenAAmount as any) || '0', 'ether')}
          </Typography>
        </Stack>
        <Stack mt={5}>
          <Stack width={400} flexDirection={'row'}>
            <Typography>TokenB余额：</Typography>
            <Box>{bAmount}</Box>
          </Stack>
          <Typography>tokenName:{(TokenBName as any) || ''}</Typography>
          <Typography>symbol:{(TokenBSymbol as any) || ''}</Typography>
          <Typography>
            tokenB剩余度:{ethers.utils.formatUnits((TokenBAmount as any) || '0', 'ether')}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}
export default Pool
