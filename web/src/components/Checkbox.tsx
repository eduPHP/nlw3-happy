import React, {ChangeEvent} from "react";
import '../styles/components/checkbox.css'

interface CheckboxProps {
    name: string
    value?: string | number
    checked: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = (props: CheckboxProps) => {
    return (
        <div className="custom-checkbox-wrapper"
            style={{background: props.checked ? 'blue' : 'gray'}}
        >
            <input type="checkbox"
                   name={props.name}
                   checked={props.checked}
                   onChange={props.onChange}
            />
            <span className="checkmark" />
        </div>
    )
}

export default Checkbox
