import Post from './models/post';

export default function createFakeData() {

    const posts = [...Array(40).keys()].map(i => ({
        title: `포스트 #${i}`,
        //https://www.lipsum.com/ 에서 복사한 200자 이상 텍스트
        body: 
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida facilisis lacus id elementum. Praesent sed pulvinar est. 
            Aliquam tempus scelerisque ligula nec viverra. Nam commodo lorem sed neque rutrum, vel placerat quam dapibus. Aliquam varius, 
            nisl nec blandit condimentum, nibh velit ornare nibh, eget varius dolor velit eu dolor. Sed blandit tempus cursus. Quisque efficitur hendrerit nulla, 
            at lacinia augue interdum a. Aliquam feugiat vestibulum orci, a aliquet augue condimentum at. Curabitur commodo porttitor quam, 
            id ullamcorper elit aliquam ut. Donec dapibus quam ac elit blandit, tincidunt porta nunc porttitor. Nam et interdum arcu.
            Nulla feugiat magna felis. Nullam nec tincidunt tortor, id vestibulum eros. In at pellentesque dolor. 
            Fusce non justo ipsum. Proin varius tortor ut venenatis porttitor. Praesent ipsum mi, pharetra eu pharetra vel, pretium nec nunc.
            Vivamus vel finibus nibh. Suspendisse a accumsan risus. Cras fringilla enim vel accumsan elementum. Cras in tristique magna,
             non eleifend ligula. Donec tempor feugiat purus quis euismod. Donec ultrices orci dolor, non gravida ex ornare non.`,
        tags: ['가짜', '데이터'],
    }));

    Post.insertMany(posts, (err, docs) => {
        console.log(docs);
    });
}