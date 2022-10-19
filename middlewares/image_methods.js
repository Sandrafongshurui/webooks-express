const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
  publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

const imageMethods = {
  uploadImge: (req, res, next) => {
    // console.log(req.file)
    if (req.file) {
      imagekit.upload(
        {
          file: req.file.buffer,
          fileName: req.file.originalname, //required
          folder: "webooks_profile_images",
        },
        function (err, response) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              status: "failed",
              message: "An error occured during file upload. Please try again.",
            });
          } else {
            req.file = response.thumbnailUrl;
            next();
          }
        }
      );
    } else {
      console.log("no req.file");
      return res.status(500).json({
        status: "failed",
        message: "An image is required",
      });
    }
  },
};

module.exports = imageMethods;

//MULTI-IMAGE

// uploadImage: async (req, res, next) => {
//     if (req.files) {
//       //multer midleware allows the req.file to come through
//       console.log(" 1-have req.files");
//       console.log("2-req.files--->");
//       const promises = req.files.map(async (file) => {
//         return await new Promise((resolve, reject) => {
//           const response = imagekit.upload(
//             {
//               file: file.buffer,
//               fileName: file.originalname, //required
//               folder: "listing_images",
//             },
//             function (err, response) {
//               if (err) {
//                 reject(err);
//                 console.log(err);
//                 return res.status(500).json({
//                   status: "failed",
//                   message:
//                     "An error occured during file upload. Please try again.",
//                 });
//               } else {
//                 resolve(response.thumbnailUrl);
//                 console.log("3 -", response);
//                 console.log("4 - store in dbs", response.thumbnailUrl);
//               }
//             }
//           );
//           return response
//         });
//       });
//       const fileUrls = await Promise.all(promises);
//       req.files = [...fileUrls]
//       return next()
//     } else {
//       console.log("no req.file");
//       return res.status(500).json({
//         status: "failed",
//         message: "An image is required",
//       });
//     }
//   },
// if (fileUrls) {
//   console.log(fileUrls);
//   req.files = [...fileUrls];
//   return next();
// }
