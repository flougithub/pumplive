export default async function handler(req, res) {
  try {
    const response = await fetch('https://client-api-2-74b1891ee9f9.herokuapp.com/coins?offset=0&limit=50&sort=currently_live&order=DESC&includeNsfw=false', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PumpTube/1.0'
      }
    });
    
    const data = await response.json();
    
    // CORS ayarları
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json(data);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Failed to fetch pump.fun data', details: error.message });
  }
}
