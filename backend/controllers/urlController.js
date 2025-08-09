import nanoid from "../utils/generateId.js";
import validator from "validator";
import Url from "../database/url_schema.js";

export const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl || !validator.isURL(longUrl, { require_protocol: true })) {
    return res.status(400).json({ error: "Invalid URL. Must include http/https." });
  }
  const shortId = nanoid();
  await Url.create({ shortId, longUrl ,clicks:0});
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
};

export const redirectUrl = async (req, res) => {
  const urlDoc = await Url.findOne({ shortId: req.params.shortId });

  if (urlDoc) {
    urlDoc.clicks+=1;
    await urlDoc.save()
    return res.redirect(urlDoc.longUrl)
  };
  res.status(404).json({ error: "Short URL not found" });
};

export const getAllUrls=async (req,res)=>{
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
}

