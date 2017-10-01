import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  componentDidMount() {
    document.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
  
      for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
      }
    });
    document.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
  render () {
    return (
      <div className="root_container">
        
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);