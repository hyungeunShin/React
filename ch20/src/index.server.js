import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import path from 'path';
import fs from 'fs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer, { rootSaga } from './modules';
import PreloadContext from './lib/PreloadContext';
import createSagaMiddleware from 'redux-saga';
import { END } from 'redux-saga'; 
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

const statsFile = path.resolve('./build/loadable-stats.json');

//asset-manifest.json에서 파일 경로 조회
const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf-8')
);

function createPage(root, tags) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
                <meta name="theme-color" content="#000000" />
                <title>React App</title>
                ${tags.styles}
                ${tags.links}
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">${root}</div>
                ${tags.scripts}
            </body>
        </html>
    `;
  }

const app = express();

//서버 사이드 렌더링 처리할 핸들러 함수
const serverRender = async (req, res, next) => {
    //이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링

    const context = {};
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        applyMiddleware(thunk, sagaMiddleware)
    );

    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

    const preloadContext = {
        done: false,
        promises: []
    };

    const extractor = new ChunkExtractor({ statsFile });

    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <PreloadContext.Provider value={preloadContext}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </PreloadContext.Provider>
        </ChunkExtractorManager>
    );
    
    ReactDOMServer.renderToStaticMarkup(jsx);   //renderToStaticMarkup으로 한번 렌더링 하고
    store.dispatch(END);    //redux-saga의 END액션을 발생시키면 액션을 모니터링 하는 사가들이 모두 종료됨

    try {
        await sagaPromise;  //기존에 진행 중이던 사가들이 모두 끝날때 까지 기다리고
        await Promise.all(preloadContext.promises); //모든 프로미스 기다리고
    } catch(e) {
        return res.status(500);
    }

    preloadContext.done = true;

    const root = ReactDOMServer.renderToString(jsx);    //렌더링 하고
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');  //악성 스크립트 방지하기 위해 <를 치환
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;    // 리덕스 초기 상태를 스크립트로 주입

    //미리 불러야 하는 스타일/스크립트 추출
    const tags = {
        scripts: stateScript + extractor.getScriptTags(),
        links: extractor.getLinkTags(),
        styles: extractor.getStyleTags(),
    };

    res.send(createPage(root, tags)); //결과물 응답
};

const serve = express.static(path.resolve('./build'), {
    index: false    //경로에서 index.html보여주지 않도록 설정
});

//serverRender전에 호출
app.use(serve);
app.use(serverRender);

//5000포트로
app.listen(5000, () => {
    console.log("localhost:5000");
});