import {EnvironmentConfigService} from "./environment/environment-config.service";

export default class Backend {

  backendUrl: string = EnvironmentConfigService.getInstance().get('backendUrl');

  getRetrieveUrl(document: Document, window: Window, key: string): RequestInfo {
    console.log('My environment variable value:', this.backendUrl);
    var projectId = document.getElementsByTagName("body")[0].getAttribute("data-supersede-project-id")
    return this.backendUrl + '/api/websites/' + projectId + '/' + key + window.location.search;
  }

  async get(document: Document, window: Window, snippet: string) {
    return fetch(this.getRetrieveUrl(document, window, snippet))
      .then(response => response.json())

  }

  getPostUrl(document: Document, window: Window, key: string) {
    console.log('My environment variable value:', this.backendUrl);
    var pathname = window.location.pathname;
    var projectId = document.getElementsByTagName("body")[0].getAttribute("data-supersede-project-id")
    var backendurl = this.backendUrl + '/api/websites/' + projectId + '/' + btoa(pathname) + '/' + key ;
    return backendurl;

   // 'https://supersede.skysail.io/api/websites/' + this.pro + '/' + btoa(window.location.pathname) + '/' + this.key;
  }
}
