import {  Prop, h, Element, Component } from '@stencil/core';
import Backend from '../../services/backend';
import Render from '../../services/render';
import Replace from "../../services/replace";

@Component({
  tag: 'supersede-h2',
  styleUrl: 'supersede-h2.css',
  shadow: false
})
export class SupersedeH2  {

  @Element() el: HTMLElement;

  @Prop() class: string;

  content: any;

  readonly = true;

  public backendService: Backend = new Backend();
  public renderService: Render = new Render();
  public replaceService: Replace = new Replace();

  private originalTextContent: string;
  private originalCssClasses: string;

  edit(mouseEvent, cls) {
    this.replaceService.handle2(this, mouseEvent, cls);
  }

  /*static stopEdit(event) {
    console.log("keypressed", event.keyCode);
    if (event.keyCode == 13) {
      var body = document.getElementsByTagName("body")[0];
      body.focus();
      return false;
    }
  }*/

  sendUpdate(text) {
    return fetch(this.backendService.getPostUrl(document, window, this.el.id), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({content: text})
    })
      .then(response => response.json());

  }

  connectedCallback() {
    this.originalTextContent = this.el.innerHTML;
    this.el.innerHTML = "";
    this.originalCssClasses = this.el.className
  }

  componentWillLoad() {
    return fetch(this.backendService.getRetrieveUrl(document, window, this.el.id))
      .then(response => response.json())
      .then(data => {
        this.handleData(data);
      })
      .catch(error => {
        console.log("got error from backend", error);
        this.el.innerHTML = this.originalTextContent;
      });
  }

  render() {
    if (this.readonly) {
      return (<h2 class={this.class} innerHTML={this.content.block}></h2>);
    } else {
      return (<h2 contenteditable="true" class={this.getEditableClasses()} innerHTML={this.content.block}
        onClick={(me) => this.edit(me, this.class)}
      >
      </h2>);
    }
  }

  private handleData(data) {
    this.content = data;
    if (this.content.token != null && this.content.token != "") {
      this.readonly = false;
    }
  }

  private getEditableClasses() {
    return this.originalCssClasses + " editable";
  }
}
