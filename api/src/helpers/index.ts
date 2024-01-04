export function getPaginationObj(page: number, limit: number, count: number) {
  return {
    page: Number(page),
    limit: Number(limit),
    count,
    totalPage: Math.ceil(count / limit),
  };
}
