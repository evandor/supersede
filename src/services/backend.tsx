
export default class Backend {

    getRetrieveUrl(document: Document, window: Window, snippet: string): RequestInfo {
        var pathname = window.location.pathname;
        var body_userid = document.getElementsByTagName("body")[0].getAttribute("data-supersede-user-id")

        var userIdToUse = body_userid;
        /*if (this.userid) {
            userIdToUse = this.userid
        }*/
        var backendurl = 'http://localhost:6204/api/websites/' + userIdToUse + '/' + btoa(pathname) + '/' + snippet + window.location.search;
        return backendurl;
    }


    async get(document: Document, window: Window, snippet: string) {
      return fetch(this.getRetrieveUrl(document, window, snippet))
        .then(response => response.json())

    }

  }
