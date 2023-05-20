import { Component } from "react";

class LifeCycleSample extends Component {
    state = {
        number: 0,
        color: null,
    }

    myRef = null;

    constructor(props) {
        super(props);
        console.log("생성자");
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("props값을 state에 동기화");
        if(nextProps.color !== prevState.color) {
            return {color: nextProps.color};
        }
        return null;
    }

    componentDidMount() {
        console.log("이것은 컴포넌트를 만들고 첫 렌더링을 마친 후 실행");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("props 또는 state 변경 후 리렌더링 여부", nextProps, nextState);

        return nextState.number % 10 !== 4;
    }

    componentWillUnmount() {
        console.log("컴포넌트를 DOM에서 제거할 때 실행");
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("렌더에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출");

        if(prevProps.color !== this.props.color) {
            return this.myRef.style.color;
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("리렌더링을 완료한 후 실행", prevProps, prevState);

        if(snapshot) {
            console.log("업데이트 되기 직전 색상 : ", snapshot);
        }
    }

    render() {
        console.log("렌더링");

        const style = {
            color: this.props.color
        };

        return (
            <div>  
                {this.props.missing.value}
                <h1 style={style} ref={ref => (this.myRef=ref)}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>더하기</button>
            </div>
        )
    }
}

export default LifeCycleSample;