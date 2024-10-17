'use client';

import Error, { ErrorProps } from "next/error";
import { Answer, Category, CreateAnswerFeedback, CreateAnswerForm, CreateQuestionFeedback, CreateQuestionForm, Filters, LoginFeedback, Product_Long, Product_Short, Question } from "./definitions";

const backendURL = "http://localhost:8000";

export async function CheckBackend(): Promise<boolean> {
    const data: Response = await fetch(backendURL);
    
    // Check so that the request works
    if(data.status == 200) {
        return true;
    } else {
        const props: ErrorProps = { 
            statusCode: 1,
            title: "Can't connect to the backend",
            
        };
        throw new Error(props);
    }
}

export async function GetProduct(productID: number): Promise<Product_Long | null> {
    await CheckBackend();
    
    // Get data from the backend
    const data: Response = await fetch(backendURL + `/product/${productID}`);

    // Check that we got the correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Product Long interface
        const product: Product_Long = await data.json();
        return product;
    }
}

export async function SearchProducts(searchQuery: string, filters: Filters) {
    await CheckBackend();
    
    // Get data from the backend
    const data: Response = await fetch(backendURL + `/search?q=${searchQuery}&${filters.toString()}`);

    // Check that we got the correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Product Short interface
        const product: Product_Short[] = await data.json();
        return product;
    }
}

export async function GetCategories(parent: string | null) {
    await CheckBackend();

    // Get data from the backend
    const data: Response = await fetch(backendURL + "/categories" + (parent ? `?parent=${parent}` : ""));

    // Check that we got the correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Category interface
        const categories: Category[] = await data.json();
        return categories;
    }
}

export async function GetCategory(categoryID: string) {
    await CheckBackend();

    // Get data from the backend
    const data: Response = await fetch(backendURL + `/categories/${categoryID}`);

    // Check that we got the correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Category interface
        const category: Category = await data.json();
        return category;
    }
}

export async function Login(username: string, password: string) {
    await CheckBackend();

    const data: Response = await fetch(backendURL + `/login`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    });

    if(data.status == 401) {
        // Couldn't login, user not found
        return null;
    } else {
        const user: LoginFeedback = await data.json();
        
        return user;
    }
}

export async function CreateQuestion(question: CreateQuestionForm) {
    await CheckBackend();

    const data: Response = await fetch(backendURL + `/create_question`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(question)
    });

    if(data.status == 404) {
        
        return null;
    } else {
        const feedback: CreateQuestionFeedback = await data.json();

        return feedback;
    }
}

export async function CreateAnswer(answer: CreateAnswerForm) {
    await CheckBackend();

    const data: Response = await fetch(backendURL + `/create_answer`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(answer)
    });

    if(data.status == 404) {
        return null;
    } else {
        const feedback: CreateAnswerFeedback = await data.json();

        return feedback;
    }
}

export async function GetQuestions(productID: number) {
    await CheckBackend();

    // Get data from the backend
    const data: Response = await fetch(backendURL + `/questions/${productID}`);

    // Check that we got the correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Category interface
        const questions: Question[] = await data.json();

        return questions;
    }
}

export async function GetAnswers(questionID: number) {
    await CheckBackend();

    // Get data from the backend
    const data: Response = await fetch(backendURL + `/answers/${questionID}`);

    // Check that we got the correct response
    if(data.status == 404) {
        return null;
    } else {
        // Cast the json to the Category interface
        const questions: Answer[] = await data.json();

        return questions;
    }
}