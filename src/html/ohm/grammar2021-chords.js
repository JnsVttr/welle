// WELLE - grammar
// =============================================================

/*
https://github.com/harc/ohm
https://ohmlang.github.io/editor/
use the online tester 

save grammar as const var. will be used at semantics.js
grammar reads from top to bottom
adding a command needs cmd and destiation function
*/

const grammarText = `
livecode {
    Exp =   Commands | Assignments  

    /*
      TRANSPORT, SEQUENCE & CONTROLS
      ==============================
      hints:
      alnum+  == all is allowed
      phrases == word (can include numbers, integers)
      oder of grammar counts, checking is top to bottom
      Upper/lower case counts with definitions, e.g. phrases but PhraseList
      single phrases are detected least, because less meaningful
    */
	


    Commands =
        | "?" PhraseList?           --questionEvent
    	| ">" PhraseList        	--playMultiEvent
        | "." PhraseList        	--stopMultiEvent
        | ":" phrase           	    --savePartEvent
        | "/" PhraseList		    --deletEvent
        | "save" phrase         	--saveEvent
        | "join" phrase 			--joinEvent
        | "restart" phrase      	--restartEvent
        | "store" phrase 			--storeEvent
        | "load" phrase				--loadEvent
        | "upload" phrase 			--uploadEvent
        | "mute"             		--muteEvent
        | "unmute"             		--unmuteEvent
        | ">"               		--playAllEvent
        | "."               		--stopAllEvent
        | "/"               		--deleteAllEvent
        
        
                

    Assignments =
        | phrase ">" PhraseList                     --copyPattern
        | PhraseList floatPos? Pattern random?      --assignPattern
        | "bpm" intPos floatPos?                    --setBPM
        | PhraseList floatPos 		                --setVolume
        | PhraseList random?			            --plainStartEvent
        | ""                                        --emptyEvent
        
        
        
        
    PhraseList 	= NonemptyListOf<phrase, ""> 	    --PhraseList
    
    phrase 		= letter+ "_"? (letter+)? intPos?   --phrase

    random 	    = "%" " "? intPos 	                --random
    
    Pattern = NonemptyListOf<EventPattern, ""> 		--extractPattern

    EventPattern = 
    	| Notes
        | NotesChord
        | EventsRepeats 
    
    EventsRepeats = "(" NonemptyListOf<Event, ""> ")" intPos? 
    
    Event = 
    	| Notes
        | NotesChord
    
    NotesChord = "[" NonemptyListOf<Notes, ""> "]" 
   
    Notes =
        | "#" int?	                --soundNote
        | "-"                       --soundPause


        
    /*
      HELPERS - for calculation
      ==========================
    */
    
    floatPos = digit* "." digit+    --fullFloatPos
        | digit "."                 --dotPos
        | digit+                    --intPos
    
    float = "-"? digit* "." digit+  --fullFloat
        | "-"? digit "."            --dot
        | "-"? digit+               --int
    
    intPos = digit+                 --intPos
    
    int = "-"? digit+               --int
    

}

`;

export default grammarText;