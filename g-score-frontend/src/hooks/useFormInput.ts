// src/hooks/useRegistrationForm.ts
import { useState, useRef, useEffect } from "react";
import { ScoreData } from "../lib/interface";

export const useFormInput = (apiFetcher: (regNum: string) => Promise<ScoreData>) => {
    const [registrationNumber, setRegistrationNumber] = useState<string>("");
    const [scores, setScores] = useState<ScoreData | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null); // Clear previous error
        setScores(null); // Clear previous scores
        setIsLoading(true); // Set loading state

        try {
            const fetchedScores = await apiFetcher(registrationNumber);
            setScores(fetchedScores);
            setIsSubmitted(true);
        } catch (err: any) {
            console.error("Submission error:", err);
            setError(err.message || "Failed to fetch scores.");
            setScores(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input click to clear value after submission
    const handleInputClick = () => {
        if (isSubmitted) {
            setRegistrationNumber('');
            setScores(null); // Clear scores display
            setIsSubmitted(false); // Reset submitted state
            setError(null); // Clear any previous errors
        }
    };

    // Return the necessary values and functions
    return {
        registrationNumber,
        setRegistrationNumber,
        scores,
        inputRef,
        isLoading,
        error,
        handleSubmit,
        handleInputClick,
    };
};