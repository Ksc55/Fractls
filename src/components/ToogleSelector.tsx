import {useState} from "react";

interface ToggleSelectorProps {
    button1: string;
    button2: string;
    onChange: (e: any) => void;
}
const ToggleSelector: React.FC<ToggleSelectorProps> = ({button1, button2, onChange}) => {
    const [selected, setSelected] = useState<number>(0);

    const onClick = (index) => {
        setSelected(index);
        onChange(index);
    }
    const defaultStyle = "text-[#414141] font-['Roboto'] flex items-center px-5 ";
    const selectedStyle = 'bg-[#beb9b9]  font-bold text-[#121212] rounded-full ]';

    return (<div className={' flex justify-center'}>
        <div className="flex justify-between items-center  p-1 rounded-full bg-white w-2/9 ">
            {   [button1, button2].map((text, index) => (
                <button
                    onClick={() => onClick(index)}
                    className={`${defaultStyle} ${selected === index ? selectedStyle : ''}`}>
                    {text}
                </button>
                ))
            }
        </div>
    </div>)
}
export default ToggleSelector;
