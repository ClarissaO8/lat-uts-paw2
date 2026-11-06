import express from "express";

import BukuController from "../controllers/buku.controller.js";

const router = express.Router();

router.get("/buku", BukuController.index);
router.get("/buku/:id", BukuController.show);
router.post("/buku", BukuController.store);
router.put("/buku/:id", BukuController.update);
router.delete("/buku/:id", BukuController.delete);

export default router;
