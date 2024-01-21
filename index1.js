import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Function to generate and save QR code based on URL
const generateAndSaveQRCode = (url, index) => {
    const qr_svg = qr.image(url);
    const qrFileName = `qr_code_${index}.png`;

    // Save QR code image to a file with a unique name
    qr_svg.pipe(fs.createWriteStream(qrFileName));

    // Save user-entered URL to a text file with a unique name
    const txtFileName = `URL_${index}.txt`;
    fs.writeFile(txtFileName, url, (err) => {
        if (err) throw err;
        console.log(`QR code and URL ${index} have been saved!`);
    });
};

// Function to prompt user for URLs recursively
const promptUserForURLs = (index) => {
    inquirer
        .prompt([
            {
                message: `Write URL ${index + 1}:`,
                name: "url"
            }
        ])
        .then((answers) => {
            const url = answers.url;

            // Generate and save QR code based on user input
            generateAndSaveQRCode(url, index);

            // Prompt user for the next URL recursively
            promptUserForURLs(index + 1);
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
};

// Start prompting the user for URLs
promptUserForURLs(0);
