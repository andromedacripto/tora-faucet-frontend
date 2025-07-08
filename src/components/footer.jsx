// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '40px 20px 20px', color: '#888', fontSize: '0.9rem' }}>
      <div style={{ marginBottom: '10px' }}>
        <Link to="/terms" style={{ color: '#0af', textDecoration: 'none', marginRight: '10px' }}>
          Terms of Service
        </Link>
        •
        <Link to="/privacy" style={{ color: '#0af', textDecoration: 'none', marginLeft: '10px' }}>
          Privacy Policy
        </Link>
      </div>
      <div>
        ©2025 Tora Faucet.{' '}
        <a
          href="https://github.com/andromedacripto"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0af', textDecoration: 'none' }}
        >
          Powered by Tora Network
        </a>{' '}
        • v0.0.1
      </div>
    </footer>
  )
}


