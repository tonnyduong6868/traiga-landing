/**
 * Kiểm tra tràn ngang ở 375px trên bản build thật.
 *
 * Không đoán bằng mắt: dựng một server tí hon phục vụ `out/` đúng dưới
 * basePath của GitHub Pages, mở Chrome thật ở 375×812 rồi liệt kê mọi phần tử
 * rộng hơn khung nhìn. Chạy: node scripts/check-375.js
 *
 * Mượn puppeteer-core từ omnilogin-app để khỏi thêm phụ thuộc vào trang bán hàng.
 */

const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const PUPPETEER = 'D:/vide code/omnilogin-app/node_modules/puppeteer-core'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const ROOT = path.join(__dirname, '..', 'out')
const BASE = '/traiga-landing'
const WIDTHS = [375, 414, 768, 1280]

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  if (!p.startsWith(BASE)) {
    res.writeHead(404).end('ngoai basePath: ' + p)
    return
  }
  p = p.slice(BASE.length) || '/'
  let file = path.join(ROOT, p)
  if (p.endsWith('/')) file = path.join(file, 'index.html')
  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404).end('404 ' + p)
      return
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' })
    res.end(buf)
  })
})

const missing = []
server.on('request', (req, res) => {
  res.on('finish', () => {
    if (res.statusCode === 404) missing.push(req.url)
  })
})

async function main() {
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const port = server.address().port
  const puppeteer = require(PUPPETEER)
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
  let bad = 0

  for (const width of WIDTHS) {
    const page = await browser.newPage()
    await page.setViewport({ width, height: 812, deviceScaleFactor: 1 })
    await page.goto(`http://127.0.0.1:${port}${BASE}/`, { waitUntil: 'networkidle0' })

    const out = await page.evaluate((w) => {
      // Nằm trong một vùng cuộn ngang có chủ đích (dải tab của khối mock) thì
      // vượt khung là đúng thiết kế, không phải lỗi. Chỉ báo cái làm tràn trang.
      const inScroller = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const ox = getComputedStyle(p).overflowX
          if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') return true
        }
        return false
      }

      const over = []
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 && r.height === 0) continue
        if (inScroller(el)) continue
        if (r.right > w + 0.5 || r.left < -0.5) {
          over.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.getAttribute('class') || '').slice(0, 48),
            left: Math.round(r.left),
            right: Math.round(r.right),
          })
        }
      }
      return {
        scrollW: document.documentElement.scrollWidth,
        over: over.slice(0, 12),
        fcards: document.querySelectorAll('.fcard').length,
        cols: getComputedStyle(document.querySelector('.fgrid')).gridTemplateColumns,
        h4: getComputedStyle(document.querySelector('.fcard h4')).fontFamily,
      }
    }, width)

    const overflow = out.scrollW > width
    if (overflow || out.over.length) bad++
    console.log(
      `\n[${width}px] scrollWidth=${out.scrollW} ${overflow ? 'TRAN NGANG' : 'ok'} | .fcard=${out.fcards} | fgrid cols=${out.cols}`,
    )
    if (out.over.length) {
      for (const o of out.over) console.log(`   vuot khung: <${o.tag} class="${o.cls}"> left=${o.left} right=${o.right}`)
    }
    if (width === 375) console.log(`   font h4 = ${out.h4}`)
    await page.close()
  }

  // Chạy lại 375px với prefers-reduced-motion để chắc không có gì kẹt ở opacity 0.
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setViewport({ width: 375, height: 812 })
  await page.goto(`http://127.0.0.1:${port}${BASE}/`, { waitUntil: 'networkidle0' })
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.fcard, .pf-card, .step, .mech, .buy-card')].filter(
      (el) => parseFloat(getComputedStyle(el).opacity) < 0.99,
    ).length,
  )
  console.log(`\n[reduced-motion 375px] phan tu con mo (opacity<1): ${hidden}`)
  if (hidden) bad++
  await page.close()

  await browser.close()
  server.close()
  console.log(`\n404 khi tai trang: ${missing.length}${missing.length ? ' -> ' + missing.join(', ') : ''}`)
  if (missing.length) bad++
  console.log(bad ? `\nKET QUA: ${bad} van de` : '\nKET QUA: sach')
  process.exit(bad ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
