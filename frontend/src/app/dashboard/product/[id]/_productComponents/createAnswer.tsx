import UpArrowIcon from "@/src/icons/uparrowicon";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import { useCookies } from 'next-client-cookies';
import { CreateAnswer, CreateQuestion } from "@/src/lib/BackendConnection";


export default function CreateAnswerComponent({
    questionID,
    updateAnswers
}: {
    readonly questionID: number,
    readonly updateAnswers: ()=>void
}) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<string>("");

    const cookies = useCookies();


    function handleChangeContent(newContent: string) {
        setError("");
        setContent(newContent);
    }

    function handleCreateQuestion() {
        const author = cookies.get("username");

        if(questionID == -1 || author == undefined)
            return;
        
        if(content == "") {
            setError("You can't ask an empty question");

            return;
        }

        // Create the question and send it to the server
        setIsDisabled(true);

        CreateAnswer({
            content: content,
            author: author, 
            questionID: questionID
        })
        .then((feedback) => {
            setIsDisabled(false);
            
            if(feedback == null) // Error, something happened
                setError("Something wrong happened!");
            else // Update the parent
                updateAnswers();
        });

    }

    return (
        <div className="flex flex-row space-x-4">
            <Textarea 
            minRows={1} maxRows={3} 
            label="Answer" placeholder="Place your answer here" 
            isDisabled={isDisabled}
            classNames={{
                label: "text-lg",
                input: "text-md",
                errorMessage: "text-md",
            }}
            onValueChange={handleChangeContent}
            errorMessage={error}
            isInvalid={error != ""}
            />
            <Button isIconOnly onClick={handleCreateQuestion} isDisabled={isDisabled}>
                <UpArrowIcon size={24}/>
            </Button>
        </div>
    );
}