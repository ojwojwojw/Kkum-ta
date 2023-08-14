const fs = require('fs');
const path = require('path');

const webpackConfigPath = path.join(__dirname, '..', 'node_modules', 'react-scripts', 'config', 'webpack.config.js');
let configContent = fs.readFileSync(webpackConfigPath, 'utf8');

if (configContent.includes('NodePolyfillPlugin')) {
  console.log('NodePolyfillPlugin is already present.');
  process.exit(0);
}

configContent = `const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")\n` + configContent
fs.writeFileSync(webpackConfigPath, configContent);

const sections = configContent.split('plugins: [');
if (sections.length < 2) {
    console.error("Couldn't find the plugins section in webpack.config.js. Please check manually.");
    process.exit(1);
}

// console.log(sections)

// Reassemble the sections, but modify the last 'plugins: [' occurrence (the outermost)
const lastSectionIndex = sections.length - 1;
sections[lastSectionIndex] = 'new NodePolyfillPlugin(),\n' + sections[lastSectionIndex];

const updatedConfigContent = sections.join('plugins: [');

fs.writeFileSync(webpackConfigPath, updatedConfigContent);
