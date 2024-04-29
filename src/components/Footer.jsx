import { Divider, Text, Space } from '@mantine/core';
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
        <Divider/>
        {/* <Space h={15}/> */}
        <Text size="sm" ta="center" c="dimmed" py={15}>Copyright {currentYear}</Text>
    </div>
  )
}

export default Footer