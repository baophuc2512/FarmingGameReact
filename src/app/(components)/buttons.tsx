import "@/global.css";
import { Pressable, Text } from 'react-native';

interface QuantityButtons
{
    classNameText: string;
    quantity: number;
    title: string;
}

const Buttons = ({classNameText, quantity, title} : QuantityButtons) => {
    let result = [];
    result.push(<Text className={classNameText} key={title}>
        {title}
    </Text>);
    for (let i = 0; i < quantity; i++)
    {
        result.push(
            <Pressable className="mt-4 rounded bg-border text-white p-4" key={i}>
                <Text className={classNameText}>Button {i}</Text>
            </Pressable>
        );
    }
    return result;
}

export default Buttons