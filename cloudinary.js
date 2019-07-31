// cloudinary.config({ 
//   cloud_name: 'bvodola', 
//   api_key: '473224552137915', 
//   api_secret: 'v7LeyME3W9ePDvhhqd1atf1bT1k' 
// });

// cloudinary.uploader.upload(`static/reports/${context._client._id}.docx`,
//   {resource_type: 'auto'}, function(error, result) {
//   if(error) {
//     console.log(error)
//     res.sendStatus(500);
//   } else {
//     console.log(result);
//     res.statusCode = 302;
//     res.setHeader("Location", "https://docs.google.com/gview?url="+result.url);
//     res.end();
//   }
// });