const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs')
const app = express();

app.use(fileUpload());
app.use(express.json())

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/src/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
// app.post('/save',(req ,res) => {
//    const file = req.body;
//    console.log(file)
//    if(req.body.save){
//     console.log('Success!') 
//     fs.writeFile(`${__dirname}/client/src/uploads/test.json`,req.body.save)
//    }

// })
app.listen(5000, () => console.log('Server Started...'));
