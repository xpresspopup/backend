import cloudinary from 'cloudinary';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apikey,
  api_secret: config.cloudinary.secret,
});
// const uploads = file =>
// 	new Promise(resolve => {
// 		cloudinary.uploader.upload(
// 			file,
// 			result => {
// 				resolve({ url: result.url, id: result.public_id });
// 			},
// 			{ resource_type: 'auto' },
// 		);
// 	});
const uploads = {
  picture: file => new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: 'auto' },
    );
  }),
  cv: file => new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: 'raw' },
    );
  }),
};

export default uploads;
