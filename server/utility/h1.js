const axios = require("axios");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

async function fetchH1(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(url);
        const h1Text = await page.evaluate(() => {
            const h1Elements = Array.from(document.querySelectorAll('h1'));
            return h1Elements.map(h1 => h1.textContent.trim());
        });
        return h1Text;
    } catch (error) {
        console.error("Error fetching h1:", error);
        return [];
    } finally {
        await browser.close();
    }
}

async function checkH1(h1, primaryKeywords) {
    const primaryKeywordsArray = primaryKeywords.split(',').map(keyword => keyword.trim());
    const primaryKeywordsString = primaryKeywordsArray.join(', ');

    const messages = [
        {
            role: "system",
            content: `You are a SEO Expert. Help me to review the Header h1 i.e. '${h1}'. Verify that the h1 incorporates primary keywords i.e. '${primaryKeywordsString}', effectively where relevant. Evaluate whether the H1 tag aligns with the overall SEO strategy and user search intent to determine if optimization is necessary. Please provide the output in json format {"h1": "${h1}", "needOptimization": "yes/no"}.`,
        }
    ];

    console.log('System Prompt:', messages[0].content);
    const apiKey = process.env.AI_API_KEY;
    const url = process.env.AI_API_URL;

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: messages,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await axios.post(url, payload, { headers });
        const result = response.data.choices[0].message.content.trim();
        console.log(result);
        return result.includes('"needOptimization": "yes"');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function optimizeH1(h1, primaryKeywords) {
    const primaryKeywordsArray = primaryKeywords.split(',').map(keyword => keyword.trim());
    const primaryKeywordsString = primaryKeywordsArray.join(', ');

    const messages = [
        {
            role: "system",
            content: `You are an SEO Expert. Optimize the header h1 '${h1}' with primary keywords ‘${primaryKeywordsString}’. Ensure the H1 includes the primary keyword(s), while avoiding keyword stuffing. The H1 should be descriptive, clear, and concise, minimum 30 and maximum 70 characters. Avoid special characters like commas, colons, semicolons, exclamation marks, question marks, and quotation marks. Use hyphens or pipes for clarity if necessary. Consider user search intent for relevance. Provide the output in JSON format: {"h1": "${h1}", "optimized": "optimized h1 here", "reason": "reason for optimization", "impact": "impact on SEO"}.`,
        }
    ];

    console.log('System Prompt:', messages[0].content);
    const apiKey = process.env.AI_API_KEY;
    const url = process.env.AI_API_URL;

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: messages,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

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

module.exports = { fetchH1, checkH1, optimizeH1 };
