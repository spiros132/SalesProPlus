import { Answer } from "@/src/lib/definitions";
import { useEffect } from "react";


export default function AnswerComponent({
    answer
}: {
    readonly answer: Answer
}) {
    useEffect(() => {
        
    }, [answer]);

    return (
        <div>

        </div>
    );
}