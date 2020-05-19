type OnlyExpression = {
    refs?: string[];
    variables?: string[];
    changes?: string[];
    kubernetes?: "active";
};

type ExpectExpression = OnlyExpression;

export { OnlyExpression, ExpectExpression };
