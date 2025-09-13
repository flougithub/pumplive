export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Fetching live streams with free Helius plan...');
    
    // Ücretsiz Helius plan için basit RPC çağrısı
    const HELIUS_API_KEY = "83347238-4dac-4231-b778-863c1c33022a";
    const heliusUrl = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    
    // Basit getAccountInfo çağrısı - ücretsiz planda çalışır
    const response = await fetch(heliusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSlot",
        params: []
      })
    });

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Helius RPC error: ${data.error.message}`);
    }

    // Helius başarılı - demo live tokens oluştur
    const liveTokens = [
      {
        mint: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
        name: "🔴 PEPE LIVE SHOW",
        symbol: "PEPE",
        description: "PEPE live streaming 24/7! Join the community chat and trading action.",
        image_uri: "https://via.placeholder.com/200/FF6B6B/ffffff?text=PEPE",
        market_cap: 650000,
        created_timestamp: new Date(Date.now() - 7200000).toISOString(),
        creator: "PepeStreamer",
        currently_live: true,
        volume_24h: 125000,
        holder_count: 1847,
        trade_count: 523,
        bonding_curve_progress: 87
      },
      {
        mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        name: "🎥 BONK STREAM 24/7",
        symbol: "BONK",
        description: "BONK never stops! Live trading, memes, and community vibes.",
        image_uri: "https://via.placeholder.com/200/4ECDC4/ffffff?text=BONK",
        market_cap: 890000,
        created_timestamp: new Date(Date.now() - 14400000).toISOString(),
        creator: "BonkMaster",
        currently_live: true,
        volume_24h: 234000,
        holder_count: 2341,
        trade_count: 892,
        bonding_curve_progress: 94
      },
      {
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        name: "📺 DOGE COMMUNITY LIVE",
        symbol: "DOGE",
        description: "Such wow! Much stream! DOGE community hanging out live.",
        image_uri: "https://via.placeholder.com/200/45B7D1/ffffff?text=DOGE",
        market_cap: 445000,
        created_timestamp: new Date(Date.now() - 3600000).toISOString(),
        creator: "DogeStreamer",
        currently_live: true,
        volume_24h: 87000,
        holder_count: 1234,
        trade_count: 456,
        bonding_curve_progress: 76
      },
      {
        mint: "So11111111111111111111111111111111111111112",
        name: "🔴 SHIBA INU LIVE CHAT",
        symbol: "SHIB",
        description: "Shiba army unite! Live streaming and community discussions.",
        image_uri: "https://via.placeholder.com/200/96CEB4/ffffff?text=SHIB",
        market_cap: 320000,
        created_timestamp: new Date(Date.now() - 10800000).toISOString(),
        creator: "ShibaLive",
        currently_live: true,
        volume_24h: 67000,
        holder_count: 987,
        trade_count: 321,
        bonding_curve_progress: 68
      },
      {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        name: "🎬 WIF MOON MISSION",
        symbol: "WIF",
        description: "WIF to the moon! Live mission control and trading updates.",
        image_uri: "https://via.placeholder.com/200/FFEAA7/ffffff?text=WIF",
        market_cap: 780000,
        created_timestamp: new Date(Date.now() - 5400000).toISOString(),
        creator: "WifMoonBase",
        currently_live: true,
        volume_24h: 156000,
        holder_count: 1678,
        trade_count: 689,
        bonding_curve_progress: 89
      },
      {
        mint: "11111111111111111111111111111111",
        name: "📹 SOLANA CAT STREAM",
        symbol: "SCAT",
        description: "Meow! Solana cats streaming live with purr-fect vibes.",
        image_uri: "https://via.placeholder.com/200/DDA0DD/ffffff?text=SCAT",
        market_cap: 234000,
        created_timestamp: new Date(Date.now() - 1800000).toISOString(),
        creator: "SolanaCat",
        currently_live: true,
        volume_24h: 45000,
        holder_count: 567,
        trade_count: 234,
        bonding_curve_progress: 45
      },
      {
        mint: "22222222222222222222222222222222",
        name: "🔴 PUMP ELITE LIVE",
        symbol: "PUMP",
        description: "Elite pumpers only! VIP trading signals and alpha calls.",
        image_uri: "https://via.placeholder.com/200/98D8C8/ffffff?text=PUMP",
        market_cap: 567000,
        created_timestamp: new Date(Date.now() - 9000000).toISOString(),
        creator: "ElitePumper",
        currently_live: true,
        volume_24h: 198000,
        holder_count: 1456,
        trade_count: 567,
        bonding_curve_progress: 82
      },
      {
        mint: "33333333333333333333333333333333",
        name: "🎥 DIAMOND HANDS TV",
        symbol: "DIAMOND",
        description: "Diamond hands never sell! Live motivation and HODL energy.",
        image_uri: "https://via.placeholder.com/200/F7DC6F/ffffff?text=DIAM",
        market_cap: 423000,
        created_timestamp: new Date(Date.now() - 6300000).toISOString(),
        creator: "DiamondTV",
        currently_live: true,
        volume_24h: 89000,
        holder_count: 1123,
        trade_count: 445,
        bonding_curve_progress: 71
      }
    ];
    
    console.log(`Returning ${liveTokens.length} demo live streams (Helius connection successful)`);
    
    res.status(200).json(liveTokens);
    
  } catch (error) {
    console.error('API Error:', error);
    
    res.status(500).json({ 
      error: 'Failed to connect to Helius', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
