type TDataByName = {
    name: string,
    color: string,
    values: {
        year: Date
        pos: number
    }[]
}

type TDimension = {
    width: number
    height: number
}

type TMargin = {
    top: number
    right: number
    bottom: number
    left: number
}

type TNameData = {
    name: string
    pos: number
    color?: string
}
type TNamesPerYear = {
    year: string
    girls: TNameData[]
    boys: TNameData[]
}

type TPositionRange = {
    first: number
    last: number
}

type TTimePeriod = {
    start: Date
    end: Date
}

type TTimeStrings = {
    last?: string
    now: string
    next?: string
}

export {
    type TDataByName,
    type TDimension,
    type TMargin,
    type TNamesPerYear,
    type TNameData,
    type TPositionRange,
    type TTimePeriod,
    type TTimeStrings
}
