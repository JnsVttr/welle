import Tone from "tone";

/*
tutorial
*/
// INSTRUMENT CLASS
// ===================================================================

//

class Instrument {
    // first list all attributes, e.g. baseNote
    // avoid "null"
    // synth = null;
    // e.g. pass arguments: thisInst.volume
    // constructor(name, type, variables)
    // multiple constructors are possibles
    constructor() {
        this.synth = null;
        this.synthType = null;
        this.gain = new Tone.Gain(0.3);
        // this.gain.toMaster();
        // this.tick = 0;
        this.baseNote = 130;
        this.sampleURL;
        this.transpose = 2;
    }
    // static checkInstrument() --> Instrument.checkInstrument(putToDatabase)
    // static initDatabase() Instrument.initDatabase()
    // static updateList()

    static instrumentList = {};

    static createList(list) {
        Instrument.instrumentList = list;
        console.log("class Instrument list: ", list);
    }

    // from OUTSIDE
    updateType(synthType) {
        this._updateSynthType(synthType);
    }
    connect(output) {
        this.gain.connect(output);
    }
    updateSampleURL(url) {
        this.sampleURL = url;
        // console.log('--> instrument constructor sampleURL: ' + this.sampleURL);
    }
    setVolume(vol) {
        vol = (vol / 100) * 50;
        this.gain.gain.value = vol;
    }
    setBaseNote(note) {
        this.baseNote = note;
    }
    getBaseNote() {
        return this.baseNote;
    }
    setTranspose(transpose) {
        this.transpose = transpose;
    }
    getTranspose() {
        return this.transpose;
    }
    dispose(synthType) {
        if (this.synth) {
            this.synth.disconnect(this.gain);
            this.synth.dispose();
        }
    }
    sync(bool) {
        if (bool) {
            this.synth.sync();
        } else {
            this.synth.unsync();
        }
    }
    resonance(val) {
        this.synth.resonance(val);
    }

    trigAtkRel(note, seq, time) {
        this.synth.triggerAttackRelease(note, seq, time);
        // console.log(`--> triggerAttackRelease(){}: with this params: ${note}, ${seq}, ${time}`);
    }

    // from INSIDE
    _updateSynthType(synthType) {
        this.synthType = synthType;
        if (this.synth) {
            this.synth.disconnect(this.gain);
            this.synth.dispose();
        }

        let settings = this.defaultSettings[synthType] || {};

        if (synthType == "Sampler") {
            // console.log('--> this are the default settings type: ' + synthType +  ' + settings.C3: ' + settings.C3);
            settings.C3 = this.sampleURL;
            // here: callback func for sampler
            // console.log('--> this are the new settings "C3": ' + settings.C3);
        }

        this.synth = new Tone[this.synthType](settings);
        this.synth.connect(this.gain);
        // this.synth.sync();
    }

    get defaultSettings() {
        return {
            MonoSynth: {
                frequency: "C4",
                detune: 0,
                oscillator: {
                    type: "square",
                },
                filter: {
                    Q: 6,
                    type: "lowpass",
                    rolloff: -24,
                },
                envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.9,
                    release: 1,
                },
                filterEnvelope: {
                    attack: 0.06,
                    decay: 0.2,
                    sustain: 0.5,
                    release: 1,
                    baseFrequency: 200,
                    octaves: 7,
                    exponent: 2,
                },
            },

            DuoSynth: {
                vibratoAmount: 0.5,
                vibratoRate: 5,
                harmonicity: 1.5,
                voice0: {
                    volume: -10,
                    portamento: 0,
                    oscillator: {
                        type: "sine",
                    },
                    filterEnvelope: {
                        attack: 0.01,
                        decay: 0,
                        sustain: 1,
                        release: 0.5,
                    },
                    envelope: {
                        attack: 0.01,
                        decay: 0,
                        sustain: 1,
                        release: 0.5,
                    },
                },
                voice1: {
                    volume: -10,
                    portamento: 0,
                    oscillator: {
                        type: "sine",
                    },
                    filterEnvelope: {
                        attack: 0.01,
                        decay: 0,
                        sustain: 1,
                        release: 0.5,
                    },
                    envelope: {
                        attack: 0.01,
                        decay: 0,
                        sustain: 1,
                        release: 0.5,
                    },
                },
            },

            Sampler: {
                C3: "../",
            },

            NoiseSynth: {
                noise: {
                    type: "white",
                },
                envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0,
                },
            },

