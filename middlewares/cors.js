const allowCors = (req, res, next) => {
  // Set the appropriate CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // Update "*" to a specific domain in production
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Call the next middleware function in the chain
  next();
};

export default allowCors;
