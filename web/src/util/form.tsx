import React, {useState} from "react"
import Errors from "./errors";

export const setStateValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: any,
    setState: CallableFunction,
    errors: Errors
) => {
    const {value, name, type, checked} = e.currentTarget
    errors.remove(name)
    setState({
        ...state,
        [name]: type === 'checkbox' ? checked : value
    })
}

/**
 * Experimental (não funciona)
 */
export default class Form {
    public state: any
    setState: CallableFunction
    public errors: Errors

    constructor(state: any) {
        this.errors = new Errors([]);
        [this.state, this.setState] = useState(state);
    }

    public setValue(e: React.ChangeEvent<HTMLInputElement>) {
        const {value, name, type, checked} = e.currentTarget
        this.errors.remove(name)
        this.setState({
            ...this.state,
            [name]: type === 'checkbox' ? checked : value
        })
    }
}
