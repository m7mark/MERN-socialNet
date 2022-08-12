export const getPaginateOptions = (page: string, count: string) => ({
  sort: '-createdAt',
  page: (page && +page) || 1,
  limit: (count && +count) || 10,
  select: 'id name status photos followed',
})
