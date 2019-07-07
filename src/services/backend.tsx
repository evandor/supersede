
export default class Backend {

    getRetrieveUrl(document: Document, window: Window, snippet: string): RequestInfo {
        var pathname = window.location.pathname;
        var body_userid = document.getElementsByTagName("body")[0].getAttribute("data-supersede-user-id")

        var userIdToUse = body_userid;
        /*if (this.userid) {
            userIdToUse = this.userid
        }*/
        var backendurl = 'http://localhost:6204/api/websites/' + userIdToUse + '/' + btoa(pathname) + '/' + snippet + window.location.search;
        console.log("backendurl4", backendurl);
        return backendurl;
    }


    get2(userIdToUse: string, path: string, snippetname: string, f: Function) {

        var backendurl = 'http://localhost:6204/api/websites/' + userIdToUse + '/' + btoa(path) + '/' + snippetname + window.location.search;
        console.log("backendurl3", backendurl);
        return fetch(backendurl)
            .then(response => response.json())
            .then(data => {
                f(data)
            });
    }

}