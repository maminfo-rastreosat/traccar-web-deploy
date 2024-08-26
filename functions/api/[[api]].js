export async function onRequest({request, env}) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/positions') && env.POSITIONS_SERVER) {
        const cookies = request.headers.get('Cookie') || ''
        const jSessionId = getCookie(cookies, 'JSESSIONID')
        if (jSessionId) {
            url.searchParams.set('JSESSIONID', jSessionId)
        }
        url.hostname = env.POSITIONS_SERVER
        return Response.redirect(url, 302)
    }
    url.host = env.TRACCAR_SERVER
    url.protocol = 'http:'
    const response = await fetch(new Request(url, request))
    if (!response.ok) {
        console.error(response.status, await response.text())
        return new Response('server error ' + response.status, { status: response.status });
    } else {
        return response
    }
}

function getCookie(cookies, name) {
    const cookieArr = cookies.split(';')
    for (let cookie of cookieArr) {
        const [key, value] = cookie.trim().split('=')
        if (key === name) {
            return value
        }
    }
    return null
}