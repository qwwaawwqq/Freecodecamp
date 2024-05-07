const { useState, useEffect } = React;

function MarkdownPreviewer() {
    const [text, setText] = useState(initialMarkdown);

    useEffect(() => {
        const previewElement = document.getElementById('preview');
        previewElement.innerHTML = marked(text, { breaks: true });
    }, [text]);

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <div>
            <textarea id="editor" onChange={handleChange} value={text}></textarea>
            <div id="preview"></div>
        </div>
    );
}

const initialMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbererd lists too.
2. Use just 1s if you want!
3. But the list goes on...
- Even if you use dashes or asterisks.

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'));
