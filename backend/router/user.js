const express = require("express");
const {
  createUser,
  deleteUserById,
  GetById,
  GetUser,
  updateUser,
  sortByPriory,
  sortByDate,
} = require("../controller/user.js");

const router = express.Router();
router.get("/sortByDate", sortByDate); // READ
router.get("/sortByPriory", sortByPriory); // READ
router.post("/", createUser); // CREATE
router.put("/:id", updateUser); // update
router.get("/", GetUser); // READ
router.get("/:id", GetById); // READ
router.delete("/:id", deleteUserById); // delete

module.exports = router;
