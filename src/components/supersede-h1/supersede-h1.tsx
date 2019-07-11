import { Component, Prop, Element, h } from '@stencil/core';
import Backend from '../../services/backend';
import Render from '../../services/render';
import Replace from "../../services/replace";

@Component({
  tag: 'supersede-h1',
  styleUrl: 'supersede-h1.css',
  shadow: false
})
export class SupersedeH1 {

  @Element() el: HTMLElement;

  @Prop() name: string = "headline";
  @Prop() class: string;

  content: any;

  readonly = true;

  public backendService: Backend = new Backend();
  public renderService: Render = new Render();
  public replaceService: Replace = new Replace();

  private originalTextContent: string;
  private originalCssClasses: string;

  edit(mouseEvent, cls) {
    this.replaceService.handle2(this,  mouseEvent, cls);
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
    return fetch(this.backendService.getPostUrl(document, window, this.name), {
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
    console.log("h1: originalTextContent", this.el.innerHTML);
    this.originalTextContent = this.el.innerHTML;
    this.el.innerHTML = "";
    this.originalCssClasses = this.el.className
  }

  componentWillLoad() {
    return fetch(this.backendService.getRetrieveUrl(document, window, this.name))
      .then(response => response.json())
      //.then(this.process)
      .then(data => { this.handleData(data);})
      .catch(error => {
        console.error(error)
        this.el.innerHTML = this.originalTextContent;
      });

  }

  render() {
    //this.renderService.render("h1", this.content)
    if (this.readonly) {
      return (<h1 class={this.class} innerHTML={this.content.block}></h1>);
    } else {
      return (<h1 contenteditable="true" class={this.getEditableClasses()} innerHTML={this.content.block}
        onClick={(me) => this.edit(me, this.class)}
        onKeyPress={(me) => this.stopEdit(me)}
      >
      </h1>);
    }
  }

  private handleData(data) {
    this.content = data;
    if (this.content.token != null && this.content.token != "") {
      this.readonly = false;
    }
  }

  private getEditableClasses() {
    console.log("editableClasses", this.originalCssClasses + " editable");
    return this.originalCssClasses + " editable";
  }
}
