const fs = require('fs');
const path = require('path');

const webpackConfigPath = path.join(__dirname, '..', 'node_modules', 'react-scripts', 'config', 'webpack.config.js');
const configContent = fs.readFileSync(webpackConfigPath, 'utf8');

if (configContent.includes('ProvidePlugin')) {
  console.log('ProvidePlugin is already present.');
  process.exit(0);
}

// resolve
{
  const configContent = fs.readFileSync(webpackConfigPath, 'utf8');
  const sections = configContent.split('plugins: [');
  const lastSectionIndex = sections.length - 1;
  sections[lastSectionIndex] =
    '\n'
    + 'new webpack.ProvidePlugin({ Buffer: ["buffer", "Buffer"] }),\n'
    + 'new webpack.ProvidePlugin({ process: "process" }),\n'
    + 'new webpack.ProvidePlugin({ url: "url" }),\n'
    + sections[lastSectionIndex];
  const updatedConfigContent = sections.join('plugins: [');
  fs.writeFileSync(webpackConfigPath, updatedConfigContent);
}
// plugin
{
  const configContent = fs.readFileSync(webpackConfigPath, 'utf8');
  const sections = configContent.split('resolve: {');
  const lastSectionIndex = sections.length - 1;
  sections[lastSectionIndex] =
    '\n'
    + `fallback: {
        buffer: require.resolve('buffer/'),
        url: require.resolve('url/'),
        process: require.resolve('process/'),
      },`
    + sections[lastSectionIndex];
  const updatedConfigContent = sections.join('resolve: {');
  fs.writeFileSync(webpackConfigPath, updatedConfigContent);
}



