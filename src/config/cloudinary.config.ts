export const getCloudinaryOptions = (fileName: string) => ({
  folder: 'SNOAPI',
  filename_override: `${fileName}`,
  unique_filename: false,
  use_filename: true,
})

export const getCloudinaryConfig = () => ({
  cloud_name: 'm7mark',
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
