import { GetAnswers } from "@/src/lib/BackendConnection";
import { Answer, Question } from "@/src/lib/definitions";
import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";
import CreateAnswerComponent from "./createAnswer";
import AnswerComponent from "./answer";

export default function QuestionComponent({
    question
}: {
    readonly question: Question
}) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Answer[] | null>();

    function updateAnswers() {
        setIsLoaded(false);
        
        GetAnswers(question.questionID)
        .then((answers) => {
            setAnswers(answers);

            setIsLoaded(true);
        });
    }

    useEffect(() => {
        updateAnswers();
    }, [question]);

    return (
        <Skeleton isLoaded={isLoaded}>
            {answers ? 
            (
                <ul className="flex flex-col space-y-0.5 p-2">
                    {answers.map((answer: Answer) => {
                        return (
                            <AnswerComponent key={answer.answerID} answer={answer}/>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-xl p-2">No answers exist!</p>
            )}
            <CreateAnswerComponent
            questionID={question.questionID}
            updateAnswers={updateAnswers}
            />
        </Skeleton>
    );
}