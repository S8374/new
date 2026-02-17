export const uploadImageToImageBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error("Image upload failed");
  }
};