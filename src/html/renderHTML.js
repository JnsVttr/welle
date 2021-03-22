import { printer } from '/helper/printer';
import { debug, context } from '/index';



// set output of console

export const renderHtml = (content, chooseDiv, limit) => {
    //console.log(content, content.length, div);
    if (limit==null){limit=1000;};

    let div = document.getElementById(chooseDiv);
    let html='';
    
    // to limit textoutput in webpage:
    let histLength = content.length;
    let iX = 0;
    
    if (histLength>limit) {iX = histLength-limit; };
    // output text:
    for (let i=iX; i<histLength; i++) {
        if (content[i].user) {
            html+='<p id="consoleLine"><b>' + content[i].user + ': &nbsp;&nbsp;</b>' + content[i].message + '</p>';
        } else {
            html+='<p id="consoleLine">' + content[i].message + '</p>';
        };
    };

    document.getElementById(chooseDiv).innerHTML = '';
    document.getElementById(chooseDiv).innerHTML+= html;
};


export const renderToConsole = (content, divID, lengthLimit) => {
    // render text to console div
    let div = document.getElementById(divID);
    let html='';
    // get length of entire content and limit content if more 
    let entireContentLength = content.length;
    let contentPointer = 0;
    // set pointer to most recent entries
    if (entireContentLength > lengthLimit) contentPointer = entireContentLength - lengthLimit; 

    // create output text and html:
    for (let i=contentPointer; i < entireContentLength; i++) {
        if (content[i].user) {
            html+='<p id="consoleLine"><b>' + content[i].user + ': &nbsp;&nbsp;</b>' + content[i].message + '</p>';
        } else {
            html+='<p id="consoleLine">' + content[i].message + '</p>';
        };
    };
    // append text to div
    document.getElementById(divID).innerHTML = '';
    document.getElementById(divID).innerHTML+= html;
};













export const renderHtmlHelp = (content, chooseDiv, limit, links) => {
    
    let linkState = links; // if true, render including links
    
    // output text:
    let div = document.getElementById(chooseDiv);
    let html='';
    
    html += '<table>';

    for (let i=0; i<content.length; i++) {
        if (i==0) {
            html += '<caption>' + content[i][0] + '</caption>';    
        } else {
            if (linkState) {
                html += '<tr><td><a href="#" id="example_' + i + '" onclick="linkPrint( \' ' + content[i][0] +  ' \')">' + content[i][0] + '</a></td><td>' + content[i][1] + '</td></tr>';
            } else {
                html += '<tr><td width="35%">' + content[i][0] + '</td><td>' + content[i][1] + '</td></tr>';    
            };
        };    
    };    
    html += '</table>'
    html += '</br></br></br></br></br></br>'
    
    
    document.getElementById(chooseDiv).innerHTML = '';
    document.getElementById(chooseDiv).innerHTML+= html;
};











export const renderHtmlHelpMenu = (content, chooseDiv, limit, links) => {
    let linkState = links; // if true, render including links
    // output text:
    let div = document.getElementById(chooseDiv);
    let html='';
    html += '<table><tr>';
    for (let i=0; i<content[0].length; i++) {
        // console.log('content help menu: ' + content[0][i]);
        if (i==0) {
            html += '<th>' + content[0][i] + '</th>';    
        } else {
            html += '<td><a href="#" id="example_' + i + '" onclick="linkPrint( \' ' + content[0][i] +  ' \')">' + content[0][i] + '</a></td>';
        };    
    };    
    html += '</tr></table>'
    document.getElementById(chooseDiv).innerHTML = '';
    document.getElementById(chooseDiv).innerHTML+= html;
};





















// navigate console with arrows

export const renderHtmlArrows = (pointer, consoleArray, dir, divName) => {

	let length = consoleArray.length;

    // printer(debug, context, "renderHtmlArrows", `
    // pointer: ${pointer}
    // consoleArray: ${consoleArray}
    // length: ${length}
    // dir: ${dir}
    // `);

	if (dir=='up') {
        if (consoleArray.length > 0) {
            if (pointer<length) {pointer = pointer+1};
            document.getElementById("textarea").value = '';
            document.getElementById("textarea").value = consoleArray[(length-pointer)].message;
        }
            	
	} else {
		if (pointer>0) {
            pointer = pointer-1;
            document.getElementById("textarea").value = '';
            if (pointer!=0) {
            	document.getElementById("textarea").value = consoleArray[(length-pointer)].message;
            } else {
            	document.getElementById("textarea").value = '';
            }
        };
	};
	return pointer;
};
















// // render 'parts' as one line under the input 

export const renderOutputLine = (stringArray, customDiv, limitIn) => {
    var div = document.getElementById(customDiv);
    var html='<table><caption></caption><tr>' + '<td style="width:10%">' + customDiv + '</td>';
    var textLength = stringArray.length;
    // output text:
    for (let i=0; i<textLength; i++) {
        html+= '<td style="max-width:10%">' + stringArray[i] + '</td>';
    };
    html += '</tr></table>';
    document.getElementById(customDiv).innerHTML = '';
    document.getElementById(customDiv).innerHTML+= html;
};
























