module.exports = {
  minimum_chrome_version: '55',
  options_ui: {
    page: 'pages/settings.html',
    chrome_style: true,
  },
  incognito: 'spanning',
  content_security_policy: "script-src 'self' 'unsafe-eval' http://localhost:8080; object-src 'self'",
};
