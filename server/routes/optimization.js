const express = require("express");
const router = express.Router();

const { getTitle } = require("../controllers/optimizeTitle");
const { getMetaDescription } = require("../controllers/optimizeMeta");
const { getH1 } = require("../controllers/optimizeH1");
const { getH2 } = require("../controllers/optimizeH2");
const { getH3 } = require("../controllers/optimizeH3");
const { getH4 } = require("../controllers/optimizeH4");
const { getH5 } = require("../controllers/optimizeH5");
const { getH6 } = require("../controllers/optimizeH6");
const { getP } = require("../controllers/optimizeP");
const { getImage } = require("../controllers/optimizeImage");
const { getAnchor } = require("../controllers/optimizeAnchor");
const { getUrl } = require("../controllers/optimizeUrl");

router.get("/title", getTitle);
router.get("/meta", getMetaDescription);

router.get("/h1", getH1);
router.get("/h2", getH2);
router.get("/h3", getH3);
router.get("/h4", getH4);
router.get("/h5", getH5);
router.get("/h6", getH6);

router.get("/para", getP);

router.get("/image", getImage);

router.get("/anchor", getAnchor);

router.get("/address", getUrl);

module.exports = router;