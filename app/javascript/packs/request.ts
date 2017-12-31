import * as superagent from 'superagent'

export namespace request {
    export function get(url: string): superagent.Request {
        return use(superagent.get(url))
    }

    export function post(url: string): superagent.Request {
        return use(superagent.post(url))
    }

    export function put(url: string): superagent.Request {
        return use(superagent.put(url))
    }

    export function patch(url: string): superagent.Request {
        return use(superagent.patch(url))
    }

    export function save(url: string, id: number | string) {
        return use(id ? superagent.put(`${url}/${id}`) : superagent.post(url))
    }

    export function del(url: string): superagent.Request {
        return use(superagent.delete(url))
    }

    function use(req: superagent.Request): superagent.Request {
        return req
            .set('X-CSRF-Token', (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content)
            .set('Accept', 'application/json')
            .use(require('superagent-intercept')((err, res) => {
                if (process.env.NODE_ENV == 'development') {
                    res ? console.log(`${res.req.method} ${res.req.url}`, err || res) : ''
                }
            }))
    }
}