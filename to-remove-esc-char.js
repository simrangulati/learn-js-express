
const express = require('express');
const app = express();

// Custom middleware to remove escape sequences from JSON responses
app.use((req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    // Remove escape sequences from the JSON body
    const modifiedBody = JSON.stringify(body).replace(/\u001b\[.*?m/g, '');

    // Set the Content-Type header to specify JSON format
    res.set('Content-Type', 'application/json');

    // Call the original json method with the modified body
    originalJson(JSON.parse(modifiedBody));
  };
  next();
});

app.get('/', (req, res) => {
  // Generate an object with an escape sequence
  const data = { message: '\x1B[31mHello, world!\x1B[0m' };

  // Send the response as JSON
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
