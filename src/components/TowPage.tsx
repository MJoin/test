'use client'
import React from 'react'
import { ReadContract } from './ReadContract'
import { SendTransaction } from './SendTransaction'
const TowPage = () => {
  return (
    <>
      <ReadContract />
      <br />
      <SendTransaction />
    </>
  )
}

export default TowPage
