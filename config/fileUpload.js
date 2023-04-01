import cloudinaryPackage from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from "dotenv";
dotenv.config();
const cloudinary=cloudinaryPackage.v2;

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    allowedFormats:["jpg","jpeg","png"],
    params:{
        folder:"ECOMMERCE",
    },
})

//init multer with storage
const upload=multer({
    storage,
});

export default upload;