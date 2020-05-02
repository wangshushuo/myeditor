'use strict';
const {useState, useEffect} = React;
function Child(props) {
  const [text, sett] = useState(111);
  useEffect(() => {
    sett(999)
  }, [])
  return (
    <span>666{text}</span>
  )
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like<Child />
      </button>
    );
  }
}

let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);