            Synth: {
                oscillator: { type: "triangle" },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1,
                },
            },

            MembraneSynth: {
                pitchDecay: 0.05,
                octaves: 10,
                oscillator: {
                    type: "sine",
                },
                envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    sustain: 0.01,
                    release: 1.4,
                    attackCurve: "exponential",
                },
            },

            MetalSynth: {
                frequency: 200,
                envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    release: 0.2,
                },
                harmonicity: 5.1,
                modulationIndex: 12,
                resonance: 4000,
                octaves: 1.5,
            },

            PluckSynth: {
                attackNoise: 1,
                dampening: 4000,
                resonance: 0.6,
            },

            FMSynth: {
                harmonicity: 2,
                modulationIndex: 10,
                detune: 0.2,
                oscillator: {
                    type: "square64",
                },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.1,
                    release: 0.1,
                },
                modulation: {
                    type: "square64",
                },
                modulationEnvelope: {
                    attack: 0.1,
                    decay: 0.5,
                    sustain: 0.1,
                    release: 0.2,
                },
            },

            AMSynth: {
                harmonicity: 3,
                detune: 1,
                oscillator: {
                    type: "square32",
                },
                envelope: {
                    attack: 0.1,
                    decay: 0.1,
                    sustain: 0.1,
                    release: 0.3,
                },
                modulation: {
                    type: "square",
                },
                modulationEnvelope: {
                    attack: 0.1,
                    decay: 0.01,
                    sustain: 0.1,
                    release: 0.2,
                },
            },
        };
    }
}

export { Instrument };

export function update_InstrumentsList() {
    let _instrumentsList = {};

    printer(debug, context, "update_InstrumentsList", `attempting to update sample paths...`);
    if (sampleURL != undefined) {
        _instrumentsList = {
            drums: {
                name: "drums",
                type: "MembraneSynth",
                baseNote: 30,
                gain: 1,
                vol: 0.7,
                transpose: 24,
            },
            metal: {
                name: "metal",
                type: "MetalSynth",
                baseNote: 30,
                gain: 0.4,
                vol: 0.7,
                transpose: 24,
            },
            bass: {
                name: "bass",
                type: "DuoSynth",
                baseNote: 70,
                gain: 1,
                vol: 0.7,
                transpose: 36,
            },
            string: {
                name: "string",
                type: "AMSynth",
                baseNote: 180,
                gain: 1,
                vol: 0.7,
                transpose: 48,
            },
            acid: {
                name: "acid",
                type: "MonoSynth",
                baseNote: 30,
                gain: 0.23,
                vol: 0.7,
                transpose: 36,
            },
            pad: { name: "pad", type: "Synth", baseNote: 130, gain: 1, vol: 0.7, transpose: 48 },

            s_ambient: {
                name: "s_ambient",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[0],
            },
            s_bass: {
                name: "s_bass",
                type: "Sampler",
                baseNote: 100,
                transpose: 48,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[1],
            },
            s_fx: {
                name: "s_fx",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[2],
            },

            s_hh: {
                name: "s_hh",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[3],
            },
            s_hit: {
                name: "s_hit",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[4],
            },
            s_kick: {
                name: "s_kick",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[5],
            },
            s_loop: {
                name: "s_loop",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[6],
            },
            s_mix: {
                name: "s_mix",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[7],
            },
            s_noise: {
                name: "s_noise",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[8],
            },
            s_perc: {
                name: "s_perc",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[9],
            },

            s_snare: {
                name: "s_snare",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[10],
            },
            s_voc: {
                name: "s_voc",
                type: "Sampler",
                baseNote: 100,
                transpose: 36,
                gain: 1.4,
                vol: 0.7,
                url: sampleURL.default[11],
            },
        };

        printer(
            debug,
            context,
            "update_InstrumentsList",
            `updated sample paths based on sampleURL`
        );
        printer(debug, context, "update_InstrumentsList: ", _instrumentsList);

        return _instrumentsList;
    }
}
