const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const glob = require('glob');

async function buildSite() {
  try {
    // Define directories
    const rootDir = __dirname;
    const viewsDir = path.join(rootDir, 'views');
    const publicDir = path.join(rootDir, 'public');
    const distDir = path.join(rootDir, 'dist');

    // 1. Clean the dist folder
    console.log('Cleaning the output directory...');
    await fs.remove(distDir);
    await fs.ensureDir(distDir);

    // 2. Copy public assets into the dist folder
    console.log('Copying public assets...');
    // Here, assets will be in dist/public; adjust as needed
    await fs.copy(publicDir, path.join(distDir, 'public'));

    // 3. Compile all EJS templates into HTML
    console.log('Compiling EJS templates...');
    // Use glob to get all .ejs files recursively in views directory
    const files = glob.sync('**/*.ejs', { cwd: viewsDir });

    // Loop through each EJS file found
    for (const file of files) {
      // Construct the full path to the source EJS file
      const filePath = path.join(viewsDir, file);

      // Render the EJS file into an HTML string.
      // Pass an empty object here, or provide specific data if needed.
      const html = await ejs.renderFile(filePath, {});

      // Determine the output file path:
      // Replace the .ejs extension with .html and put into the same folder structure
      const outputFilePath = path.join(distDir, file.replace(/\.ejs$/, '.html'));

      // Ensure the directory for the output file exists
      await fs.ensureDir(path.dirname(outputFilePath));

      // Write the rendered HTML file
      await fs.writeFile(outputFilePath, html);
      console.log(`Rendered: ${file} --> ${outputFilePath}`);
    }

    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Error during build:', error);
    process.exit(1);
  }
}

// Run the build process
buildSite();
