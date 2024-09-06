function logout () {
  // @ts-ignore
  return async () => {
    if (localStorage) {
      sessionStorage.clear()
      localStorage.clear()
    }
    window.location.reload()
  }
}

export default logout