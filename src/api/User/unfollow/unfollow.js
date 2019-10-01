import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		unfollow: async (_, args, { request }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;
			try {
				prisma.updateUser({
					where: {
						id: user.id
					},
					data: {
						following: {
							disconnect: {
								id
							}
						}
					}
				});
				return true;
			} catch (error) {
				return false;
			}
		}
	}
};
