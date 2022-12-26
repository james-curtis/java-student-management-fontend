module.exports = {
  '{src,build,mock,tests,types}/**/*.{vue,ts,js,jsx,tsx}': 'eslint',
  '{src,build,mock,tests,types}/**/*.{css,less,scss,html}': 'prettier --check',
};
