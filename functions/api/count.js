// Cloudflare Pages Function - 设计计数器 API
// 使用 KV 存储全局计数

export async function onRequest(context) {
  const { env, request } = context;
  const kv = env.COUNTER_KV;
  const key = 'design-count';

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // GET - 获取当前计数
    if (request.method === 'GET') {
      const count = parseInt(await kv.get(key)) || 0;
      return new Response(JSON.stringify({ count }), { headers: corsHeaders });
    }

    // POST - 增加计数
    if (request.method === 'POST') {
      const current = parseInt(await kv.get(key)) || 0;
      const newCount = current + 1;
      await kv.put(key, newCount.toString());
      return new Response(JSON.stringify({ count: newCount }), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
