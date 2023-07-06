import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:3000/graphql',
	documents: './src/**/*.gql',
	generates: {
		'./src/generated/generated.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: {
				clientPath: '../client',
				asyncQuery: true
			}
		}
	}
};
export default config;
