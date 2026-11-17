// Sends every request on hahakigami.app and the www hosts to the same path on hahakigami.com.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'hahakigami.com';
    url.port = '';
    return Response.redirect(url, 301);
  }
};
