import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        padding: theme.spacing(3),
        backgroundColor: theme.palette.menu?.main,
        color: 'white',
        textAlign: 'center',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2">
        © 2024 Copyright FMCSA. All rights reserved.{' '}
        <Link href="#" color="inherit" underline="hover">
          Terms of service
        </Link>
        . Developed by
        <Link href="https://github.com/devezt" color="inherit" underline="hover">
          DevEzt
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer
