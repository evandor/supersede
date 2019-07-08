export default class Render {
  render(readonly: boolean) {
    if (readonly) {
      return "<h1 innerHTML={this.content.block}></h1>";
    } else {
      return "<h1 innerHTML={this.content.block}         >        </h1>";
    }
  }



}
