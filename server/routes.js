import config from "./config.js"
import { Controller } from "./controller.js"
import { logger } from "./util.js"

const { 
  location, 
  pages: {
    homeHTML,
    controllerHTML
  }
} = config
const controller = new Controller()

async function routes(request, response) {
    const { method, url } = request

    if (method === 'GET' && url === '/') {
        response.writeHead(302, {
            'Location': location.home
        })

        return response.end()
    }

    if (method === 'GET' && url === '/home') {
        const { stream } = await controller.getFileStream(homeHTML)
        return stream.pipe(response)
    }
    
    if (method === 'GET' && url === '/controller') {
        const { stream } = await controller.getFileStream(controllerHTML)
        return stream.pipe(response)
    }

    return response.end('hello')
}

export function handle(request, response) {
    return routes(request, response)
        .catch(error => logger.error(`Deu ruimmm: ${error.stack}`))
}