module.exports = class BaseListData {
  constructor({
    key,
    name,
    layout = "article-detail.njk"
  }) {
    this.collection = key;
    this.name = name;
    this.layout = layout;
    this.tags = key;
    this.parent = {
      url: "/" + key,
      name,
    };
  }
}