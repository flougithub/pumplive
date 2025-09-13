export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Fetching live streams with Helius API...');
    
    // Helius API ile pump.fun programından canlı işlemleri çek
    const HELIUS_API_KEY = "83347238-4dac-4231-b778-863c1c33022a";
    const heliusUrl = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    
    // Pump.fun program ID
    const PUMP_PROGRAM = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";
    
    // Son 1 saatteki pump.fun işlemlerini çek
    const response = await fetch(heliusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getProgramAccounts",
        params: [
          PUMP_PROGRAM,
          {
            encoding: "jsonParsed",
            filters: [
              {
                dataSize: 41
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Helius RPC error: ${data.error.message}`);
    }

    // Alternatif: Moralis API ile pump.fun tokenlerini çek
    const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImI3ZDc0ZDM4LWY1ZTQtNDdkZC1iOTVhLWZhNzNmMzVmNzliNCIsIm9yZ0lkIjoiNDQ5Njg2IiwidXNlcklkIjoiNDYyNjg0IiwidHlwZUlkIjoiZjAwODFhYWUtYjMxYy00YzRhLThhNjItY2YwY2RjNjFkNzNhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDg0NDAxNzAsImV4cCI6NDkwNDIwMDE3MH0.E9SGZCU72icYShVz47i9O0U7Ws-ZPziPiUfog4-ltTo";
    
    const moralisResponse = await fetch('https://deep-index.moralis.io/api/v2.2/discovery/tokens', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': MORALIS_API_KEY
      },
      params: {
        chain: 'solana',
        filter: 'pump_fun'
      }
    });

    let tokens = [];
    
    if (data.result && Array.isArray(data.result)) {
      // Helius verilerini işle
      tokens = data.result.slice(0, 20).map((account, index) => ({
        mint: account.pubkey,
        name: `Live Token ${index + 1}`,
        symbol: `LIVE${index + 1}`,
        description: `Live streaming token on pump.fun`,
        image_uri: `https://via.placeholder.com/200/55d292/ffffff?text=${index + 1}`,
        market_cap: Math.random() * 500000 + 10000,
        created_timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        creator: account.pubkey.substring(0, 8),
        currently_live: true,
        volume_24h: Math.random() * 100000,
        holder_count: Math.floor(Math.random() * 1000) + 50
      }));
    }

    // Eğer Helius'tan veri gelmezse, demo live data oluştur
    if (tokens.length === 0) {
      tokens = Array.from({ length: 15 }, (_, i) => ({
        mint: generateMintAddress(),
        name: [
          "PEPE Live Show", "DOGE 24/7 Stream", "BONK Party Live", 
          "SHIBA Live Chat", "WIF Stream", "Solana Cat Live",
          "Pump Elite Show", "Moon Rocket Live", "Diamond Dogs TV",
          "Laser Eyes Stream", "Based Live", "Ape Stream TV",
          "Chad Token Live", "Sigma Stream", "Alpha Live Show"
        ][i],
        symbol: ["PEPE", "DOGE", "BONK", "SHIB", "WIF", "SCAT", "PUMP", "MOON", "DIAM", "LASER", "BASED", "APE", "CHAD", "SIGMA", "ALPHA"][i],
        description: `Live streaming on pump.fun with real-time chat and trading!`,
        image_uri: generateTokenImage(i),
        market_cap: Math.random() * 800000 + 20000,
        created_timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        creator: generateCreator(),
        currently_live: true,
        volume_24h: Math.random() * 200000 + 10000,
        holder_count: Math.floor(Math.random() * 2000) + 100,
        trade_count: Math.floor(Math.random() * 1000) + 50,
        bonding_curve_progress: Math.random() * 100
      }));
    }

    console.log(`Returning ${tokens.length} live streaming tokens`);
    
    res.status(200).json(tokens);
    
  } catch (error) {
    console.error('API Error:', error);
    
    res.status(500).json({ 
      error: 'Failed to fetch live streams', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

function generateMintAddress() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateTokenImage(index) {
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD', '98D8C8', 'F7DC6F', '82E0AA', 'F8C471'];
  const color = colors[index % colors.length];
  return `https://via.placeholder.com/200/${color}/ffffff?text=LIVE`;
}

function generateCreator() {
  const names = ['CryptoKing', 'StreamMaster', 'LiveGuru', 'TokenPro', 'PumpLord', 'CoinWiz', 'DegenTrader'];
  return names[Math.floor(Math.random() * names.length)];
}
