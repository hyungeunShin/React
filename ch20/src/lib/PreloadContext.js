import {createContext, useContext} from 'react';

//클라이언트 환경: null
//서버환경: {done: false, promises: []}
const PreloadContext = createContext(null);
export default PreloadContext;

//
export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);

    //context값이 유효하지 않으면 아무것도 안함
    if(!preloadContext) {
        return null;
    }

    //이미 작업이 끝났다면
    if(preloadContext.done) {
        return null;
    }

    preloadContext.promises.push(Promise.resolve(resolve()));
    return null;
};

//Hook 형태로 사용
export const usePreloader = resolve => {
    const preloadContext = useContext(PreloadContext);

    if(!preloadContext) {
        return null;
    }

    //이미 작업이 끝났다면
    if(preloadContext.done) {
        return null;
    }

    preloadContext.promises.push(Promise.resolve(resolve()));
}