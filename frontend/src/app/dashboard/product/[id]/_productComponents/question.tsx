import { Question } from "@/src/lib/definitions";

export default function QuestionComponent({
    question
}: {
    readonly question: Question
}) {
    return (<p>{question.Content}</p>);
}