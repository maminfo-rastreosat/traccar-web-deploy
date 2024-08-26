export function onRequest({request, env}) {
    const url = new URL(request.url.replace('https://', 'http://'))
    url.host = env.TRACCAR_SERVER
        console.log(url)
        const response = await return fetch(new Request(url, request))
    if (!response.ok) {
        console.log(await response.text())
        return new Response('server error ' + response.status, { status: response.status });
    } else {
        return response
    }
}
