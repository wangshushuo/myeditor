function query() {
  const query = {};
  if (window.location.search) {
      let search = window.decodeURI(window.location.search)
      search = search.replace(/ +/g, '');
      search = search.replace(/\?/g, '&')

      search.split('&').forEach((item) => {
          if (item) {
              const [key, value] = item.split('=')
              query[key] = window.decodeURI(value + '');
          }
      })
  }

  return query
}

export default query();