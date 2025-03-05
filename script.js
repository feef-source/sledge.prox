// Replace "http://" with "https://" in the URL
const url = req.query.url.replace(/^http:\/\//i, 'https://');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/proxy', (req, res) =>
  axios.get(url)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching URL');
    });
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});