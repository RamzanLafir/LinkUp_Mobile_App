import { getUserImageSrc, getSupabaseFileUrl, downloadFile, getLocalFilePath, uploadFile, getFilePath } from '../services/imageService';
import { supabase } from '../lib/superbase.js';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { superbaseUrl } from '../constants';

jest.mock('base64-arraybuffer', () => ({
    decode: jest.fn(),
}));

jest.mock('../lib/superbase.js', () => ({
    supabase: {
        storage: {
            from: jest.fn(() => ({
                upload: jest.fn(), // Mock upload function here
            })),
        },
    },
}));


jest.mock('expo-file-system', () => ({
    documentDirectory: '/mock/documents/',
    downloadAsync: jest.fn(),
    readAsStringAsync: jest.fn(),
    EncodingType: { Base64: 'base64' }, // Mock the EncodingType.Base64
}));


jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Image Service', () => {

    describe('getUserImageSrc', () => {
        it('should return Supabase file URL when imagePath is provided', () => {
            const imagePath = 'path/to/image.png';
            const result = getUserImageSrc(imagePath);
            expect(result).toEqual({ uri: `${superbaseUrl}/storage/v1/object/public/uploads/${imagePath}` });
        });

        it('should return default image when no imagePath is provided', () => {
            const result = getUserImageSrc(null);
            expect(result).toEqual(require('../assets/images/defaultUser.png'));
        });
    });

    describe('getSupabaseFileUrl', () => {
        it('should return Supabase URL object when filePath is provided', () => {
            const filePath = 'path/to/file.png';
            const result = getSupabaseFileUrl(filePath);
            expect(result).toEqual({ uri: `${superbaseUrl}/storage/v1/object/public/uploads/${filePath}` });
        });

        it('should return null when no filePath is provided', () => {
            const result = getSupabaseFileUrl(null);
            expect(result).toBeNull();
        });
    });

    describe('downloadFile', () => {
        it('should download file successfully and return file URI', async () => {
            const mockUrl = 'http://example.com/file.png';
            const mockFilePath = '/mock/documents/file.png';
            FileSystem.downloadAsync.mockResolvedValueOnce({ uri: mockFilePath });

            const result = await downloadFile(mockUrl);
            expect(FileSystem.downloadAsync).toHaveBeenCalledWith(mockUrl, mockFilePath);
            expect(result).toEqual(mockFilePath);
        });

        it('should return null if download fails', async () => {
            const mockUrl = 'http://example.com/file.png';
            FileSystem.downloadAsync.mockRejectedValueOnce(new Error('Download failed'));

            const result = await downloadFile(mockUrl);
            expect(result).toBeNull();
        });
    });

    describe('getLocalFilePath', () => {
        it('should return local file path based on document directory', () => {
            const filePath = 'http://example.com/path/to/image.png';
            const result = getLocalFilePath(filePath);
            expect(result).toBe('/mock/documents/image.png');
        });
    });
    

    describe('getFilePath', () => {
        it('should return file path with timestamp and .png extension for images', () => {
            const folderName = 'postImage';
            const result = getFilePath(folderName, true);
            expect(result).toMatch(new RegExp(`/${folderName}/\\d+\\.png$`));
        });

        it('should return file path with timestamp and .mp4 extension for videos', () => {
            const folderName = 'postVideo';
            const result = getFilePath(folderName, false);
            expect(result).toMatch(new RegExp(`/${folderName}/\\d+\\.mp4$`));
        });
    });
});
