import { getUserData, updateUser } from '../services/userService';
import { supabase } from '../lib/superbase.js';

// Mock the supabase client
jest.mock('../lib/superbase.js', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn(),
            update: jest.fn().mockReturnThis(),
        })),
    },
}));

describe('User Service', () => {
    
    describe('getUserData', () => {
        it('should fetch user data successfully', async () => {
            const userId = 'user123';
            const mockData = { id: userId, name: 'John Doe', email: 'john@example.com' };
            
            supabase.from.mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });

            const result = await getUserData(userId);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if fetching user data fails', async () => {
            const userId = 'user123';
            
            supabase.from.mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Fetch error' } })
            });

            const result = await getUserData(userId);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Fetch error');
        });
    });

    describe('updateUser', () => {
        it('should update user data successfully', async () => {
            const userId = 'user123';
            const updateData = { name: 'Jane Doe' };
            
            supabase.from.mockReturnValueOnce({
                update: jest.fn().mockReturnThis(),
                eq: jest.fn().mockResolvedValue({ data: updateData, error: null })
            });

            const result = await updateUser(userId, updateData);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(updateData);
        });

        it('should return error if updating user data fails', async () => {
            const userId = 'user123';
            const updateData = { name: 'Jane Doe' };
            
            supabase.from.mockReturnValueOnce({
                update: jest.fn().mockReturnThis(),
                eq: jest.fn().mockResolvedValue({ data: null, error: { message: 'Update error' } })
            });

            const result = await updateUser(userId, updateData);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Update error');
        });
    });
});
