import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/components/App';

// componentDidMount () {
//   document.addEventListener('drop', function (e) {
//     e.preventDefault();
//     e.stopPropagation();

//     for (let f of e.dataTransfer.files) {
//       console.log('File(s) you dragged here: ', f.path);
//     }
//   });
//   document.addEventListener('dragover', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//   });
// }

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
