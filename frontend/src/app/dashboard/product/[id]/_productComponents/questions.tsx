import { GetQuestions } from "@/src/lib/BackendConnection";
import { Question } from "@/src/lib/definitions";
import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";
import QuestionComponent from "./question";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import CreateQuestionComponent from "./createQuestion";

export default function Questions({
    productID
}: {
    readonly productID: number | undefined
}) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[] | null>(null);

    function updateQuestions() {
        setIsLoaded(false);
        
        if(productID == undefined)
            return;
        
        GetQuestions(productID)
        .then((questions) => {
            setQuestions(questions);

            setIsLoaded(true);
        });
    }

    useEffect(() => {
        updateQuestions();
    }, [productID]);

    return (
        <Skeleton isLoaded={isLoaded}>
            <div className="flex flex-col space-y-2">
                {questions ? 
                (
                    <Accordion variant="splitted" className="p-2">
                        {questions.map((question: Question) => {
                            return (
                                <AccordionItem 
                                key={question.questionID} 
                                title={`Q: ${question.content}`} 
                                subtitle={`Author: ${question.author}`} 
                                className="bg-slate-200 rounded-xl px-2"
                                >
                                    <QuestionComponent question={question}></QuestionComponent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                ) : (
                    <p className="text-xl p-2">No questions exist!</p>
                )}
                <CreateQuestionComponent 
                productID={productID ?? -1}
                updateQuestions={updateQuestions}
                />
            </div>
        </Skeleton>
    );
}