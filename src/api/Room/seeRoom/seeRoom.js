import { request } from 'express';
import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
	Query: {
		seeRoom: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const { id } = args;

			const canSee = prisma.$exists.room({
				participants_some: {
					id: user.id
				}
			});
			if (canSee) {
				return prisma.room({ id }).$fragment(ROOM_FRAGMENT);
			} else {
				throw Error("You can't see this.");
			}
		}
	}
};
