const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv").config();

//creat bucket manually in S3 first

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});
const awsMethods = {
  uploadFiles: async (req, res, next) => {
    console.log(req.body)
    if (req.files) {
      console.log(req.files)
      let params = null;
      const promises = req.files.map(async (file) => {
        return await new Promise((resolve, reject) => {
          if (file.mimetype === "application/epub+zip") {
            // Setting up S3 upload parameters
            params = {
              Bucket: "webooks-epub-files",
              Key: file.originalname, // File name you want to save as in S3
              Body: file.buffer,
            };
          } else {
            params = {
              Bucket: "webooks-images-files",
              Key: file.originalname, // File name you want to save as in S3
              Body: file.buffer,
            };
          }
          const data = s3.upload(params, function (err, data) {
            if (err) {
              reject(err);
              return res.status(500).json({
                status: "failed",
                message:
                  "An error occured during file upload. Please try again.",
              });
            } else {
              console.log(`File uploaded successfully. ${data.Location}`);
              console.log(`File uploaded successfully. ${data.Bucket}`);
              resolve(data);
            }
          });
          return data;
        });
      });
      const uploadedData = await Promise.all(promises);
      req.uploadedData = [...uploadedData];
      return next();
    } else {
      console.log("An epub file is required");
      return res.status(500).json({
        status: "failed",
        message: "An epub file is required",
      });
    }
  },
};

module.exports = awsMethods;

// uploadEpub: (req, res, next) => {
//     // Read content from the file
//     //   const fileContent = fs.readFileSync("middlewares/moby-dick.epub");
//     if (req.files) {
//       console.log(req.files);
//       req.files.forEach((eachFile) => {
//         if ((eachFile.mimetype = "application/epub+zip")) {
//           // Setting up S3 upload parameters
//           const params = {
//             Bucket: BUCKET_NAME_EPUBS,
//             Key: req.file.originalname, // File name you want to save as in S3
//             Body: req.file.buffer,
//           };
//         } else {
//           const params = {
//             Bucket: BUCKET_NAME_IMAGES,
//             Key: req.file.originalname, // File name you want to save as in S3
//             Body: req.file.buffer,
//           };
//         }
//         // Uploading files to the bucket
//         try {
//           s3.upload(params, function (err, data) {
//             if (err) {
//               throw err;
//             }
//             console.log(`File uploaded successfully. ${data.Location}`);
//             req.epubUrls = data.Location;
//             next();
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       });
//     } else {
//       console.log("An epub file is required");
//       return res.status(500).json({
//         status: "failed",
//         message: "An epub file is required",
//       });
//     }
//   },
