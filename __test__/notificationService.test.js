import { createNotification, fetchNotifications } from '../services/notificationService.js';
import { supabase } from '../lib/superbase.js';

jest.spyOn(console, 'log').mockImplementation(() => {});

// Mocking supabase client
jest.mock('../lib/superbase', () => ({
    supabase: {
        from: jest.fn(() => ({
            insert: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            single: jest.fn(),
            eq: jest.fn().mockReturnThis(),
            order: jest.fn().mockReturnThis(),
        })),
    },
}));

describe('Notification Service', () => {
    
    describe('createNotification', () => {
        it('should create a notification successfully', async () => {
            const notification = { senderId: '123', receiverId: '456', message: 'Hello' };
            const mockData = { id: 'notif_id', ...notification };
            
            supabase.from.mockReturnValueOnce({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });

            const result = await createNotification(notification);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if notification creation fails', async () => {
            const notification = { senderId: '123', receiverId: '456', message: 'Hello' };
            
            supabase.from.mockReturnValueOnce({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: null, error: 'Insert error' })
            });
            
            const result = await createNotification(notification);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Something went wrong!');
        });
    });

    describe('fetchNotifications', () => {
        it('should fetch notifications successfully for a given receiverId', async () => {
            const receiverId = '456';
            const mockData = [
                { id: 'notif1', message: 'Hello', receiverId },
                { id: 'notif2', message: 'Hi', receiverId }
            ];
            
            supabase.from.mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                order: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });
            
            const result = await fetchNotifications(receiverId);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if fetching notifications fails', async () => {
            const receiverId = '456';
            
            supabase.from.mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                order: jest.fn().mockResolvedValue({ data: null, error: 'Fetch error' })
            });
            
            const result = await fetchNotifications(receiverId);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not fetch notifications');
        });
    });
});