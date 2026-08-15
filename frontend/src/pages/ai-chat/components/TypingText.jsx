import { useEffect, useState } from "react";

const TypingText = ({ text, speed = 12 }) => {

    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {

        setDisplayText("");

        let current = "";

        let index = 0;

        const interval = setInterval(() => {

            if (index < text.length) {
                current += text[index];
            }
            setDisplayText(current);

            index++;

            if (index >= text.length) {

                clearInterval(interval);

            }

        }, speed);

        if (text.length === 0) {
            return;
        }

        return () => clearInterval(interval);

    }, [text, speed]);

    return displayText;
};

export default TypingText;