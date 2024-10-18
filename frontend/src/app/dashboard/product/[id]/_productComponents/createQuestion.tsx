import UpArrowIcon from "@/src/icons/uparrowicon";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import { useCookies } from 'next-client-cookies';
import { CreateQuestion } from "@/src/lib/BackendConnection";


export default function CreateQuestionComponent({
    productID,
    updateQuestions
}: {
    readonly productID: number,
    readonly updateQuestions: ()=>void
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

        if(productID == -1 || author == undefined)
            return;
        
        if(content == "") {
            setError("You can't ask an empty question");

            return;
        }

        // Create the question and send it to the server
        setIsDisabled(true);

        CreateQuestion({
            content: content,
            author: author, 
            productID: productID
        })
        .then((feedback) => {
            setIsDisabled(false);

            if(feedback == null) // Error, something happened
                setError("Something wrong happened!");
            else // Update the parent
                updateQuestions();
        });

    }

    return (
        <div className="flex flex-row space-x-4">
            <Textarea 
            minRows={1} maxRows={3} 
            label="Question" placeholder="Place your question here" 
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