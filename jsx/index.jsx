/** @jsxRuntime classic */

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

const DEFAULT_PATH = '/content/posts';
export default function ContentURL({ repos, getContent, onContent }) {
  const [repo_full_name, setName] = useState('');
  const [contents_of_repo, setRepo] = useState([]);
  const [contents, setContents] = useState([])
  const [path, setPath] = useState(DEFAULT_PATH);

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
      <span>{path}</span>
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
        if (!repo_full_name || Array.isArray(contents)) {
          alert('请先完成 1. 和 2. ')
          return;
        }
        // console.log(contents);
        onContent(contents.url, contents.sha);
      }}>3. 开始编辑</button>
    </p>
  )
}

