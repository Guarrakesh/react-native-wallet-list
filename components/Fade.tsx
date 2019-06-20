import {animated, Transition} from 'react-spring/renderprops-universal';
import React from 'react';

interface FadeProps {
    children: any;
    show: boolean;
    from?: Object;
    enter?: Object;
    leave?: Object;
    delay?: number;
}

const Fade: React.FunctionComponent<FadeProps> = (props) => {
    const {
        children,
        show,
        from = { opacity: 0 },
        enter = { opacity: 1 },
        leave = { opacity: 0 },
        ...rest
    } = props;
    const { type, props: childProps } = children;
    // @ts-ignore
    const Component = animated[type] || animated(type);
    const result = styles => {
        const newProps = {
            ...childProps,
            style: {
                ...childProps.style,
                ...styles,
            },
        };
        return <Component {...newProps} />
    };


    return (
        <Transition native
                    items={show}
                    {...rest}
                    from={from}
                    enter={enter}
                    leave={leave}
                    children={show => show && result}
        />)

};

export default Fade;