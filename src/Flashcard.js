import React, {useState} from "react";
import "./flashcard.css";

function Flashcard( {card} ) {
    const [flip,setFlip] = useState(true);
    return(
        <div className="card" onClick={()=>{setFlip(!flip)}}>
            {flip ? <div className="front">
            <div className="question"> {card.question} </div> 
            <div className="options"> {card.options.map((option) => {
                return <div className="options"> {option}</div>
            })} </div>
        </div> : <div className="answer"> {card.answer} </div> }
    </div>
    );

}
export default Flashcard;