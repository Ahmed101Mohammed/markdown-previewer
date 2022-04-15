import React from 'react';
import {render} from 'react-dom';
import {createRoot} from 'react-dom/client';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import md from 'showdown';
import './style.css';

const root = createRoot(document.getElementById('root'));

// redux:
let s = {content : "",render:false};
const UPDATE = 'UPDATE';

let update = (text)=>{
  return {
    type:UPDATE,
    content:text
  }
}

const reduceS = (state = s,action)=>{
  switch (action.type)
  {
    case UPDATE:
      state = {content: action.content,
                render: true
              };
      return state;
      break;
    default:
      return state;
  }
}

let store = createStore(reduceS);

// react:
const App = (props,getElementById) =>
{
  
  var stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

  const con = new md.Converter();
  let a = '';
  const up = (e)=>{
    props.update(e.target.value);
    
  }
  let b = document.getElementById('c');

  if (props.render == true)
  {
    a = con.makeHtml(props.content);

    
    
    b.innerHTML = a;
  }
  
  
  return(
    <div className='container'>
      <div className='editor'>
        <label htmlFor='editor'>MarkDown Editor</label>
        <textarea id="editor" placeholder='Write your MarkDown Here' value={props.content} onChange={up}>
        </textarea>
      </div>
      
      <div className='view'>
        <h2 className='title'>MarkDown view</h2>
        <div id="c">
        
        </div>
      </div>
    </div>
  )
}

// react-redux:
let stp = (state)=>{return {content: state.content,
                            render: state.render}};
let atp = (dispatch)=>{
  return {
    update: (t)=>{dispatch(update(t))}
  }
}

const NewA = connect(stp,atp)(App);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NewA/>
    </Provider>
  </React.StrictMode>  
);
