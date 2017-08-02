import React from "react";
// import styles from 'highlight.js/styles/github-gist.css';
import styles from 'highlight.js/styles/xcode.css';
import hljs from 'highlight.js';


class CodeBlock extends React.Component {
    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        hljs.highlightBlock(this.refs.code);
    }

    render() {
        console.log(styles)
        return (
            <pre><code ref="code">
                {this.props.literal}
            </code></pre>
        );
    }
}


module.exports = CodeBlock;