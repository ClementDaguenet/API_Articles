const articlesService = require("./articles.service");
const usersService = require("../users/users.service")

class ArticlesController {
  async create(req, res, next) {
    try {
      const user = await usersService.get(req.params.user);
      const article = await articlesService.create(req.body);
      article.user = user;
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const user = await usersService.get(req.params.user);
      if (user.role === "admin") {
        const id = req.params.id;
        const data = req.body;
        const articleModified = await articlesService.update(id, data);
        res.json(articleModified);
      }
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const user = await usersService.get(req.params.user);
      if (user.role === "admin") {
        const id = req.params.id;
        await articlesService.delete(id);
        req.io.emit("article:delete", { id });
        res.status(204).send();
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
