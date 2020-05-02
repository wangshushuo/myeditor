'use strict';
const { useState, useMemo, useEffect } = React;

export default function ContentURL({ repos, api }) {
  const [repo_full_name, setName] = useState('');
  const [paths, setPaths] = useState([])
  const [path, setPath] = useState('');

  const contentURL = useMemo(() => {
    return `/repos/${repo_full_name}/contents/${path}`
  }, [repo_full_name, path])

  const getContent = async (repo_full_name, path) => {
    const contents = await api.content(repo_full_name, path)
    const isDir = Array.isArray(contents);
    if (!isDir) {
      return contents;
    }

    const childrenPromise = contents.map((content) => {
      if (content.type === 'dir') {
        return getContent(repo_full_name, content.path)
      } else {
        return content;
      }
    })
    const children = await Promise.all(childrenPromise)
    return children;
  }

  useEffect(() => {
    if (!repo_full_name) return;
    const contents = getContent(repo_full_name)
    contents.then(res => {
      console.log(_.flattenDeep(res));
    })

  }, [repo_full_name])


  return (
    <p>
      <span>/repos</span>
      <span>/</span>
      <select value={repo_full_name || -1} onChange={(event) => setName(event.target.value)}>
        <option key={-1} value="">1. select repo</option>
        {repos.map((repo, i) => (
          <option key={i} value={repo.full_name}>{repo.full_name}</option>
        ))}
      </select>
      <span>/contents</span>
      <span>/{path}</span>
      <select value="2" onChange={(event) => console.log(event.target.value)}>
        <option key={-1} value="">2. select content</option>
        {paths.map((repo, i) => (
          <option key={i} value={repo.full_name}>{repo.full_name}</option>
        ))}
      </select>
      <button onClick={() => {
        if (!repo_full_name || !path) {
          alert('请先完成 1. 和 2. ')
          return;
        }
        onBegin(contentURL)
      }}>3. 开始编辑</button>
    </p>
  )
}

