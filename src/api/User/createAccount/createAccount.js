import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: (_, args) => {
			const { username, email, firstName = '', lastName = '', bio = '' } = args;
			const exists = prisma.$exists.user({ username });
			if (exists) {
				throw Error('This username is already taken.');
			}
			try {
				prisma.createUser({
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
