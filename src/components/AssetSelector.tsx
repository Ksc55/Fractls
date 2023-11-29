import {useState} from "react";
import {Asset, SelectedAsset} from "@/interfaces";

interface AssetSelectorProps {
    placeholder?: string;
    value: SelectedAsset;
    onChange: (e: SelectedAsset) => void;
    assets: Asset[];
    label: string;
}
const AssetSelector: React.FC<AssetSelectorProps> = (props) => {
    const {label, placeholder, value, onChange, assets = []} = props;
    const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0] || null)
    const available = selectedAsset ? selectedAsset.available : 0
    const onChangeSelect = (e) => {
        onChange({name: e.target.value, value: value.value})
        setSelectedAsset(e.target.value)
    }
    const onChangeInput = (e) => {
        onChange({name: selectedAsset.name, value: e.target.value})
    }
    return <>
    <div>
        <div className="text-[#414141] font-['Roboto'] text-sm font-medium mb-2">{label}</div>
        <div className="inline-flex flex-shrink-0 justify-between items-center py-2 px-3 h-[3.25rem] rounded bg-[#f6f6f6] w-full">
            <div >
                <input
                    type={'number'}
                    placeholder={placeholder}
                    className="focus:outline-none bg-[transparent] appearance-none"
                    value={value.value}
                    onChange={(onChangeInput)}
                />
            </div>
            <div className={'w-2/6 flex justify-around'}>
                <div className="text-[#414141] font-['Roboto'] text-sm font-semibold self-center">Max</div>
                <select
                    className="text-[#414141] font-['Roboto'] text-[.8125rem] font-medium bg-[#d9d9d9] rounded py-2 px-4"
                    onChange={(onChangeSelect)}
                    value={value.name}
                >
                    {
                        assets.map((asset) => {
                            return <option value={asset.name}>{asset.name}</option>
                        })
                    }
                </select>
            </div>

        </div>
        { selectedAsset && <div className="text-[#414141] font-['Roboto'] text-xs font-light text-right">Available
            {selectedAsset.name}: {available}</div>}
    </div>
</>
};
export default AssetSelector;
