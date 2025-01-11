const colors = {
  green: "\x1b[32m%s\x1b[0m",
  red: "\x1b[31m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
};

const logRequest = (value, status) => {
  if (status >= 500) console.log(colors.red, value);
  else if (status >= 400) console.log(colors.yellow, value);
  else if (status >= 300) color = console.log(colors.green, value);
  else console.log(colors.green, value);
};

const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logRequest(`${req.method} (${duration}ms) URL: ${req.originalUrl}  STATUS: ${res.statusCode}`, res.statusCode);
  });

  next();
};

module.exports = loggerMiddleware;
