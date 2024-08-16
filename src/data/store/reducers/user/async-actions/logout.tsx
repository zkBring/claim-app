function logout () {
  // @ts-ignore
  return async () => {
    if (localStorage) {
      localStorage.clear()
    }
    window.location.reload()
  }
}

export default logout