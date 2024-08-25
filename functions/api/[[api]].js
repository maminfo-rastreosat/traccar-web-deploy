export function onRequest({request, env}) {
    const url = new URL(request.url.replace('https://', 'http://'))
    url.host = env.TRACCAR_SERVER
    try {
        return fetch(new Request(url, request))
    } catch (e) {
        console.error(e)
        return new Response(e.message, { status: 500 });
    }
}
