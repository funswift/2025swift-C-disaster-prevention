import SingleChoiceQuestion from "@/components/SingleChoiceQuestion";
import { questions } from "data/questions";

export default function Page() {
    return(
        <>
        {questions.map((question, index) => (
            <SingleChoiceQuestion
                key={index}
                id={index}
                text={question.text}
                options={question.options}
            />
        ))}
        </>
    )
}

