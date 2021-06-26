// Use the trailing slash for AWS S3 / CloudFront friendly export
// We need to use the website origin rather than REST API with CloudFront
// Otherwise page refresh will not work when in a subdirectory
// https://stackoverflow.com/questions/49082709/redirect-to-index-html-for-s3-subfolder
module.exports = {
  trailingSlash: true,
};
