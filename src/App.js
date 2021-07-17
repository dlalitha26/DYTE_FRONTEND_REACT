import React, { useState } from 'react'
import './App.css';
import Editor from './Components/Editor';

function App() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [fileType,setFileType]=useState(1)

  const srcDoc = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `
  let fileReader;
  let ft;
  
  const handleFileRead = (e) => {
    
    const content = fileReader.result;
    console.log(ft)
    if(ft==1){
      setHtml(content)
    }
    else if(ft==2){
      setCss(content)
    }
    else if(ft==3){
      setJs(content)
    }
    else{
      setHtml(content)
    }
   
  };
  
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  return (
    <>
     <input
      type='file'
      id='file'
      className='input-file'
      accept='.html,.css,.js'
      onChange={e => 
       { console.log(e.target.files[0].type)
        if(e.target.files[0].type=="text/html"){
          setFileType(1)
          ft=1
        }
        else if(e.target.files[0].type=="text/css"){
          setFileType(2)
          ft=2
        }
        else if(e.target.files[0].type=="text/javascript"){
          setFileType(3)
          ft=3
        }else{
          setFileType(1)
          ft=1
        }
       
        handleFileChosen(e.target.files[0])
      }
      }
    />
      <div className="pane top-pane">
        {fileType==1?
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
        :<>
         {fileType==2?
        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />:
        <Editor language="javascript" displayName="JS" value={js} onChange={setJs} />}
        </>}
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
