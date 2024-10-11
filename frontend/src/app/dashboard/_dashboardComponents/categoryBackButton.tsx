'use client';

import { ChevronLeft } from "lucide-react";

export default function BackButton({
    handleGoBack
}: {
    readonly handleGoBack: ()=>void
}) {
    return (
        <button
            className="relative top-0 left-0 flex items-center text-blue-500 hover:text-blue-700"
            onClick={handleGoBack}
            >
            <ChevronLeft className="w-5 h-5 " />
            Back
        </button>
    );
}