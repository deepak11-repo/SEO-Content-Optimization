const { processAnchor } = require('../utility/anchor');

const getAnchor = async (req, res) => {
    console.log('Anchor endpoint called');
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ message: "URL parameter is required" });
        }
        
        const output = await processAnchor(url);
        res.status(200).json(output);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getAnchor };
