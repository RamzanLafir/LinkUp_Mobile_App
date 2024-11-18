

import {
    createOrUpdatePost,
    fetchPosts,
    fetchPostsDetails,
    createPostLike,
    removePostLike,
    createComment,
    removeComment,
    removePost
} from '../services/postService';
import { supabase } from "../lib/superbase.js";
import { uploadFile } from "../services/imageService";

// Mock the Supabase client
jest.mock("../lib/superbase.js", () => ({
    supabase: {
        from: jest.fn(),
    },
}));

jest.mock('../services/imageService', () => ({
    uploadFile: jest.fn(),
}));

jest.spyOn(console, 'log').mockImplementation(() => {});


describe('Post Service', () => {

    // Test for createOrUpdatePost
    describe('createOrUpdatePost', () => {
        it('should create or update a post successfully', async () => {
            const post = { file: { uri: 'file_uri', type: 'image' } };
            uploadFile.mockResolvedValue({ success: true, data: 'file_url' });
            supabase.from.mockReturnValue({
                upsert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: { id: 1, ...post }, error: null })
            });

            const result = await createOrUpdatePost(post);
            expect(result.success).toBe(true);
            expect(result.data.id).toBe(1);
        });

        it('should return error if file upload fails', async () => {
            const post = { file: { uri: 'file_uri', type: 'image' } };
            uploadFile.mockResolvedValue({ success: false, msg: 'Upload failed' });

            const result = await createOrUpdatePost(post);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Upload failed');
        });
    });

    // Test for fetchPosts
    describe('fetchPosts', () => {
        it('should fetch posts successfully', async () => {
            const mockData = [{ id: 1, content: 'Test post' }];
            supabase.from.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });

            const result = await fetchPosts(10, 1);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if fetch fails', async () => {
            supabase.from.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue({ data: null, error: new Error('Fetch failed') })
            });

            const result = await fetchPosts();
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not fetch the post');
        });
    });

    // Test for fetchPostsDetails
    describe('fetchPostsDetails', () => {
        it('should fetch post details successfully', async () => {
            const mockData = { id: 1, content: 'Detailed post' };
            supabase.from.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });

            const result = await fetchPostsDetails(1);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if fetching post details fails', async () => {
            supabase.from.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: null, error: new Error('Fetch failed') })
            });

            const result = await fetchPostsDetails(1);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not fetch the post Details');
        });
    });

    // Test for createPostLike
    describe('createPostLike', () => {
        it('should create a post like successfully', async () => {
            const mockData = { id: 1, postId: 1, userId: 1 };
            supabase.from.mockReturnValue({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });

            const result = await createPostLike({ postId: 1, userId: 1 });
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if creating post like fails', async () => {
            supabase.from.mockReturnValue({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: null, error: new Error('Insert failed') })
            });

            const result = await createPostLike({ postId: 1, userId: 1 });
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not like the post');
        });
    });

    // Test for removePostLike
    describe('removePostLike', () => {
        it('should remove a post like successfully', async () => {
            supabase.from.mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                error: null
            });

            const result = await removePostLike(1, 1);
            expect(result.success).toBe(true);
        });

        it('should return error if removing post like fails', async () => {
            supabase.from.mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                error: new Error('Delete failed')
            });

            const result = await removePostLike(1, 1);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not remove the post like');
        });
    });

    // Test for createComment
    describe('createComment', () => {
        it('should create a comment successfully', async () => {
            const mockData = { id: 1, content: 'Test comment' };
            supabase.from.mockReturnValue({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: mockData, error: null })
            });

            const result = await createComment({ content: 'Test comment' });
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockData);
        });

        it('should return error if creating comment fails', async () => {
            supabase.from.mockReturnValue({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValue({ data: null, error: new Error('Insert failed') })
            });

            const result = await createComment({ content: 'Test comment' });
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not create your comment');
        });
    });

    // Test for removeComment
    describe('removeComment', () => {
        it('should remove a comment successfully', async () => {
            supabase.from.mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                error: null
            });

            const result = await removeComment(1);
            expect(result.success).toBe(true);
        });

        it('should return error if removing comment fails', async () => {
            supabase.from.mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                error: new Error('Delete failed')
            });

            const result = await removeComment(1);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not remove the comment');
        });
    });

    // Test for removePost
    describe('removePost', () => {
        it('should remove a post successfully', async () => {
            supabase.from.mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                error: null
            });

            const result = await removePost(1);
            expect(result.success).toBe(true);
        });

        it('should return error if removing post fails', async () => {
            supabase.from.mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                error: new Error('Delete failed')
            });

            const result = await removePost(1);
            expect(result.success).toBe(false);
            expect(result.msg).toBe('Could not remove the post');
        });
    });
});
