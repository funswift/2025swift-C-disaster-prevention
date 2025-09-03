"use client"
import React, { useState } from "react";

/** ラジオボタン設定 */
interface Radio {
    label: string
    value: string
}

const RadioButton = () => {
    /** 選択中のラジオボタンvalue */
    const [selected, setSelected] = useState("chocolate");
    /** ラジオボタン切り替えイベント */
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.value);
    /** ラジオボタン */
    const radioButtons: Radio[] = [
        {
            label: "チョコレート",
            value: "chocolate"
        },
        {
            label: "ケーキ",
            value: "cake"
        },
        {
            label: "パイ",
            value: "pie"
        }
    ]

    return (
        <div className="container form-check" >
            <div className="row">
            {radioButtons.map(radio => {
                return (
                    <div className="col-4" key={radio.value}>
                        {/* checked属性に式を定義する */}
                        <input className="form-check-input" type="radio" name="sweets" 
                            value={radio.value} checked={radio.value === selected} onChange={changeValue}/>
                        <label className="form-check-label">
                            <span className="fs-6">{radio.label}</span>
                        </label>
                    </div>
                )
            })}
            </div>
            <div>{selected}が選択されました！</div>
        </div>
    )
}
export default RadioButton;
