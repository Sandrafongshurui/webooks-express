// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// // The ID of your GCS bucket
// const bucketName = "your-unique-bucket-name";

// // The path to your file to upload
// const filePath = "path/to/your/file";

// // The new ID for your GCS file
// const destFileName = "your-new-file-name";

// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();

// async function uploadFile() {
//   const options = {
//     destination: destFileName,
//     // Optional:
//     // Set a generation-match precondition to avoid potential race conditions
//     // and data corruptions. The request to upload is aborted if the object's
//     // generation number does not match your precondition. For a destination
//     // object that does not yet exist, set the ifGenerationMatch precondition to 0
//     // If the destination object already exists in your bucket, set instead a
//     // generation-match precondition using its generation number.
//     preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
//   };

//   await storage.bucket(bucketName).upload(filePath, options);
//   console.log(`${filePath} uploaded to ${bucketName}`);
// }

// uploadFile().catch(console.error);

const googleCloudMethods = {
  uploadFiles: async (req, res, next) => {
    console.log(req.body);
    const uploadedUrls = [];
    if (req.files) {
      console.log(req.files);
      let bucketName = "";
      const promises = req.files.map(async (eachfile) => {
        return new Promise((resolve, reject) => {
          if (eachfile.mimetype === "application/epub+zip") {
            bucketName = "webooks-epub";
          } else {
            bucketName = "webooks-covers";
          }
          const fileName = eachfile.originalname;
          const file = storage.bucket(bucketName).file(fileName);
          const data = file.save(eachfile.buffer, {
            contentType: file.mimetype,
            resumable: false,
            public: true,
          });
          if (data) {
            const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
            resolve({url, type: eachfile.mimetype });
          } else {
            reject();
            return res.status(500).json({
              status: "failed",
              message: "An error occured during file upload. Please try again.",
            });
          }

          //   console.log(`File uploaded at`, url);
          //   uploadedUrls.push({ url, type: eachfile.mimetype });
        //   return { url, type: eachfile.mimetype };
        });
      });
      const uploadedData = await Promise.all(promises);
      console.log("urls:", uploadedData);
      req.uploadedUrls = [...uploadedData];
      return next();
    } else {
      console.log("An epub file is required");
      return res.status(500).json({
        status: "failed",
        message: "An epub file is required",
      });
    }

    // if (!mimetype || mimetype.split("/")[0] !== "image") {
    //   return res.status(400).send("Only images are allowed");
    // }
    // if (size > 10485760) {
    //   return res.status(400).send("Image must be less than 10MB");
    // }
    // const bucketName = "webooks-epub";
    // // const fileExtension = file.originalname.split(".").pop();
    // const fileName = file.originalname;
    // const file = storage.bucket(bucketName).file(fileName);
    // await file.save(req.file.buffer, {
    //   contentType: file.mimetype,
    //   resumable: false,
    //   public: true,
    // });
    // const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    // console.log(`File uploaded at`, url);
    // return res.status(200).send(url);
  },
};
module.exports = googleCloudMethods;
