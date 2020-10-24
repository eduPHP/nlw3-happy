import React, {useContext, useState} from "react";
import {ucFirst} from "./str";

interface Error {
    field: string
    message: string
}

export default class Errors {
    errors: Error[]
    setErrors: CallableFunction

    constructor(errors: Error[]) {
        [this.errors, this.setErrors] = useState(errors);
    }

    has(field: string) {
        return this.errors.find(error => error.field === field)
    }

    first(field: string): string {
        return ucFirst(this.errors.find(error => error.field === field)?.message as string)
    }

    any() {
        return !!this.errors.length
    }

    add(error: Error) {
        this.errors.push(error)
        this.setErrors(this.errors)
    }

    remove(field: string) {
        const exists = this.errors.find(error => error.field === field)

        if (!exists) return this

        this.errors.splice(this.errors.indexOf(exists), 1)

        this.setErrors(this.errors)
    }

    record(errors: any) {
        let mapErrors: Array<Error> = []

        Object.keys(errors).forEach(field => {
            mapErrors.push({
                field,
                message: errors[field][0]
            })
        })

        this.errors = mapErrors

        this.setErrors(this.errors)
    }

    print(field: string) {
        if (this.has(field)) {
            return (<span>{this.first(field)}</span>)
        }
    }
}
