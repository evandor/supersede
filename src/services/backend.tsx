
export default class Backend {

  //backendUrl: string = EnvironmentConfigService.getInstance().get('backendUrl');

  static getRetrieveUrl(document: Document, window: Window, key: string): RequestInfo {
    var projectId = document.getElementsByTagName("body")[0].getAttribute("data-vam-project-id");
    return this.getBackendUrl(document) + '/api/websites/' + projectId + '/' + key + window.location.search;
  }

  static get2(document: Document, window: Window, key: string, callback: any) {
    var projectId = document.getElementsByTagName("body")[0].getAttribute("data-vam-project-id");
    var url = this.getBackendUrl(document) + '/api/websites/' + projectId + '/' + key + window.location.search;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        //this.handleData(data);
        callback(data)
      })
      .catch(error => {
        console.log("got error from backend", error);
        //this.el.innerHTML = this.originalTextContent;
      });
  }

  async get(document: Document, window: Window, snippet: string) {
    return fetch(Backend.getRetrieveUrl(document, window, snippet))
      .then(response => response.json())

  }

  static getPostUrl(document: Document, window: Window, key: string) {
    var pathname = window.location.pathname;
    var projectId = document.getElementsByTagName("body")[0].getAttribute("data-vam-project-id")
    return  this.getBackendUrl(document) + '/api/websites/' + projectId + '/' + btoa(pathname) + '/' + key ;
  }

  private static getBackendUrl(document: Document) {
    var backendUrl = document.getElementsByTagName("body")[0].getAttribute("data-vam-backend-url");
    if (!backendUrl) {
      return "https://supersede.skysail.io"
    }
    return backendUrl;
  }

}
