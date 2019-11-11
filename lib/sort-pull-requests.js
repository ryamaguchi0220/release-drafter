const SORT_DIRECTIONS = {
  ascending: 'ascending',
  descending: 'descending'
}

const SORT_BY = {
  title: 'title',
  mergedAt: 'mergedAt'
}

module.exports.SORT_DIRECTIONS = SORT_DIRECTIONS
module.exports.SORT_BY = SORT_BY

module.exports.validateSortDirection = sortDirection => {
  return Object.keys(SORT_DIRECTIONS).includes(sortDirection)
    ? sortDirection
    : SORT_DIRECTIONS.descending
}

module.exports.validateSortBy = sortBy => {
  return Object.keys(SORT_BY).includes(sortBy) ? sortBy : SORT_BY.mergedAt
}

module.exports.sortPullRequests = (pullRequests, sortBy, sortDirection) => {
  const sortFn =
    sortDirection === SORT_DIRECTIONS.ascending
      ? dateSortAscending
      : dateSortDescending

  const getSortFieldFn = sortBy === SORT_BY.title ? getTitle : getMergedAt

  return pullRequests
    .slice()
    .sort((a, b) => sortFn(getSortFieldFn(a), getSortFieldFn(b)))
}

function getTitle(pullRequest) {
  return pullRequest.title
}

function getMergedAt(pullRequest) {
  return new Date(pullRequest.mergedAt)
}

function dateSortAscending(date1, date2) {
  if (date1 > date2) return 1
  if (date1 < date2) return -1
  return 0
}

function dateSortDescending(date1, date2) {
  if (date1 > date2) return -1
  if (date1 < date2) return 1
  return 0
}
