import React, {useState} from "react";
import '../styles/components/checkbox.css'

const Checkbox = (props: any) => {
    return (
        <div className="custom-checkbox-wrapper"
            style={{background: props.checked ? 'blue' : 'gray'}}
        >
            <input type="checkbox"
                   onChange={props.onChange}
                   value={props.value}
            />
            <span className="checkmark" />
        </div>
    )
}

export default Checkbox
