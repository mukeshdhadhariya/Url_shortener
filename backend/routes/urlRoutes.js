import express from "express";
import {  createShortUrl, redirectUrl,getAllUrls } from "../controllers/urlController.js";

const router = express.Router();

router.get("/", getAllUrls);

router.post("/shorten", createShortUrl);
router.get("/:shortId", redirectUrl);
export default router;

