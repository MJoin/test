import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Connect } from './Connect'
import { styled } from '@mui/material'
import TowPage from './TowPage'

import { useState } from 'react'
import Pool from './Pool'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
const MTab = styled(Tabs)`
  .MuiTabs-flexContainer {
    flex-direction: row;
  }
`
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function MTabs() {
  const [value, setValue] = useState(2)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MTab value={value} onChange={handleChange}>
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </MTab>
      </Box>
      <TabPanel value={value} index={0}>
        <Connect />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TowPage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Pool />
      </TabPanel>
    </Box>
  )
}
