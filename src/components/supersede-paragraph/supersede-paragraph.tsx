import { Component, Prop, h } from '@stencil/core';
import Backend from '../../services/backend';
import Render from '../../services/render';
import Replace from "../../services/replace";

@Component({
  tag: 'supersede-paragraph',
  styleUrl: 'supersede-paragraph.css',
  shadow: false
})
export class SupersedeParagraph {
  @Prop() userid: string = "1";
  @Prop() snippetname: string = "headline";
  @Prop() path: string;
  @Prop() cls: string;

  content: any;

  readonly = true;

  public backendService: Backend = new Backend();
  public renderService: Render = new Render();
  public replaceService: Replace = new Replace();

  edit(mouseEvent, cls) {
    this.replaceService.handle(this, 'input', mouseEvent, cls);
  }

  stopEdit(event) {
    console.log("keypressed", event.keyCode);
    if (event.keyCode == 13) {
      var body = document.getElementsByTagName("body")[0];
      body.focus();
      return false;
    }
  }

  sendUpdate(text) {
    //var backendurl = 'http://localhost:6204/api/websites/' + this.userid + '/' + btoa(window.location.pathname) + '/' + this.snippetname;
    var backendurl = 'https://supersede.skysail.io/api/websites/' + this.userid + '/' + btoa(window.location.pathname) + '/' + this.snippetname;
    return fetch(backendurl, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, cors, *same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      //body: JSON.stringify('{"content": "'+text+'"}'), // body data type must match "Content-Type" header
      body: JSON.stringify({content: text})
    })
      .then(response => response.json());

  }

  componentWillLoad() {
    return fetch(this.backendService.getRetrieveUrl(document, window, this.snippetname))
      .then(response => response.json())
      //.then(this.process)
      .then(data => { this.handleData(data);});
  }

  render() {
    //this.renderService.render("h1", this.content)
    if (this.readonly) {
      return (<p class={this.cls} innerHTML={this.content.block}></p>);
    } else {
      return (<p class="editable" innerHTML={this.content.block}
        onClick={(me) => this.edit(me, this.cls)}
        onKeyPress={(me) => this.stopEdit(me)}
      >
      </p>);
    }
  }

  private handleData(data) {
    this.content = data;
    if (this.content.token != null && this.content.token != "") {
      this.readonly = false;
    }
  }
}
