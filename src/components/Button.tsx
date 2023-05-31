'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import { flexCenter } from '../app/style'
import { styled } from '@mui/material'

const MBox = styled(Button)`
  ${flexCenter}
  .MuiButton-root {
    /* color: #dda5f7;
    background-color: #7a4add; */
  }
`
interface IButton {
  title: string
  onClick: () => void
  key?: string | number
}
const MButton = ({ title, onClick, key }: IButton) => {
  return (
    <MBox>
      <Button variant="contained" onClick={onClick} key={key}>
        {title}
      </Button>
    </MBox>
  )
}
export default MButton
