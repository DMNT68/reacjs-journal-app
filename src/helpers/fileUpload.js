export const fileUpload = async (file) => {
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/dz8s8db6p/upload`;
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);
  try {
    const resp = await fetch(cloudinaryURL, {
      method: 'POST',
      body: formData,
    });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
