import React from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import BlobUrl from './page/BlobUrl'
import PDF from './page/PDF'
import Download from './page/Download'
import Compress from './page/Compress'
import ConcatFiles from './page/ConcatFiles'


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/blob-url">预览</Link>
              </li>
              <li>
                <Link to="/download">保存文件</Link>
              </li>
              <li>
                <Link to="/concat-file">合并文件</Link>
              </li>
              <li>
                <Link to="/pdf">文件加水印</Link>
              </li>
              <li>
                <Link to="/compress">压缩图片</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/blob-url">
              <BlobUrl />
            </Route>
            <Route path="/pdf">
              <PDF />
            </Route>
            <Route path="/download">
              <Download />
            </Route>
            <Route path="/compress">
              <Compress />
            </Route>
            <Route path="/concat-file">
              <ConcatFiles />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
