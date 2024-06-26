const { fetchH1, checkH1, optimizeH1 } = require("../utility/h1");

const getH1 = async (req, res) => {
    try {
        const { url, primaryKeywords } = req.query;
        if (!url || !primaryKeywords) {
            return res.status(400).json({ message: "URL and primaryKeywords are required" });
        }
        const h1 = await fetchH1(url);
        const optimizationNeeded = await checkH1(h1, primaryKeywords);
        if (optimizationNeeded) {
            const output = await optimizeH1(h1, primaryKeywords); 
            const outputJson = JSON.parse(output); 
            res.status(200).json({message: "yes", outputJson});
        } else {
            // Include the fetched h1 in the response
            res.status(200).json({ message: "no", h1: h1 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getH1 };
