import React from "react";
import Flashcard from "./Flashcard";

function Flashcardlist({flashcards}){
    return(
        <div className="flashcards">
        {flashcards.map(
            (flashcard) => {
                return <Flashcard card={flashcard} />;}
            )
            }
            
            </div>
    )
}

export default Flashcardlist;