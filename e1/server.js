const http = require("http")
const fs = require("fs")

const server = http.createServer((request, response) => {
  let extension = request.url
  const ext = request.url.split(".")[1]

  if (extension !== "/") {
    let ruta
    let contentType
    switch (ext) {
      case "js":
        ruta = ".js" + request.url.substring(1)
        contentType = "text/javascript"
        break
      case "css":
        ruta = request.url.substring(1)
        contentType = "text/css"
        break
      case "html":
        ruta = "./html" + request.url
        contentType = "text/html"
        break
      default:
        ruta = "index.html"
        contentType = "text/html"
    }
    fs.readFile(ruta, (err, data) => {
      if (err) {
        response.writeHead(500)
        console.log(request.url)
        response.end()
      } else {
        response.writeHead(200, {
          "content-Type": contentType,
        })
        console.log(request.url)
        response.write(data)
        response.end()
      }
    })
  } else {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        response.writeHead(500)
        response.end()
      } else {
        response.writeHead(200, {
          "content-Type": "text/html",
        })
        console.log(request.url)
        response.write(data)
        response.end()
      }
    })
  }
})

server.listen(2222)
