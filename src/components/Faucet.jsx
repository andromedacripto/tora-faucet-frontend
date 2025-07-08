import React, { useState } from 'react';

export default function Faucet() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const address = e.target.walletAddress.value.trim();
    const captchaResponse = window.grecaptcha.getResponse();

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert('Please enter a valid wallet address.');
      setLoading(false);
      return;
    }

    if (!captchaResponse) {
      alert('Please complete the CAPTCHA.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://tora-faucet-backend.onrender.com/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: captchaResponse, address }),
      });

      const result = await response.json();
      if (result.success) {
        const txHash = result.txHash;
        const shortHash = `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
        setMessage(
          <>
            ✅ 10 TORA sent! Tx:{' '}
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00ffc3', textDecoration: 'none' }}
            >
              {shortHash}
            </a>
          </>
        );
        window.grecaptcha.reset();
        e.target.walletAddress.value = '';
      } else {
        setMessage(`❌ Error: ${result.message || 'Unknown error'}`);
        window.grecaptcha.reset();
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Network or server error.');
      window.grecaptcha.reset();
    }

    setLoading(false);
  };

  const addToken = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x2bd73CCaC4194Fe41481e49935Aa972AA69e4A6E',
            symbol: 'TORA',
            decimals: 18,
            image: 'https://raw.githubusercontent.com/andromedacripto/assets/main/tora.png',
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{
      backgroundColor: '#000',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 0 25px #00ffc3',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      fontFamily: "'Orbitron', sans-serif",
      color: '#00ffc3'
    }}>
      <h1 style={{ marginBottom: '15px' }}>TORA FAUCET</h1>

      <p style={{
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontSize: '1.1rem'
      }}>
        Claim 10 TORA every 24h on Sepolia
        <svg
          viewBox="0 0 256 417"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: '#00ffc3',
            width: '26px',
            height: '26px',
            filter: 'drop-shadow(0 0 6px #00ffc3)'
          }}
        >
          <path d="M127.6 0L124.1 11.5v277.7l3.5 3.5 127.6-74.2z" />
          <path d="M127.6 0L0 218.5l127.6 74.2v-282.7z" />
          <path d="M127.6 306.6l-0.1 0.1v109.3l0.1 0.1 127.8-177.5z" />
          <path d="M127.6 416.1v-109.4L0 238.4z" />
          <path d="M127.6 282.3l127.5-74.1-127.5-59.8z" />
          <path d="M0 208.2l127.6 74.1v-134z" />
        </svg>
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="walletAddress"
          placeholder="Enter your wallet address"
          required
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            marginBottom: '15px',
            fontSize: '1rem',
            backgroundColor: '#111',
            color: '#00ffc3',
          }}
          disabled={loading}
        />
        <div className="g-recaptcha" data-sitekey="6LcKmGUrAAAAAD-9GitbSxFI3yZAWQAhjA20fGGr" style={{ marginBottom: '15px' }}></div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: loading ? '#006655' : '#00ffc3',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {loading ? 'Processing...' : 'CLAIM FAUCET'}
        </button>
      </form>

      <button
        onClick={addToken}
        style={{
          marginTop: '10px',
          padding: '10px 18px',
          fontSize: '0.85rem',
          borderRadius: '8px',
          border: '1px solid #00ffc3',
          backgroundColor: 'transparent',
          color: '#00ffc3',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#00ffc3';
          e.currentTarget.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#00ffc3';
        }}
      >
        ➕ Add TORA to Wallet
      </button>

      <div style={{ marginTop: '20px', fontFamily: 'monospace', minHeight: '1.5em' }}>{message}</div>
    </div>
  );
}


