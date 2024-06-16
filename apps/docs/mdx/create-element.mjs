export function createElement(name, properties, children) {
	const element = {
		type: 'mdxJsxFlowElement',
		name,
		attributes: Object.entries(properties).map(([key, prop]) => ({
			type: 'mdxJsxAttribute',
			name: key,
			value: {
				type: 'mdxJsxAttributeValueExpression',
				data: {
					estree: {
						type: 'Program',
						body: [
							{
								type: 'ExpressionStatement',
								expression: prop,
							},
						],
					},
				},
			},
		})),
	};

	if (children) element.children = children;

	return element;
}
