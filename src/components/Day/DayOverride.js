const expansionSummaryStyles = {
    root: {
        paddingLeft: '48px',
        '&$expanded': {
            minHeight: 'inherit'
        }
    },
    expanded: {
    },
    focused: {

    },
    disabled: {

    },
    content: {
        '&$expanded' : {
            margin: '12px 0'
        }
    },
    expandIcon: {
        transform: 'translateY(-50%) rotate(-90deg)',
        left: '8px',
        '&$expanded': {
            transform: 'translateY(-50%) rotate(0deg)'
        }
    }
};
export default expansionSummaryStyles;