import {ReactElement} from "react";

interface HeadLineProps {
    text: string | ReactElement;
}
export const HeadLine = ({ text }: HeadLineProps) => {
    return (
        <span style={{color: 'white', backgroundColor: 'green'}}>{text}</span>
    );
};