// Temporary Shopify OAuth token capture function
// Credentials stored in Netlify environment variables

const https = require('https');

const CLIENT_ID     = process.env.SS_CLIENT_ID;
const CLIENT_SECRET = process.env.SS_CLIENT_SECRET;
const SHOP          = 'bd3766-4.myshopify.com';
const REDIRECT_URI  = 'https://packlabbs.netlify.app/.netlify/functions/shopify-oauth';

exports.handler = async function(event) {
  const params = event.queryStringParameters || {};

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return { statusCode: 500, body: 'Missing env vars' };
  }

  // Step 1: Start OAuth
  if (!params.code && !params.error) {
    const authUrl = `https://${SHOP}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=write_draft_orders,read_draft_orders&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=ss2026`;
    return {
      statusCode: 302,
      headers: { Location: authUrl },
      body: ''
    };
  }

  if (params.error) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<h2>Error: ${params.error}</h2><p>${params.error_description || ''}</p>`
    };
  }

  // Step 2: Exchange code for token
  const code = params.code;
  try {
    const token = await new Promise((resolve, reject) => {
      const postData = JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code });
      const options = {
        hostname: SHOP,
        path: '/admin/oauth/access_token',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
      };
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.access_token) resolve(parsed.access_token);
            else reject(new Error('No token: ' + data));
          } catch(e) { reject(new Error('Parse error: ' + data)); }
        });
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<!DOCTYPE html><html><head><title>Token</title>
        <style>body{font-family:sans-serif;max-width:600px;margin:60px auto;padding:20px}
        .token{background:#f0f0f0;padding:16px;border-radius:8px;word-break:break-all;font-family:monospace;font-size:14px;margin:20px 0}
        .ok{color:green;font-size:20px;font-weight:bold}
        button{background:#7E6BC2;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer}</style>
        </head><body>
        <div class="ok">Token captured!</div>
        <p>Copy and send this to Claw:</p>
        <div class="token">${token}</div>
        <button onclick="navigator.clipboard.writeText('${token}').then(()=>this.textContent='Copied!')">Copy</button>
        </body></html>`
    };
  } catch(err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<h2>Error</h2><pre>${err.message}</pre>`
    };
  }
};
