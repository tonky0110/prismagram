import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const { username, email, firstName = '', lastName = '', bio = '' } = args;
			const exists = await prisma.$exists.user({ username });
			if (exists) {
				throw Error(`This username(${username}) is already taken.`);
			}
			try {
				await prisma.createUser({
					username,
					email,
					firstName,
					lastName,
					bio
				});
				return true;
			} catch (error) {
				console.log('createAction.error:', error);
				return false;
			}
		}
	}
};
