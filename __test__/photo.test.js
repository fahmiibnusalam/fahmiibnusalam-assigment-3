const app = require("../app")
const request = require("supertest")
const { generateToken } = require("../helpers/jwt")
const { Photo } = require("../models")
const { User } = require("../models")

describe("Photo routes testing", () => {
  let token
  let userId
  let id

  beforeAll(async () => {
    try {
      const user = await User.create({
        username: "fahmiibnu",
        email: "fahmiibnu@gmail.com",
        password: "12345",
      })

      token = await generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
      })

      const photo = await Photo.create({
        title: "data-testing",
        caption: "data-testing",
        image_url: "data-testing",
        UserId: user.id,
      })
      id = photo.id
      userId = user.id
    } catch (err) {
      console.log(err)
    }
  })

  // getallphotos success response   
  it("response must be 200", (done) => {
    request(app)
      .get("/photos")
      .set("token", token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body[0]).toHaveProperty("id")
        expect(res.body[0]).toHaveProperty("title")
        expect(res.body[0]).toHaveProperty("caption")
        expect(res.body[0]).toHaveProperty("image_url")
        expect(res.body[0]).toHaveProperty("UserId")
        done()
      })
  })

  // getallphotos error response   
  it("response must be 401", (done) => {
    request(app)
      .get("/photos")
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("message")
        done()
      })
  })

   // createphoto success response   
   it("response must be 201", (done) => {
    request(app)
      .post("/photos")
      .set("token", token)
      .send({
        title: "bebas",
        caption: "bebas",
        image_url: "bebas",
        UserId: userId,
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("title")
        expect(res.body).toHaveProperty("caption")
        expect(res.body).toHaveProperty("image_url")
        expect(res.body).toHaveProperty("UserId")
        expect(res.body).toHaveProperty("updatedAt")
        expect(res.body).toHaveProperty("createdAt")
        done()
      })
  })

  // createphoto error response   
  it("response must be 401", (done) => {
    request(app)
      .post("/photos")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("message")
        done()
      })
  })

  // getphotobyid success response   
  it("response must be 200", (done) => {
    request(app)
      .get("/photos/" + id)
      .set("token", token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("title")
        expect(res.body).toHaveProperty("caption")
        expect(res.body).toHaveProperty("image_url")
        expect(res.body).toHaveProperty("UserId")
        done()
      })
  })

  // getphotobyid error response   
  it("response must be 404", (done) => {
    request(app)
      .get("/photos/100")
      .set("token", token)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("devMessage")
        done()
      })
  })

  afterAll(async () => {
    try {
      await User.destroy({
        where: {},
      })

      await Photo.destroy({
        where: {},
      })
    } catch (err) {
      console.log(err)
    }
  })
})

