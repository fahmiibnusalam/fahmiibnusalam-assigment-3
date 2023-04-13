const router = require("express").Router()
const {
  getAllPhotos,
  getOnePhotoById,
  createPhoto,
  updateOnePhotoById,
  deleteOnePhotoById,
} = require("../controllers/photoController")
const { register, login } = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

// User Routers
router.post("/users/register", register)
router.post("/users/login", login)

router.use(authentication)
// Photos Routers
router.get("/photos", getAllPhotos)
router.get("/photos/:id", getOnePhotoById)
router.post("/photos", createPhoto)
router.use("/photos/:id", authorization)
router.put("/photos/:id", updateOnePhotoById)
router.delete("/photos/:id", deleteOnePhotoById)

module.exports = router
