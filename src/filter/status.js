export const statusT = (status) => {
  switch (status) {
    case true:
      return '禁用'
    case false:
      return '正常'
  }
}
