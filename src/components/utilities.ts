
const is_string = (str: string) => (typeof str === "string")

const is_empty_string = (str: string) =>  (is_string(str) && str.length === 0)

const is_function = (func: Function) => func instanceof Function

const create = (tagName: string, className?: string) => {
    let element = {} as HTMLElement
    if (tagName && !is_empty_string(tagName)) {
        element = document.createElement(tagName)
        if (element instanceof HTMLElement && className && className.length > 0) {
            className
                .split(' ')
                .filter((name) => !is_empty_string(name))
                .forEach((part) => element.classList.add(part))
        }
    }
    return element
}

export {
    create,
    is_empty_string,
    is_function,
    is_string
}