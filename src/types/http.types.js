export const isActiveFilterEnum = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ALL: 'ALL',
}

export const isActiveParamEnum = {
  ACTIVE: {},
  INACTIVE: { only_trashed: true },
  ALL: { with_trashed: true },
}
