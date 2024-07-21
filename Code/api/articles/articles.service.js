const Article = require("./articles.schema");

class ArticleService {
    create(data) {
      const article = new Article(data);
      return article.save();
    }
    update(id, data) {
      return Article.findByIdAndUpdate(id, data, { new: true });
    }
    delete(id) {
      return Article.deleteOne({ _id: id });
    }
    async getUserArticles(user) {
      const articles = await Article.findById(user).populate('user');
      return articles;
    }
  }
  
  module.exports = new ArticleService();