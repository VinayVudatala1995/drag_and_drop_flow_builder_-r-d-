



export const getContent = (content,variables) => {
    variables.map(e => {
        let result = content.replace(`#${e.id}`,`#${e.variable}`);
        content = result;
    });

return content;

// const variablesnames = variables.map(e => e.variable);
// variablesnames.map((e) => {
//     console.log(' element',e);
//     const varia = '#' + e + '#';

//     //const ne =     reactStringReplace(content,/(#name#)/, (match,i) =>  <span key={i} style={{ color: 'blue' }}>vinay</span>)
// const ne = str.replace(varia,'vinay');
// console.log(' modified content array',str);
// });




}