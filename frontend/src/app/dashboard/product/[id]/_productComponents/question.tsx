import { GetAnswers } from "@/src/lib/BackendConnection";
import { Answer, Question } from "@/src/lib/definitions";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";
import CreateAnswerComponent from "./createAnswer";

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
                            <ol 
                            key={answer.questionID} 
                            className="bg-slate-50 rounded-xl p-2"
                            >
                                <p>{`A: ${answer.content}`}</p>
                                <p>{`Author: ${answer.author}`}</p>
                            </ol>
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