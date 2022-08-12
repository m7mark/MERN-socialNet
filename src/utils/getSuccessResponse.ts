export const getSuccessResponse = <T>(data?: T) => ({
  resultCode: 0,
  messages: [],
  data: data || {},
})
