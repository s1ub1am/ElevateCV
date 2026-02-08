const puppeteer = require('puppeteer');

/**
 * Generates a PDF from the provided HTML content.
 * @param {string} htmlContent - The full HTML string to render.
 * @returns {Promise<Buffer>} - The generated PDF buffer.
 */
const generatePDF = async (htmlContent) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Safe for most containerized envs
        });
        const page = await browser.newPage();

        // setContent is robust for raw HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0' // Wait for fonts/images
        });

        // Generate PDF with professional print settings
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0mm', // We handle margins in CSS
                bottom: '0mm',
                left: '0mm',
                right: '0mm'
            },
            preferCSSPageSize: true // Respect @page rules
        });

        return pdfBuffer;
    } catch (error) {
        console.error('Puppeteer PDF Generation Error:', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
};

module.exports = { generatePDF };
