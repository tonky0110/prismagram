import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		toggleLike: async (_, args, { request }) => {
			isAuthenticated(request);
			console.log('request.user: ', request.user);
			const { user } = request;
			const { postId } = args;
			try {
				const existingLike = await prisma.$exists.like({
					AND: [ { user: { id: user.id } }, { post: { id: postId } } ]
				});
				if (existingLike) {
					// TO DO
				} else {
					await prisma.createLike({
						user: {
							connect: {
								id: user.id
							}
						},
						post: {
							connect: {
								id: postId
							}
						}
					});
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		}
	}
};
