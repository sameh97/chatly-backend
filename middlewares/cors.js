const allowCors = (req, res, next) => {
  // Set the appropriate CORS headers to allow all origins
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Call the next middleware function in the chain
  next();
};

export default allowCors;
// module.exports = allowCors;
