import './app.scss'
import React from 'react'

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {time: 0};

        this.countUp = this.countUp.bind(this);
    }

    componentDidMount() {
        this.countUp();
    }

    countUp() {
        this.setState({
            time: this.state.time + 1
        });
        setTimeout(this.countUp, 1000);
    }

    render() {
        return (
            <div id="app">
                <section>
                    <h1>テスト</h1>
                    <ul>
                        <li>リスト1</li>
                        <li>リスト2</li>
                        <li>リスト3</li>
                    </ul>
                </section>
                <section>
                    <h1>時計</h1>
                    <p>
                        Time: { this.state.time }
                    </p>
                </section>
            </div>
        );
    }
}
