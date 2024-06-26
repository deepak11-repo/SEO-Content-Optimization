const axios = require("axios");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

async function fetchH2(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();    
    try {
        await page.goto(url);
        const h2Text = await page.evaluate(() => {
            const h2Elements = Array.from(document.querySelectorAll('h2'));
            return h2Elements.map(h2 => h2.textContent.trim());
        });
        return { h2: h2Text };
    } catch (error) {
        console.error('Error fetching H2:', error);
    } finally {
        await browser.close();
    }
}

async function checkH2(h2, secondaryKeywords) {
    const secondaryKeywordsArray = secondaryKeywords.split(',').map(keyword => keyword.trim());
    const secondaryKeywordsString = secondaryKeywordsArray.join(', ');
    const apiKey = process.env.AI_API_KEY;
    const url = process.env.AI_API_URL;

    const messages = [
        {
            role: "system",
            content: `You are an SEO Expert. Help me to review Header H2 tags. Check if there are suitable opportunities to naturally integrate secondary keywords i.e. '${secondaryKeywordsString}', ensuring they are relevant to the specific section of content and flow seamlessly within the context of the header. Evaluate whether the H2 tags align with the overall SEO strategy and user search intent to determine if optimization is required (Yes/No). For each H2 please provide the output in json format [{"h2": "", "needOptimization": "yes/no"}], don't output anything else except the json.`,
        }, 
        {
            role: "user",
            content: JSON.stringify(h2, null, 2)
        }
    ];

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: messages,
    };

    // Send data to API
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await axios.post(url, payload, { headers });        
        const result = response.data.choices[0].message.content.trim();
        const optimizedH2Array = JSON.parse(result).filter(item => item.needOptimization === 'yes');
        return optimizedH2Array.map(item => item.h2); 
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function optimizeH2(h2, secondaryKeywords) {
    const secondaryKeywordsArray = secondaryKeywords.split(',').map(keyword => keyword.trim());
    const secondaryKeywordsString = secondaryKeywordsArray.join(', ');
    const apiKey = process.env.AI_API_KEY;
    const url = process.env.AI_API_URL;

    const messages = [
        {
            role: "system",
            content: `You are an SEO Expert. Help me optimize the header h2 for keywords ‘${secondaryKeywordsString}’. Ensure the H2 includes the keywords, while including keywords is important, overloading the H2 with keywords can hurt readability and SEO. H2 should be descriptive, informative, and relevant. to both users and search engines. Keep the H1 between 30 and 70 characters to ensure it displays properly in search results and on the webpage. Avoid Special Characters like commas, colons, semicolons, exclamation marks, question marks, and quotation marks should be avoided for better readability and search engine friendliness. Use hyphens or pipes if needed for clarity. Consider what users are likely searching for and ensure the H2 matches their intent. 
            For each h2, please provide the output in the following format:
            [{
            "h2": "current h2 here",
            "optimized": "optimized h2 here",
            "reason": "any flaws in the current h2 here",
            "impact": "impact on SEO here"
            }]
            Don't add anything else except this JSON in the output.`,            
        }, 
        {
            role: "user",
            content: JSON.stringify(h2, null, 2)
        }
    ];

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: messages,
    };

    // Send data to API
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    console.log('System Prompt:', messages[0].content);
    console.log('User Prompt:', messages[1].content);
    try {
        const response = await axios.post(url, payload, { headers });        
        const result = response.data.choices[0].message.content.trim();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

module.exports = { fetchH2, checkH2, optimizeH2 };

