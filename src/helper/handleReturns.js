// library
import Tone from "tone";

// files
import { printer } from "/helper/printer";
import { debug, context, alertMuteState } from "../index";
import { renderToConsole, renderBPM } from "/html/renderHTML";
import { renderInstruments } from "/html/renderInstruments";
import { renderParts } from "/html/renderParts";
import { playAlerts } from "/helper/playAlerts";

export const handleReturns = (_returns, _instruments, _parts) => {
    printer(debug, context, "returns in handleReturns: ", _returns);

    // store returns in separate variables
    let consoleArray = _returns.console.array;
    let parserReturn = _returns.parser;
    let consoleDivID = _returns.console.div;
    let consoleLength = _returns.console.length;
    let inputString = _returns.semantic.string;

    // check if console string is valid, then print to console:
    if (_returns.semantic.valid) {
        if (parserReturn.cmd == "noSuchInstrument") {
            consoleArray.push({
                message: `!! choose valid instrument, not "${parserReturn.string}"`,
            });
            playAlerts("error", alertMuteState);
        } else if (parserReturn.cmd == "partNameReserved") {
            consoleArray.push({
                message: `!! part name "${parserReturn.string}" reserved as instrument`,
            });
            playAlerts("error", alertMuteState);
        } else if (parserReturn.cmd == "instrumentNotPlaying") {
            consoleArray.push({
                message: `!! instrument "${parserReturn.string}" was not started`,
            });
            playAlerts("error", alertMuteState);
        } else {
            consoleArray.push({ message: `${inputString}` });
            playAlerts("return", alertMuteState);
        }
        // render to html console
        renderToConsole(consoleArray, consoleDivID, consoleLength);
    } else {
        // if not valid, prepend a '!' to string, store in console string array
        consoleArray.push({ message: `!! not valid "${inputString}"` });
        playAlerts("error", alertMuteState);
        // render to html console
        renderToConsole(consoleArray, consoleDivID, consoleLength);
    }

    // CLEAR - after processing, clear the input field
    document.getElementById("mainInput").value = "";

    // RENDER - with al little timeout, so that instruments can update
    setTimeout(() => {
        renderInstruments(_instruments);
        renderParts(_parts);
    }, 100);

    // renderBPM(Tone.Transport.bpm.value);

    // printer(debug, context, "executeActionContent printToConsole ", printToConsole);
    // printer(debug, context, "executeActionContent parserReturn ", parserReturn);
    // printer(debug, context, "executeActionContent toneReturn ", toneReturn);

    // handle returns from parser / tone
    // if (Object.keys(_actionContent.parser).length > 0) {

    // 	let toneReturn = _actionContent.parser.toneReturn;
    // 	if (toneReturn.error != ''){
    // 		// console:
    // 		let message = `${printToConsole.string} - ${toneReturn.error}`;
    // 		_consoleArray.push({ message: message });
    // 		renderToConsole(_consoleArray, printToConsole.id, printToConsole.consoleLength);
    // 		playAlerts('error', alertMuteState);
    // 	};
    // 	switch (toneReturn.html) {
    // 		case 'render instruments': renderInstruments(_instruments);
    // 		break;
    // 		case 'render parts': renderParts(_parts);
    // 		break;
    // 		case 'render bpm': renderBPM(Tone.Transport.bpm.value);
    // 		break;
    // 		case 'render muteOn': playAlerts('return', alertMuteState);
    // 		break;
    // 		case 'render muteOff': playAlerts('return', alertMuteState);
    // 		break;
    // 	}
    // };

    // return the changed console string array to index.js
    return consoleArray;
};
