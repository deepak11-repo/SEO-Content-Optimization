const { optimizeUrls } = require('../utility/url'); // Assuming optimizeUrls is exported correctly

const getUrl = async (req, res) => {
    console.log('Get URL');
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }
        const optimizedResults = await optimizeUrls(url); 
        res.status(200).json(optimizedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getUrl };
