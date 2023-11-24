// components/FractionatedNTFFields.tsx
import React, { useState, useEffect } from 'react';
import StyledInput from "@/components/InputField";
import NextImage from "next/image";

interface FractionatedNTFFieldsProps {
    image: string; // URL de la imagen
}

const FractionatedNTFFields: React.FC<FractionatedNTFFieldsProps> = ({ image }) => {
    const [shards, setShards] = useState<string[]>([]);
    const [values, setValues] = useState<string[]>(Array.from({ length: 9 }, () => ''));

    const handleInputChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
    };

    // Función para fraccionar la imagen en 9 partes
    const fractionateImage = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
            console.error('Canvas 2D context not supported');
            return;
        }

        // Cargar la imagen en el canvas
        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            // Calcular dimensiones de las partes
            const shardWidth = img.width / 3;
            const shardHeight = img.height / 3;

            const newShards: string[] = [];

            // Fraccionar la imagen en 9 partes
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const shardCanvas = document.createElement('canvas');
                    const shardContext = shardCanvas.getContext('2d');

                    if (!shardContext) {
                        console.error('Canvas 2D context not supported');
                        return;
                    }

                    shardCanvas.width = shardWidth;
                    shardCanvas.height = shardHeight;

                    shardContext.drawImage(
                        canvas,
                        col * shardWidth,
                        row * shardHeight,
                        shardWidth,
                        shardHeight,
                        0,
                        0,
                        shardWidth,
                        shardHeight
                    );

                    // Convertir la parte a base64 y agregarla al array
                    newShards.push(shardCanvas.toDataURL('image/png'));
                }
            }

            setShards(newShards);
        };
    };

    useEffect(() => {
        fractionateImage();
    }, [image]);

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {shards.map((shard, index) => (
                    <div key={index} className="flex flex-col justify-center w-22 justify-self-center gap-4">
                        <NextImage src={shard} alt={`Shard ${index + 1}`} className="max-w-xs  rounded-md " width={300} height={300} layout="responsive"/>
                        <StyledInput
                            type={'number'}
                            placeholder="0.0"
                            value={values[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            suffix="ETH"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FractionatedNTFFields;
