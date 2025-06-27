const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  const url = req.url
  if (url === '/' || url === 'index-fetch.html') {
    // 如果请求根路径，返回 ndex-fetch.html 文件
    fs.readFile('index-fetch.html', (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end('Error loading')
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
      }
    })
  } else if (url.includes('/fetch-sse')) {
    // 如果请求 /events-fetch 路径，建立连接
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*', // 允许跨域
    })
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    
    // 每隔 1 秒发送一条消息
    let id = 0
    const intervalId = setInterval(() => {
      const data = { id, time: new Date().toISOString(), body: JSON.parse(body) }
      res.write(JSON.stringify(data))
      id++
      if (id >= 10) {
        clearInterval(intervalId)
        res.end()
      }
    }, 1000)

    // 当客户端关闭连接时停止发送消息
    req.on('close', () => {
      clearInterval(intervalId)
      id = 0
      res.end()
    })
  } else {
    // 如果请求的路径无效，返回 404 状态码
    res.writeHead(404)
    res.end()
  }
}).listen(3001)

console.log('Server listening on port 3001')
