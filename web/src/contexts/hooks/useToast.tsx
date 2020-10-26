import {useReducer} from "react"

export interface Toast {
    id?: string | number,
    title?: string
    message: string
    type?: string
}

interface ToastOptions {
    type: string
    toast: Toast
}

function reducer(toasts: Toast[], action: ToastOptions) : Toast[] {
    switch (action.type) {
        case 'add':
            return [...toasts, action.toast]
        case 'remove':
            if (!toasts.length) return []

            const index = toasts.findIndex(t => t.message === action.toast.message)

            toasts.splice(index, 1)

            return [...toasts]
        default:
            return toasts
    }
}

export default function useToast() {
    const [toasts, setToasts] = useReducer(reducer, [])

    function removeToast(toast: number | Toast) {
        if (typeof toast === "number") {
            toast = toasts[toast]
        }

        setToasts({type: 'remove', toast})
    }

    function toast(toast: Toast, duration: number = 3.5) {
        setToasts({type: 'add', toast})

        setTimeout(() => {
            removeToast(toast)
        }, duration * 1000)
    }

    return {toasts, toast, removeToast}
}
