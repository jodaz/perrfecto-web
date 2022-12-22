import * as React from "react"
import styled from "@emotion/styled"
import FeedCard from "../../../components/FeedCard"

// basic default styles for container
const Frame = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
`

const Stack = ({ onVote, data, onClick, ...props }) => {
    const [stack, setStack] = React.useState(data)
    // return new array with last item removed
    const pop = (array) => {
        return array.filter((_, index) => {
            return index < array.length - 1
        })
    }

    const handleVote = (item, vote) => {
        // update the stack
        let newStack = pop(stack)
        setStack(newStack)

        // run function from onVote prop, passing the current item and value of vote
        onVote(item, vote)
    }

    return (
        <>
            <Frame {...props}>
                {stack.map((item, index) => {
                    let isTop = index === stack.length - 1

                    return (
                        <FeedCard
                            drag={isTop}
                            key={item.key || index}
                            onVote={(result) => handleVote(item, result)}
                            onClick={() => onClick(item)}
                            item={item}
                        />
                    )
                })}
            </Frame>
        </>
    )
}

export default Stack
