import { mongooseConnect } from "@/lib/mongoose";
import cloudinary from "cloudinary";
import multipary from "multiparty";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  await mongooseConnect();

  const form = new multipary.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const uploadPromises = files.file.map(file => {
    return cloudinary.v2.uploader.upload(file.path, {
      folder: "design2code",
      public_id: `file_${Date.now()}`,
      resource_type: "auto",
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto" }
      ]
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    const links = results.map(result => result.secure_url);
    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}
