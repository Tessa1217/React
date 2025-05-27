export const selectPagingByKey =
  (key) =>
  ({ paging }) =>
    paging[key] || {};
