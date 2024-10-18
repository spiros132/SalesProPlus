import { Answer } from "@/src/lib/definitions";

export default function AnswerComponent({
    answer
}: {
    readonly answer: Answer
}) {
    return (
        <ol 
        className="bg-slate-50 rounded-xl p-2"
        >
            <p>{`A: ${answer.content}`}</p>
            <p>{`Author: ${answer.author}`}</p>
        </ol>
    );
}