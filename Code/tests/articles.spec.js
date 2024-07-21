const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("tester API articles", () => {
  let token;
  const ARTICLE_ID = "fake";
  const USER_ID = "fake_user";
  const MOCK_DATA = [
    {
      _id: ARTICLE_ID,
      title: "Carton",
      content: "Chat",
      user: USER_ID,
    },
  ];
  const MOCK_DATA_CREATED = {
    title: "test",
    content: "testtest",
    user: "1234",
  };
  const MOCK_DATA_UPDATED = {
    title: "retest",
    content: "testretest",
    user: "1234",
  };

  beforeEach(() => {
    token = jwt.sign({ userId: ARTICLE_ID }, config.secretJwtToken);
    mockingoose(Article).toReturn(MOCK_DATA, "find");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
  });

  test("[Articles] Create Article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED);
    expect(res.status).toBe(500);
    expect(res.body.name).toBe(MOCK_DATA_CREATED.name);
  });

  test("[Articles] Update Article", async () => {
    const res = await request(app)
      .put("/api/articles/" + ARTICLE_ID)
      .send(MOCK_DATA_UPDATED);
    expect(res.status).toBe(500);
    expect(res.body.name).toBe(MOCK_DATA_UPDATED.name);
  });

  test("[Articles] Delete Article", async () => {
    const res = await request(app)
      .delete("/api/articles/" + ARTICLE_ID);
    expect(res.status).toBe(500);
    expect(res.body.name).toBe(MOCK_DATA.name);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
