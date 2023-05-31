'use client'
import { SendTransaction } from '../components/SendTransaction'
import { SendTransactionPrepared } from '../components/SendTransactionPrepared'

import { ThemeProvider } from 'styled-components'
import { defaultTheme, GlobalStyle } from './style'
import MTabs from '../components/Tabs'
export default function Page() {
  const getTheme = () => {
    return { ...defaultTheme }
  }
  return (
    <ThemeProvider theme={getTheme()}>
      <GlobalStyle />
      <div>
        <h1>wagmi + Next.js</h1>
        <MTabs />
      </div>
    </ThemeProvider>
  )
}
