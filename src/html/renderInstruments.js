
// render instruments to HTML
export function renderInstruments(_instruments) {
	let divID = 'instruments'

	// collect all initialized instruments
	// let instrumentNames = [];
	
	// // iterate through instruments collection
	// Object.keys(_instruments).forEach(inst => {
	// 	let newInstName = '';
	// 	// if instrument playing, name is just like it is
	// 	if (_instruments[inst].isPlaying) {
	// 		newInstName = _instruments[inst].name;
	// 	};
	// 	// if instrument not playing, add an "X"
	// 	if (_instruments[inst].isPlaying == false) {
	// 		newInstName = `x_${_instruments[inst].name}`;
	// 	};
	// 	// push the names to internal list
	// 	instrumentNames.push(newInstName);
	// });

    
	// var html=`<table><caption></caption><tr> <td>${divID}: </td>`;
    // var instCount = instrumentNames.length;
    // // output text:
    // for (let i=0; i<instCount; i++) {
	// 	html+= `<td >${instrumentNames[i]}</td>`;
    // };
    // html += '</tr></table>';
	
    // document.getElementById(divID).innerHTML = '';
    // document.getElementById(divID).innerHTML+= html;



	// start empty html
	let html="";
	
	// iterate through instruments collection
	Object.keys(_instruments).forEach(inst => {
		let newInstName = '';
		// if instrument playing, name is just like it is
		if (_instruments[inst].isPlaying) {
			newInstName = _instruments[inst].name;
		};
		// if instrument not playing, add an "X"
		if (_instruments[inst].isPlaying == false) {
			newInstName = `x_${_instruments[inst].name}`;
		};
		// round volume
		let roundedVol = Math.round(_instruments[inst].vol * 10) / 10;
		let string = _instruments[inst].string;
		let name = _instruments[inst].name;
		let isPlaying = _instruments[inst].isPlaying;

		html+= "<p>";
		if (isPlaying) {
			html+=`<input id="check_${name}" class="w3-check" type="checkbox" checked="true"><label> ${name} </label>`;
		} else {
			html+=`<input id="check_${name}" class="w3-check" type="checkbox"><label> ${name} </label>`;
		}
		
		html+= `
		vol: 
		<input id="vol_${name}" type="text" style="max-width: 3rem" autofocus size="10" autocomplete=off value="${roundedVol}">
		pattern: 
		<input id="pattern_${name}" type="text" autofocus size="50" autocomplete=off value="${string}">
		   
		</p>`;
		// console.log(`check play state instrument: isPLaying: ${isPlaying}. checked: ${checked}`)
	});
	
    
	
    document.getElementById(divID).innerHTML = '';
	document.getElementById(divID).innerHTML+= html;
	
	
}
;





