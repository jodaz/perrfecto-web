import * as React from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import Card from "./Card";

const StyledCard = styled(motion.div)`
  position: absolute;
`;

const FeedCard = ({ style, onVote, id, item, ...props }) => {
    const flyAwayMin = 300;
    const cardElem = React.useRef(null);
    const [constrained, setConstrained] = React.useState(true);
    const [direction, setDirection] = React.useState();
    const [velocity, setVelocity] = React.useState();
    const x = useMotionValue(0);
    const controls = useAnimation();

    const getVote = (childNode, parentNode) => {
        const childRect = childNode.getBoundingClientRect();
        const parentRect = parentNode.getBoundingClientRect();
        let result =
        parentRect.left >= childRect.right
            ? false
            : parentRect.right <= childRect.left
            ? true
            : undefined;
        return result;
    };

    // determine direction of swipe based on velocity
    const getDirection = () => {
        return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
    };

    const getTrajectory = () => {
        setVelocity(x.getVelocity());
        setDirection(getDirection());
    };

    const flyAway = () => {
        const flyAwayDistance = (direction) => {
            const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
                .width;
            const childWidth = cardElem.current.getBoundingClientRect().width;
            return direction === "left"
                ? -parentWidth / 2 - childWidth / 2
                : parentWidth / 2 + childWidth / 2;
        };

        if (direction && Math.abs(velocity) > flyAwayMin) {
            setConstrained(false);
            controls.start({
                x: flyAwayDistance(direction)
            });
        }
    };

    React.useEffect(() => {
        const unsubscribeX = x.onChange(() => {
            if (cardElem.current) {
                const childNode = cardElem.current;
                const parentNode = cardElem.current.parentNode;
                const result = getVote(childNode, parentNode);
                result !== undefined && onVote(result);
            }
        });

        return () => unsubscribeX();
    });

    const discardCard = () => {
        setVelocity(200);
        setDirection('left')
    }

    return (
        <StyledCard
            animate={controls}
            dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            ref={cardElem}
            style={{ x }}
            onDrag={getTrajectory}
            onDragEnd={flyAway}
            whileTap={{ scale: 1.1 }}
            {...props}
        >
            <Card
                discardAction={discardCard}
                data={item}
                controls={controls}
                cardElem={cardElem}
                drag={props.drag}
            />
        </StyledCard>
    );
};

export default FeedCard
