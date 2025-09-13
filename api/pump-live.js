export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('API called successfully');
    
    // Basit test - demo data döndür
    const demoTokens = [
      {
        mint: "test123",
        name: "Test Live Stream",
        symbol: "TEST",
        description: "Test canlı yayını",
        market_cap: 100000,
        currently_live: true,
        volume_24h: 50000,
        creator: "TestUser"
      }
    ];
    
    res.status(200).json(demoTokens);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      details: error.message 
    });
  }
}
