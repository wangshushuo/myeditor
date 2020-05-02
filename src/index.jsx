'use strict';
const { useState, useMemo, useEffect } = React;

function Paths({ contents, onSelect }) {

  return (
    <select value={-1} onChange={(event) => onSelect(contents[+event.target.value])}>
      <option key={-1} value="">2. select content</option>
      {contents.map((contentOfPath, index) => (
        <option key={index} value={index}>{contentOfPath.name}</option>
      ))}
    </select>
  )
}

const DEFAULT_PATH = 'content/posts';
export default function ContentURL({ repos, api }) {
  const [repo_full_name, setName] = useState('');
  const [contents_of_repo, setRepo] = useState([]);
  const [contents, setContents] = useState([])
  const [path, setPath] = useState(DEFAULT_PATH);

  const contentURL = useMemo(() => {
    return `/repos/${repo_full_name}/contents/${path}`
  }, [repo_full_name, path])

  const getContent = async (repo_full_name, path = DEFAULT_PATH, name = DEFAULT_PATH) => {
    const contents = await api.content(repo_full_name, path)
    const isDir = Array.isArray(contents);
    if (!isDir) {
      return contents;
    }

    const childrenPromise = contents.map((content) => {
      if (content.type === 'dir') {
        return getContent(repo_full_name, content.path, content.name)
      } else {
        return { name: content.name, content };
      }
    })
    const children = await Promise.all(childrenPromise)
    return { name, content: children };
  }

  useEffect(() => {
    if (!repo_full_name) return;
    const contentsOfRepo = getContent(repo_full_name)
    contentsOfRepo.then(res => {
      console.log(res);
      setContents(res.content)
      setRepo(res.content);
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
      {Array.isArray(contents) &&
        <Paths contents={contents} onSelect={(childContent) => {
          setPath(`${path}/${childContent.name}`)
          setContents(childContent.content)
        }} />
      }
      {path !== DEFAULT_PATH &&
        <button onClick={() => {
          setContents(contents_of_repo)
          setPath(DEFAULT_PATH)
        }}>2.1 重新选择</button>
      }

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

