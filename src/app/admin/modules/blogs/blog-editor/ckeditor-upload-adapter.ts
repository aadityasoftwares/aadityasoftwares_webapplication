import { AdminMediaService } from '../../../core/services/admin-media.service';
import { firstValueFrom } from 'rxjs';

export class R2UploadAdapter {
  private mediaService: AdminMediaService;
  private loader: any;

  constructor(loader: any, mediaService: AdminMediaService) {
    this.loader = loader;
    this.mediaService = mediaService;
  }

  async upload(): Promise<{ default: string }> {
    const file = await this.loader.file;
    if (!file) {
      throw new Error('No file provided for upload');
    }

    try {
      const media = await firstValueFrom(
        this.mediaService.uploadFile(file, 'CONTENT', 'BLOG'),
      );
      if (media && media.publicUrl) {
        return { default: media.publicUrl };
      }
      throw new Error('Image upload succeeded but no public URL was returned');
    } catch (err: any) {
      throw new Error(err?.message || 'Failed to upload image to storage');
    }
  }

  abort(): void {
    // Abort handling if needed
  }
}

export function createR2UploadAdapterPlugin(mediaService: AdminMediaService) {
  return function (editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new R2UploadAdapter(loader, mediaService);
    };
  };
}

