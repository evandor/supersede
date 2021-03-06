import {Component, Element, h, Prop} from '@stencil/core';
import Backend from '../../services/backend';
import Render from '../../services/render';
import Replace from "../../services/replace";

@Component({
  tag: 'vam-h4-save',
  shadow: false
})
export class VamH4Save {

  @Element() el: HTMLElement;

  @Prop() class: string;

  content: any;

  readonly = true;

  public backendService: Backend = new Backend();
  public renderService: Render = new Render();
  public replaceService: Replace = new Replace();

  private originalTextContent: string;

  connectedCallback() {
    this.originalTextContent = this.el.textContent;
    this.el.textContent = "";
  }

  componentWillLoad() {
    return fetch(Backend.getPostUrl(document, window, this.el.id), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({content: this.originalTextContent})
    })
      .then(response => response.json());


  }

  render() {
    return (<h4 class={this.class} innerHTML={this.content.block}></h4>);
  }

}
