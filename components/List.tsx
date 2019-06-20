import React from 'react';
import {
    View,
    Text,
    Dimensions,
    LayoutRectangle,
    ScrollView,
    PanResponder,
    NativeSyntheticEvent,
    NativeScrollEvent, Easing,
} from 'react-native';
import {useTransition, animated, InterpolationConfig} from 'react-spring';

const AnimatedView = animated(View);
export declare interface WallerListCardProps {
    key: number;
}
export declare interface WalletListData {
    id?: any;
    [key: string]: any;
}
export declare interface WalletListProps {
    data: WalletListData[];
    children: Function;
    itemsHeight: number;
    list: WalletListItem[];
}
interface WalletListState {
    lastOpen?: number;
    //open: number;
    containerLayout?: LayoutRectangle;
}
interface WalletListItem {
    key: number;
    y: number;
    height: number;
    scale: number;
    object: WalletListData;
}
export const WalletList: React.FunctionComponent<WalletListProps> = (
    props: WalletListProps
) => {
    const { children, data, itemsHeight } = props;
    const [list, setList] = React.useState(data);
    const [state, setState] = React.useState<WalletListState>({});
    let listItems = list.map((child, i) => {
        const open = i === 0;
        return {
            y: open ? - (-i*props.itemsHeight)
                    : + 50 + (props.itemsHeight - props.itemsHeight / 1.5)*(i+2) ,
            scale: open ? 0.95 : 1,
            height: itemsHeight,

            object: { ...child },
        };
    });

    //    React.useEffect(() => void setInterval(() => setList(shuffle), 2000), [])
    // const update = React.useCallback(({ key, height, y}) => {
    //
    //     const open = key === state.open;
    //     console.log(y, contentOffsetY);
    //     return {
    //         y: open
    //             ? y + (-key*props.itemsHeight)
    //             : y + 50 - (props.itemsHeight - props.itemsHeight / 4)*(key-1) ,
    //
    //         height: props.itemsHeight,
    //         scale: open ? 0.95: 1,
    //     }
    // }, [state.open, contentOffsetY]);
    const transitions = useTransition<WalletListItem, {}>(
        listItems,
        item => item.object.id,
        {
            native: true,
            from: ({ y, height, scale }) => ({ scale, y, height, opacity: 0}),
            enter: ({ y, height, scale }) => ({ scale,y, height, opacity: 0 }),
            update: ({ y, height, scale }) => ({ y, height, opacity: 1, scale }),
            leave: { height: 0, opacity: 0, scale: 1 },
            config: { mass: 5, tension: 500, friction: 100, easing: Easing.cubic },
            trail: 20,
        }
    );
    const handleToggle = key => {
        // Porto l'elemento selezionato in cima
        const newList = [...list];
        const index = newList.findIndex((l: WalletListData) => l.id === key);
        const temp = newList[0];
        console.log(key, index, temp);
        newList[0] = newList[index];
        newList[index] = temp;
        setList(newList);
    };
    return (
        <View
            onLayout={e =>
                setState({ ...state, containerLayout: e.nativeEvent.layout })
            }
            style={{
                paddingTop: 55,
                flex: 1,
                width: '100%',
            }}
        >
            {transitions.map(({ item, key, props: { y, scale, ...rest } }, index) => {
                return (
                    // @ts-ignore
                    <AnimatedView
                        key={key}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            zIndex: index - data.length,
                            transform: [
                                { translateY: y.interpolate(y => y) },
                                { scale }
                            ],

                            ...rest
                        }}
                    >
                        {children({
                            data: item.object,
                            active: key === 0,
                            toggle: () => handleToggle(item.object.id),
                        })}
                    </AnimatedView>
                );
            })}
        </View>
    );
};
